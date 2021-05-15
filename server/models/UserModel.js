const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;


const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true },
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: { unique: true },
        validate: {
            validator: emailValidator.validate,
            message: props => `${props} is not a valid email id`,
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
},
    { timestamps: true, });

//pre save trigger
UserSchema.pre('save', async function preSave(next) {
    if (!this.isModified('password')) return next();
    try {
        const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
        this.password = hash;
        return next();
    } catch (err) {
        console.log(err.message);
        return next(err);
    }
});

//password validation method
UserSchema.methods.comparePassword = async function comparePassword(candidate) {
    return bcrypt.compare(candidate, this.password);
}

module.exports = mongoose.model('User', UserSchema);

