const express = require('express');

const exploreRoute = require('./explore');
const feedbackRoute = require('./feedback');
const userRoute = require('./users/');
const orderRoute = require('./orders');

const router = express.Router();

module.exports = (params) => {

    const { menuService } = params;

    //main - index route
    router.get('/', async (request, response, next) => {
        try {
            const famousMenuItems = await menuService.getFamousItems();
            response.render('layout',
                {
                    pageTitle: 'Welcome',
                    template: 'index',
                    famousMenuItems
                });
        } catch (err) {
            return next(err);
        }
    });

    /**
     * add all routes
     */
    router.use('/explore', exploreRoute(params));
    router.use('/feedback', feedbackRoute(params));
    router.use('/users', userRoute(params));
    router.use('/orders', orderRoute(params));
    return router;
}