const mongoose = require('mongoose');

const FeedbackSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    title: {
        type: String,
        required: true,
        minlength: 5,
    },
    message: {
        type: String,
        required: true,
        minlength: 8
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Feedback', FeedbackSchema);