
import makeOnChargeRefunded from "./onChargeRefunded";
import makeOnCustomerSubscriptionCreated from "./onCustomerSubscriptionCreated";
import makeOnCustomerSubscriptionDeleted from "./onCustomerSubscriptionDeleted";
import makeOnCustomerSubscriptionUpdated from "./onCustomerSubscriptionUpdated";
import makeOnInvoicePaid from "./onInvoicePaid";
import makeOnInvoiceFinalized from "./onInvoiceFinalized";
import makeOnPaymentFailed from "./onPaymentFailed";
import makeOnPaymentIntentSucceeded from "./onPaymentIntentSucceeded";

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
