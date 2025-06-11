const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    deadline: {
        type: Date,
        required: true,
      },
    status: {
        type: String,
        enum: ['Incomplete', 'Completed'], // status field to track task completion
        default: 'Incomplete' // Default status when the task is created
    },
    user: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        }
    ],

});

module.exports = mongoose.model("List", listSchema)