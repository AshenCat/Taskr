const { errorConstants } = require('../../constants');
const Notification = require('../models/notification');

// const {ObjectId} = require('mongoose').Types;

/**
 * Creates a notification
 * @param {e} e eventHandler to respond
 * @param {
 *       category:String
 *       type: String
 *       silent: Boolean
 *       variant: String
 *       message: String
 *       metaData: Object
 * } notif notification object.
 */
exports.createNotification = async (e, notif) => {
    try {
        await Notification.create(notif);
        e.sender.send(notif.type, {message: notif.message, variant: notif.variant})
    } catch(err) {
        console.error(err)
        e.sender.send(errorConstants.NOTIFICATION_ERROR, {
            variant: danger,
            message: 'Error creating todo',
            metaData: notif
        })
    }
}
