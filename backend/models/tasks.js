const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    assignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    status: {
        type: String,
        enum: ['completed', 'pending', 'in-process'],
        default: 'pending'
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

const task = mongoose.model("task", taskSchema)
module.exports = task