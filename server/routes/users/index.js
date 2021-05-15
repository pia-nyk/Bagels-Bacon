const { response, request } = require('express');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserModel = require('../../models/UserModel');

module.exports = (params) => {

    const { menuService, feedbackService } = params;
    router.get('/account', async (request, response, next) => {
        try {
            //users can access account page only if logged in
            if (!request.user) {
                return response.status(401).end();
            }
            const allMenuItems = await menuService.getMenuItems();
            const topComments = await feedbackService.getList();
            return response.render('layout',
                {
                    pageTitle: `Welcome ${request.user.firstName} ${request.user.lastName}`,
                    template: 'loggedinview',
                    allMenuItems,
                    topComments,
                })
        } catch (err) {
            return next(err);
        }
    });

    router.post('/registration', async (req, resp, next) => {
        try {
            const user = new UserModel({
                firstName: req.body.fname,
                lastName: req.body.lname,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
            });
            //save the data
            const savedUser = await user.save();
            if (savedUser) return resp.redirect('/explore/registration?success=true&registration=sign-up');

        } catch (err) {
            return resp.redirect('/explore/registration?failure=true&registration=sign-up');
        }
    });

    router.post('/login', passport.authenticate('local', {
        successRedirect: '/users/account',
        failureRedirect: '/explore/registration?failure=true&registration=login'
    }));

    router.get('/logout', (request, response) => {
        request.logout();
        return response.redirect('/');
    });

    return router;
}

