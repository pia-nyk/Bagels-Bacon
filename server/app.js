const { response } = require('express');
const express = require('express');
const { request } = require('http');
const path = require("path");
const createError = require('http-errors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const cookieSession = require("cookie-session");
const auth = require('./lib/auth');


/**
 * getting the services to be passed to the routes
 */
const MenuService = require('./services/MenuService');
const FeedbackService = require('./services/FeedbackService');

module.exports = (config) => {
    const app = express();
    const menuService = new MenuService(config.data.menu);
    const feedbackService = new FeedbackService(config.data.feedbacks);

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '/views'));
    app.locals.sitename = config.sitename;
    app.use('/', express.static(path.join(__dirname, '../public')));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    //cookie session
    app.use(
        cookieSession({
            name: 'session',
            keys: ['Ghsbdv83js', 'hgd6387nj']
        }),
    );
    //session
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        }),
    }));
    app.use(auth.initialize);
    app.use(auth.session);
    //will be used to give signup/login option only if user isnt logged in
    app.use(auth.setUser);

    app.use('/', routes({ menuService, feedbackService }));

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
    return app;
}