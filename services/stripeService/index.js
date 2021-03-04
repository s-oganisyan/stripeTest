const {HANDLERS} = require("./constants");
const { stripe } = require("../../cors/loaders/stripe");
const { logger } = require("../../cors/logger");

const makeOnStripe = async (event) => {
    try {
        const eventBody = event.body;
        const signature = event.headers["Stripe-Signature"] || "";
        logger.log("validate event and extract body", {eventBody, signature});
        const body = stripe.extractEvent(eventBody, signature);

        switch (body.type) {
        case "charge.refunded":
            return HANDLERS.charge[body.type](body.data.object,);

        case "customer.subscription.created":
        case "customer.subscription.deleted":
        case "customer.subscription.updated":
            return HANDLERS.subscription[body.type](body.data.object,);

        case "invoice.paid":
        case "invoice.finalized":
        case "invoice.payment_failed":
            return HANDLERS.invoice[body.type](body.data.object,);

        case "payment_intent.succeeded":
            return HANDLERS.paymentIntent[body.type](body.data.object,);

        default:
            logger.err("Unprocessed webhook", body);
            return {statusCode: 400};
        }
    } catch (error) {
        logger.err("when processing event", {event, error});
        return {statusCode: 400, body: `Webhook Error: ${error.message}`};
    }
};

module.exports = {
    makeOnStripe
}
