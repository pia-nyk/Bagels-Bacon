const { response } = require('express');
const express = require('express');
const { request } = require('http');
const path = require("path");
const app = express();
const port = 3000;

const routes = require('./routes');

/**
 * getting the services to be passed to the routes
 */
const MenuService = require('./services/MenuService');
const FeedbackService = require('./services/FeedbackService');

const menuService = new MenuService('./data/menu.json');
const feedbackService = new FeedbackService('./data/feedback.json');

app.set('view engine', 'ejs');
console.log(path.join(__dirname, '/views'));
app.set('views', path.join(__dirname, '/views'));

app.locals.siteName = 'Bagels & Bacon';

app.use(express.static(path.join(__dirname, '\static')));

app.use((request, response, next) => {
    response.locals.variable = 'hello';
    return next();
});

app.use('/', routes({
    menuService,
    feedbackService
}));

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});