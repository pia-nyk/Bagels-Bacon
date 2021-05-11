const { request, response } = require('express');
const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

module.exports = (params) => {

    const { feedbackService } = params;

    /**
     * check the input for proper format
     */
    router.post('/',
        [
            check('name')
                .trim()
                .isLength({ min: 3 })
                .escape()
                .withMessage('A name is required'),
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
        ],
        async (request, response) => {
            //if checks arent satisfied, errors will be given 
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                request.session.feedback = {
                    errors: errors.array(),
                };
                return response.redirect('/menu');
            }

            //if alls fine, then save the feedback form data to json
            const { name, head, message } = request.body;
            await feedbackService.addEntry(name, head, message);
            request.session.feedback = {
                message: 'Thank you for the feedback!',
            };

            return response.redirect('/menu');
        });
    return router;
}