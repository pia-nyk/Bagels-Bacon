const mongoose = require('mongoose');
const OrderModel = require('../models/OrderModel');

class OrderService {

    async getCartOrder(user) {
        return OrderModel.find({ user: user, payment: false }, (order => {
            try {
                return order;
            } catch (err) {
                return new Error(err.message);
            }
        }));
    }

    async saveCartOrder(cart, itemDetail, user) {
        try {
            var items = [];

            var c;
            const menu = {
                menuitem: itemDetail[0].title,
                price: itemDetail[0].price,
                quantity: 1
            };
            if (cart.length == 0) {
                items.push(menu);
                c = new OrderModel({
                    user: user,
                    items: items,
                    total: itemDetail[0].price,
                    payment: false
                });
                console.log(c);
                await c.save();
            } else {
                cart = cart[0];
                items = cart.items;

                var present = false;
                items.forEach((el, index) => {
                    if (el.menuitem == itemDetail[0].title) {
                        items[index].quantity += 1;
                        present = true;
                    }
                });
                if (!present) {
                    items.push(menu);
                }
                cart.items = items;
                cart.total += itemDetail[0].price;
                console.log(cart);
                await cart.save();
            }

        } catch (err) {
            console.log(err);
            return new Error(err.message);
        }
    }
}

module.exports = OrderService;