const { request, response } = require('express');
const express = require('express');
const OrderModel = require('../models/OrderModel');
const router = express.Router();

module.exports = (params) => {
    const { menuService, orderService } = params;
    router.get('/additem/:itemname', async (request, response, next) => {
        try {
            var cart = await orderService.getCartOrder(request.user);
            const itemDetail = await menuService.getMenuItemByName(request.params.itemname);
            await orderService.saveCartOrder(cart, itemDetail, request.user);
            return response.redirect('/users/account#menu-section');

        } catch (err) {
            return next(err);
        }
    });

    router.get('/cart', async (request, response, next) => {
        try {
            const cart = await orderService.getCartOrder(request.user);
            if (cart.length == 0) {
                return {
                    menu: null,
                    total: 0
                }
            }
            return response.send({
                menu: cart[0].items,
                total: cart[0].total
            });
        } catch (err) {
            console.log(err);
            return next(err);
        }
    });

    router.get('/payment', async (request, response, next) => {
        try {
            const cart = await orderService.getCartOrder(request.user);
            if (cart.length == 0) {
                return response.redirect('/users/account?payment=failure');
            }
            const cartItem = cart[0];
            cartItem.payment = true;
            await cartItem.save();

            return response.redirect('/users/account?payment=success');

        } catch (err) {
            console.log(err);
            return next(err);
        }
    });

    return router;
}