const { response } = require('express');
const express = require('express');
const { request } = require('http');
const router = express.Router();
const UserModel = require('../models/UserModel');

function redirecIfLoggedIn(request, response, next) {
    if (request.user) return response.redirect('/users/account');
    return next();
}

module.exports = (params) => {
    const { menuService, feedbackService } = params;

    router.get('/', redirecIfLoggedIn, async (request, response, next) => {
        try {
            //get the errors & success msgs to be displayed in UI form
            const errors = request.session.feedback.errors ? request.session.feedback.errors : false;
            const success = request.session.feedback.message ? request.session.feedback.message : false;
            request.session.feedback = {};

            const allMenuItems = await menuService.getMenuItems();
            const topComments = await feedbackService.getList();
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

    router.get('/registration', redirecIfLoggedIn, async (request, response, next) => {
        try {
            var registrationResult = false;
            if (request.query.success) {
                registrationResult = 'success';
            } else if (request.query.failure) {
                registrationResult = 'failure';
            }

            console.log(request.query.registration);
            const allMenuItems = await menuService.getMenuItems();
            const topComments = await feedbackService.getList();
            response.render('layout',
                {
                    pageTitle: 'Explore',
                    template: 'explore',
                    registration: request.query.registration,
                    allMenuItems,
                    topComments,
                    registrationResult
                });

        } catch (err) {
            console.log(err);
            return next(err);
        }
    });

    return router;
}