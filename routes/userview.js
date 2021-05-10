const express = require('express');
const router = express.Router();

module.exports = () => {
    router.get('/:username', (request, response) => {
        return response.send(`Welcome to Bagels & Bacon ${request.params.username}`);
    });

    return router;
}