const mongoose = require("mongoose");

const User = mongoose.model("users");

const createSubscription = (services) => async (subscription) => {
    console.log("services12345", services);

    console.log("on customer subscription created", subscription);

    if (subscription.status !== "active") {
        return {statusCode: 200};
    }

    const stripeCustomerID = subscription.customer;
    const user = await User.findOne({stripeCustomerID});

    if (!user) {
        return {
            statusCode: 500,
            body: `User with customerID ${stripeCustomerID} doesn't exist`,
        };
    }

    user.listSubscription.push({
        subscriptionName: subscription.name,
        subscriptionStatus: subscription.status,
        subscriptionId: stripeCustomerID,
    })
    const savedUser = await user.save();
    console.log(savedUser, "savedUser1233")

    if (savedUser.errors) {
        console.log("when create customer", savedUser.errors);
        return {statusCode: 500};
    }

    const {plan} = subscription;
    if (!plan) {
        return {
            statusCode: 500,
            body: `User with stripeCustomerID ${stripeCustomerID} doesn't have plan`,
        };
    }

    return {statusCode: 200};
};

module.exports = {
    createSubscription
}
