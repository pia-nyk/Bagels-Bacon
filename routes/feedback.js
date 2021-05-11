const { request, response } = require('express');
const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

module.exports = (params) => {

    const { feedbackService } = params;
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
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                request.session.feedback = {
                    errors: errors.array(),
                };
                return response.redirect('/menu');
            }

            const { name, head, message } = request.body;
            await feedbackService.addEntry(name, head, message);
            request.session.feedback = {
                message: 'Thank you for the feedback!',
            };

            return response.redirect('/menu');
        });
    return router;
}