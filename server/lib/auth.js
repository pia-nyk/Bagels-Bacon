const passport = require('passport');
const LocalStrategy = require('passport-local'); //one of the available strategies
const UserModel = require('../models/UserModel');
passport.use(new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
    try {
        const user = await UserModel.findOne({ username: username }).exec();
        if (!user) {
            return done(null, false, 'Invalid username or password');
        }
        const passwordOK = await user.comparePassword(password);
        if (!passwordOK) {
            return done(null, false, 'Invalid username or password');
        }
        return done(null, user);

    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id).exec();
        return done(null, user);
    } catch (err) {
        return done(err);
    }
})

module.exports = {
    initialize: passport.initialize(),
    session: passport.session(),
    setUser: (request, response, next) => {
        response.locals.user = request.user;
        return next();
    },

};