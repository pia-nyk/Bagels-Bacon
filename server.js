const { response } = require('express');
const express = require('express');
const { request } = require('http');
const path = require("path");
const app = express();
const port = 3000;

const createError = require('http-errors');
const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");

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
app.use(bodyParser.urlencoded({ extended: true }));

app.set('trust proxy', 1);

app.use(
    cookieSession({
        name: 'session',
        keys: ['Ghsbdv83js', 'hgd6387nj']
    })
);

app.use((request, response, next) => {
    response.locals.variable = 'hello';
    return next();
});

app.use('/', routes({
    menuService,
    feedbackService
}));

app.use((request, response, next) => {
    return next(createError(404, 'File not found'));
});

app.use((err, request, response, next) => {
    response.locals.message = err.message;
    const status = err.status || 500;
    response.locals.status = status;
    response.status(status);
    response.render('error');
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});