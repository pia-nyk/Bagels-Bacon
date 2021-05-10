const express = require('express');

const menuRoute = require('./menu');
const userviewRoute = require('./userview');

const router = express.Router();

module.exports = (params) => {

    const { menuService } = params;

    router.get('/', async (request, response) => {
        const famousMenuItems = await menuService.getFamousItems();
        // console.log(famousMenuItems);
        response.render('layout',
            {
                pageTitle: 'Welcome',
                template: 'index',
                famousMenuItems
            });
    });
    router.use('/menu', menuRoute(params));
    router.use('/userview', userviewRoute());
    return router;
}