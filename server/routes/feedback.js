const { request, response } = require('express');
const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

function feedbackValidations() {
    var validations = [
        check('head')
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
                const errors = validationResult(request);
                console.log(errors);
                if (!errors.isEmpty()) {
                    request.session.feedback = {
                        errors: errors.array(),
                    };
                    if (request.user) {
                        return response.redirect('/users/account#review-form');
                    } else {
                        return response.redirect('/explore');
                    }
                }

                //if alls fine, then save the feedback form data to json
                const { head, message } = request.body;
                var name = null;
                console.log(request.user);
                if (request.user) {
                    name = `${request.user.firstName} ${request.user.lastName}`;
                } else {
                    name = request.body.name;
                }
                await feedbackService.addEntry(name, head, message);
                request.session.feedback = {
                    message: 'Thank you for the feedback!',
                };

                if (request.user) {
                    return response.redirect('/users/account#review-form');
                } else {
                    return response.redirect('/explore');
                }
            } catch (err) {
                console.log(err);
                return next(err);
            }
            //if checks arent satisfied, errors will be given
        });
    return router;
}