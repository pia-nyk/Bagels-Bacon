const express = require('express');
const router = express.Router();

module.exports = (params) => {
    const { menuService, feedbackService } = params;
    router.get('/:username', async (request, response, next) => {
        try {
            const allMenuItems = await menuService.getMenuItems();
            const topComments = await feedbackService.getList();
            return response.render('layout',
                {
                    pageTitle: `Welcome ${request.params.username}`,
                    template: 'loggedinview',
                    allMenuItems,
                    topComments
                })
        } catch (err) {
            return next(err);
        }
    });

    return router;
}