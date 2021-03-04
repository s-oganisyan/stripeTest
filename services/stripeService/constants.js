
const makeOnChargeRefunded = require("./handlers/onChargeRefunded"),
    { makeOnCustomerSubscriptionCreated } = require("./handlers/onCustomerSubscriptionCreated"),
    { makeOnCustomerSubscriptionDeleted } = require("./handlers/onCustomerSubscriptionDeleted"),
    { makeOnCustomerSubscriptionUpdated } = require("./handlers/onCustomerSubscriptionUpdated"),
    { makeOnInvoicePaid } = require("./handlers/onInvoicePaid"),
    { makeOnInvoiceFinalized } = require("./handlers/onInvoiceFinalized"),
    { makeOnPaymentFailed } = require("./handlers/onPaymentFailed"),
    { makeOnPaymentIntentSucceeded } = require("./handlers/onPaymentIntentSucceeded");

const HANDLERS = {
    charge: {
        "charge.refunded": makeOnChargeRefunded,
    },
    subscription: {
        "customer.subscription.created": makeOnCustomerSubscriptionCreated,
        "customer.subscription.deleted": makeOnCustomerSubscriptionDeleted,
        "customer.subscription.updated": makeOnCustomerSubscriptionUpdated,
    },
    invoice: {
        "invoice.paid": makeOnInvoicePaid,
        "invoice.finalized": makeOnInvoiceFinalized,
        "invoice.payment_failed": makeOnPaymentFailed,
    },
    paymentIntent: {
        "payment_intent.succeeded": makeOnPaymentIntentSucceeded,
    },
};

module.exports = {
    HANDLERS
}
