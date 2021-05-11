const express = require('express');
const router = express.Router();

module.exports = (params) => {
    const { menuService, feedbackService } = params;
    router.get('/', async (request, response, next) => {
        try {
            const errors = request.session.feedback.errors ? request.session.feedback.errors : false;
            const success = request.session.feedback.message ? request.session.feedback.message : false;
            request.session.feedback = {};

            const allMenuItems = await menuService.getMenuItems();
            const topComments = await feedbackService.getList();
            console.log(topComments);
            response.render('layout',
                {
                    pageTitle: 'Explore',
                    template: 'explore',
                    allMenuItems,
                    topComments,
                    errors,
                    success
                })
        } catch (err) {
            console.log(err);
            return next(err);
        }
    });

    return router;
}