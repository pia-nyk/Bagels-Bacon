const { response } = require('express');
const express = require('express');
const { request } = require('http');
const router = express.Router();
const UserModel = require('../models/UserModel');
const MenuModel = require('../models/MenuModel');

function redirectIfLoggedIn(request, response, next) {
    if (request.user) return response.redirect('/users/account');
    return next();
}

module.exports = (params) => {
    const { menuService, feedbackService } = params;

    router.get('/', redirectIfLoggedIn, async (request, response, next) => {
        try {

            var feedbackResult = false;
            if (request.query.success) {
                feedbackResult = 'success';
            } else if (request.query.failure) {
                feedbackResult = 'failure';
            }

            const allMenuItems = await menuService.getAllMenuItems();
            const topComments = await feedbackService.getAllFeedbacks();
            response.render('layout',
                {
                    pageTitle: 'Explore',
                    template: 'explore',
                    allMenuItems,
                    topComments,
                    feedbackResult
                })
        } catch (err) {
            console.log(err);
            return next(err);
        }
    });

    router.get('/registration', redirectIfLoggedIn, async (request, response, next) => {
        try {
            var registrationResult = false;
            if (request.query.success) {
                registrationResult = 'success';
            } else if (request.query.failure) {
                registrationResult = 'failure';
            }

            console.log(request.query.registration);
            const allMenuItems = await menuService.getAllMenuItems();
            const topComments = await feedbackService.getAllFeedbacks();
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