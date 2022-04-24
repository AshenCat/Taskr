const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    category: {
        type: String,
        uppercase: true,
        required: true
    },
    type: {
        type: String,
        uppercase: true,
        required: true
    },
    silent: {
        type: Boolean,
        default: false
    },
    variant: {
        type: String,
        uppercase: true,
        required: true
    },
    message: String,
    metaData: Object,
    // from: String,
    // to: String,
    // isReadBy: [String],
}  , {
    timestamps: true
})

module.exports = mongoose.model('Notification', notificationSchema);