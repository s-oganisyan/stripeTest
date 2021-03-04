const Stripe = require("stripe");
const config = require("../../config");

const API_KEY = config?.billing?.stripeApiKey;

const initStripe = (apiKey) => {
    const client = new Stripe(apiKey);
    return client;
};

const stripe = initStripe(API_KEY);

const getUserSubscriptions = (customer) => stripe.subscriptions.list({customer});

const getSubscriptionByID = (id) => stripe.subscriptions.retrieve(id);

const getUserSubscriptionByID = async (
    subscriptionID,
    customer,
) => {
    const subscription = await getSubscriptionByID(subscriptionID);
    if (subscription.customer !== customer) {
        return null;
    }

    return subscription;
};

const createCustomer = (email) => stripe.customers.create({email});

const createSubscription = ({
    customer,
    coupon,
    trial_period_days = 5,
}) => stripe.subscriptions.create({
    customer,
    coupon,
    trial_period_days,
});

const changeSubscription = ({
    subscriptionId,
    plan,
}) => stripe.subscriptions.update(subscriptionId, {
    items: [{plan, quantity: 1}],
});

const getSubscriptionItems = (subscription) => stripe.subscriptionItems.list({subscription});

const changeEmailStripe = ({
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

const changeSubscriptionPlan = async ({
    subscription,
    plan,
}) => {
    const list = await getSubscriptionItems({subscription});
    await Promise.all(list.data.map((item) => delSubscriptionItem({subscriptionItem: item.id})),);

    await createSubscriptionItem({subscription, plan});
    return getSubscriptionByID(subscription);
};

module.exports = {
    stripe,
    getUserSubscriptions,
    getSubscriptionByID,
    getUserSubscriptionByID,
    createCustomer,
    createSubscription,
    changeSubscription,
    changeEmailStripe,
    changeSubscriptionPlan
}
