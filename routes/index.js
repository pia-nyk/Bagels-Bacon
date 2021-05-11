const express = require('express');

const menuRoute = require('./menu');
const userviewRoute = require('./userview');
const feedbackRoute = require('./feedback');

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
    router.use('/menu', menuRoute(params));
    router.use('/userview', userviewRoute(params));
    router.use('/feedback', feedbackRoute(params));
    return router;
}