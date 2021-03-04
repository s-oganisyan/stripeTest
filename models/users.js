const mongoose = require("mongoose");
const formatPlugin = require("mongoose-model-format");
const moment = require("moment");

const {Schema} = mongoose;

const UserSchema = new Schema({
    status: {
        type: Boolean,
        default: false
    },
    userName: {
        type: String,
        required: false,
    },
    listSubscription: [{
        subscriptionName: {type: String},
        subscriptionStatus: {type: String},
        subscriptionId: {type: String},
    }],
    created: {
        type: Date,
        default: moment.utc(),
    },
    updated: {
        type: Date,
        default: moment.utc(),
    },
});
UserSchema.plugin(formatPlugin);

module.exports = mongoose.model("users", UserSchema);
