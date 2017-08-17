const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

/**
 * E-mail validators 
 */

let emailLengthChecker = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 30) {
            return false;
        } else {
            return true;
        }
    }
}

let validEmail = (email) => {
    if (!email) {
        return false;
    } else {
        // Regular expression to validate email addresses
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email); // Return regular expression test results (true or false)
    }
}


/**
 * Username validators 
 */

let usernameLengthChecker = (username) => {
    if (!username) {
        return false;
    } else {
        if (username.length < 3 || username.length > 15) {
            return false;
        } else {
            return true;
        }
    }
}
let validUsername = (username) => {
    if (!username) {
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username);
    }
}

/**
 * Password validators
 */

let passwordLengthChecker = (password) => {
    if (!password) {
        return false;
    } else {
        if (password.length < 8 || password.length > 35) {
            return false;
        } else {
            return true;
        }
    }
}

let validPassword = (password) => {
    if (!password) {
        return false;
    } else {
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        return regExp.test(password);
    }
}

/**
 * Validator objects
 */
const emailValidators = [{
    validator: emailLengthChecker,
    message: 'E-mail must be atleast 5 characters but no more than 30.'
}, {
    validator: validEmail,
    message: 'Please enter a valid e-mail address'
}];

const usernameValidators = [{
    validator: usernameLengthChecker,
    message: 'Username must be atlease 3 characters but no more than 15.'
}, {
    validator: validUsername,
    message: 'Username must not have any special characters.'
}];

const passwordValidator = [{
    validator: passwordLengthChecker,
    message: 'Password must be atlease 8 characters but no more than 35.'
}, {
    validator: validPassword,
    message: 'Password must contain at lease one uppercase, lowercase, special character and number'
}]

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: emailValidators
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: usernameValidators
    },
    password: {
        type: String,
        required: true,
        validate: passwordValidator
    }
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
    })
})

userSchema.methods.comparePassword =  function(passsword) {
    return bcrypt.compareSync(passsword, this.password);
}

module.exports = mongoose.model('User', userSchema);