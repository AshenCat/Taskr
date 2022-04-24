const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    done: Boolean,
    status: {
        type: String,
        enum: ['Pending', 'On hold', 'Past Due', 'Archived'],
        default: 'Pending',
    },
    tags: [{name: String, variant: String}],
    set: String,
    due: Date,
    visibility: {
        type: String,
        default: 'PUBLIC',
        enum: ['PRIVATE', 'PUBLIC']
    },
    // userId: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Todo', todoSchema);