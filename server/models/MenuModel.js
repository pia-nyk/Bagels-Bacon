const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    price: {
        type: Number,
        required: true
    },
    shortname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    description: {
        type: String,
        trim: true,
        minlength: 3,
    },
    isFamous: {
        type: Boolean,
    },
    image: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    }
});

module.exports = mongoose.model('Menu', MenuSchema);