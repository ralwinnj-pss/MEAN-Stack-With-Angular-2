const User = require('../models/user');

module.exports = (router) => {

    // Register Route
    router.post('/register', (req, res) => {

        // Check if there is a value in the email parameter
        if (!req.body.email) {

            res.json({
                success: false,
                message: 'You must provide an email!',
            }); // res.json({})

        } // if (!req.body.email) 
        else {

            // Check is a username was provided
            if (!req.body.username) {

                res.json({
                    success: false,
                    message: 'You must provide a username!'
                }); // res.json)({})

            } // if (!req.body.username) 
            else {

                // check if the password has been provided 
                if (!req.body.password) {

                    res.json({
                        success: false,
                        message: 'You must provide a password!'
                    }); // res.json({})

                } // if (!req.body.password) 
                else {

                    // Create new user 
                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password
                    }); // let user...

                    // save user to the DB
                    user.save((err) => {

                        // Check for any errors that may occur when saving the user 
                        if (err) {

                            // error code for duplicate records
                            if (err.code === 11000) {

                                res.json({
                                    success: false,
                                    message: 'Username or email address already exists!',
                                    error: err
                                }); // res.json...

                            } // if (err.code === 11000)
                            else {
                                if (err.errors) {

                                    if (err.errors.email) {

                                        res.json({
                                            success: false,
                                            message: err.errors.email.message
                                        }); // res.json... 

                                    } // if (err.errors.email)
                                    else {
                                        if (err.errors.username) {

                                            res.json({
                                                success: false,
                                                message: err.errors.username.message
                                            }); // res.json... 

                                        } // if (err.errors.username) 
                                        else {
                                            if (err.errors.password) {

                                                res.json({
                                                    success: false,
                                                    message: err.errors.password.message
                                                }); // res.json...

                                            } // if (err.errors.password) 
                                            else {

                                                res.json({
                                                    success: false,
                                                    message: err
                                                }); // res.json...

                                            } // else 

                                        } // else 

                                    } // else 

                                } // if (err.errors
                                else {

                                    res.json({
                                        success: false,
                                        message: 'User could not be saved!',
                                        error: err
                                    }); // res.json...

                                } // else

                            } // else 

                        } // if(err) 
                        else {

                            res.json({
                                success: true,
                                message: 'Account Registered!'
                            }); //res.json

                        } // else

                    }) // user.save...
                } // else 

            } // else 

        } // else 

    }); // router.post

    router.get('/checkEmail/:email', (req, res) => {
        console.log(req.params);

        if (!req.params.email) {

            res.json({
                success: false,
                message: 'E-mail was not provided.'
            }); // res.jsom...

        } // if (!req.params.email)
        else {
            User.findOne({
                email: req.params.email
            }, (err, user) => {
                if (err) {

                    res.json({
                        success: false,
                        message: err
                    }); // res.json

                } // if (err) 
                else {

                    if (user) {

                        res.json({
                            success: false,
                            message: 'E-mail is already taken.'
                        }); // res.json...

                    } // if (user) 
                    else {

                        res.json({
                            success: true,
                            message: 'E-mail is available.'
                        }); // res.json...

                    } // else 

                } // else 

            }) // User.findOne...

        } // else 

    }); // router.get

    router.get('/checkUsername/:username', (req, res) => {

        console.log(req.params);

        if (!req.params.username) {

            res.json({
                success: false,
                message: 'Username was not provided.'
            }); // res.json...

        } else {

            User.findOne({
                username: req.params.username
            }, (err, user) => {

                if (err) {

                    res.json({
                        success: false,
                        message: err
                    }); // res.json...

                } // if (err)
                else {
                    if (user) {

                        res.json({
                            success: false,
                            message: 'Username is already taken.'
                        }); // res.json...

                    } // if (user)
                    else {

                        res.json({
                            success: true,
                            message: 'Username is available.'
                        }); // res.json...

                    } // else  

                } // else

            }) // User.findOne...

        } // else

    }); // router.get...

    router.post('/login', (req, res) => {

        if (!req.body.username) {

            res.json({
                success: false,
                message: 'No username was provided.'
            }); // res.json...

        } // if(!req.body.username) 
        else {
            if (!req.body.password) {

                res.json({
                    success: false,
                    message: 'No password was provided.'
                }); // res.json...

            } // if (!req.body.password)
            else {
                User.findOne({
                    username: req.body.username.toLowerCase()
                }, (err, user) => {
                    if (err) {

                        res.json({
                            success: false,
                            message: err
                        }); // res.json...

                    } // if (err)
                    else {
                        if (!user) {

                            res.json({
                                success: false,
                                message: 'Username not found.'
                            }); // res.json...

                        } // if (!user)
                        else {

                            const validPassword = user.comparePassword(req.body.password);

                            if (!validPassword) {

                                res.json({
                                    success: false,
                                    message: 'This password is invalid.'
                                }); // res.json...

                            } // if (!validPassword)
                            else {

                                res.json({
                                    success: true,
                                    message: 'User logged in.'
                                }); // res.json...

                            } // else

                        } // else 

                    } // else 

                }); // User.findOne...

            } // else 

        } // else 

    }); // router.post...

    return router;

} // module.exports