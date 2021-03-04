import Stripe from "stripe";
import config from "../config";

const API_KEY = config.billing.stripeApiKey;

const initStripe = (apiKey) => {
    const client = new Stripe(apiKey);
    // client.setMaxNetworkRetries(2);
    return client;
};

export const stripe = initStripe(API_KEY);

export const getUserSubscriptions = (customer) => stripe.subscriptions.list({customer});

export const getSubscriptionByID = (id) => stripe.subscriptions.retrieve(id);

export const getUserSubscriptionByID = async (
    subscriptionID,
    customer,
) => {
    const subscription = await getSubscriptionByID(subscriptionID);
    if (subscription.customer !== customer) {
        return null;
    }

    return subscription;
};

export const createCustomer = (email) => stripe.customers.create({email});

export const createSubscription = ({
    customer,
    coupon,
    trial_period_days = 5,
}) => stripe.subscriptions.create({
    customer,
    coupon,
    trial_period_days,
});

export const changeSubscription = ({
    subscriptionId,
    plan,
}) => stripe.subscriptions.update(subscriptionId, {
    items: [{plan, quantity: 1}],
});

const getSubscriptionItems = (subscription) => stripe.subscriptionItems.list({subscription});

export const changeEmailStripe = ({
    customerID,
    email,
}) => stripe.customers.update(customerID, {email});

const createSubscriptionItem = ({
    subscription,
    plan,
}) => stripe.subscriptionItems.create({
    subscription,
    plan,
    quantity: 1,
});

const delSubscriptionItem = (subscriptionItem) => stripe.subscriptionItems.del(subscriptionItem);

export const changeSubscriptionPlan = async ({
    subscription,
    plan,
}) => {
    const list = await getSubscriptionItems({subscription});
    await Promise.all(list.data.map((item) => delSubscriptionItem({subscriptionItem: item.id})),);

    await createSubscriptionItem({subscription, plan});
    return getSubscriptionByID(subscription);
};
