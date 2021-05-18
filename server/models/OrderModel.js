const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    items: [{
        menuitem: {
            type: String
        },
        price: {
            type: Number
        },
        quantity: {
            type: Number
        }
    }],
    total: {
        type: Number,
        required: true
    },
    payment: {
        type: Boolean,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);