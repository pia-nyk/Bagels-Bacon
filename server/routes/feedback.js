const { request, response } = require('express');
const express = require('express');
const { check, validationResult } = require('express-validator');
const FeedbackModel = require('../models/FeedbackModel');

const router = express.Router();

function feedbackValidations() {
    var validations = [
        check('title')
            .trim()
            .isLength({ min: 3 })
            .escape()
            .withMessage('A title is required'),
        check('message')
            .trim()
            .isLength({ min: 3 })
            .escape()
            .withMessage('A message is required')
    ];
    const namevalidation = check('name')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage('A name is required');

    if (request.user) {
        validations.push(namevalidation);
    }
}

module.exports = (params) => {

    const { feedbackService } = params;

    /**
     * check the input for proper format
     */
    router.post('/',
        async (request, response, next) => {
            try {
                var name = null;
                if (request.user) {
                    name = `${request.user.firstName} ${request.user.lastName}`;
                } else {
                    name = request.body.name;
                }

                const feedback = new FeedbackModel({
                    name,
                    title: request.body.head,
                    message: request.body.message
                });

                const savedFeedback = await feedback.save();
                if (savedFeedback) {
                    if (request.user) {
                        return response.redirect('/users/account?success=true#review-form');
                    } else {
                        return response.redirect('/explore?success=true#review-form');
                    }
                }

            } catch (err) {
                console.log(err);
                if (request.user) {
                    return response.redirect('/users/account?failure=true#review-form');
                } else {
                    return response.redirect('/explore?failure=true#review-form');
                }
            }
            //if checks arent satisfied, errors will be given
        });
    return router;
}