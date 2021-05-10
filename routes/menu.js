const express = require('express');
const router = express.Router();

module.exports = (params) => {
    const { menuService, feedbackService } = params;
    router.get('/', async (request, response) => {
        const allMenuItems = await menuService.getMenuItems();
        const topComments = await feedbackService.getNLatestComments();
        console.log(topComments);
        response.render('layout',
            {
                pageTitle: 'Explore',
                template: 'explore',
                allMenuItems,
                topComments
            })
    });

    return router;
}