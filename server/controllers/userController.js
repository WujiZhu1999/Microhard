const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

// Get currently logged in user
const getUser = (req, res, next) => {
    User.findById(req.payload.id)
        .then(function (user) {
            if (!user) {
                return res.sendStatus(401).send('The user does not exist.');
            }

            return res.json(user.toAuthJSON());
        })
        .catch(next);
};

// Update user information
const updateUser = (req, res, next) => {
    User.findById(req.payload.id)
        .then(function (user) {
            if (!user) {
                return res.sendStatus(401).send('The user does not exist.');
            }

            // only update fields that were actually passed...
            if (typeof req.body.user.username !== 'undefined') {
                user.username = req.body.user.username;
            }
            if (typeof req.body.user.email !== 'undefined') {
                user.email = req.body.user.email;
            }
            if (typeof req.body.user.bio !== 'undefined') {
                user.bio = req.body.user.bio;
            }
            if (typeof req.body.user.image !== 'undefined') {
                user.image = req.body.user.image;
            }
            if (typeof req.body.user.password !== 'undefined') {
                user.setPassword(req.body.user.password);
            }

            return user.save().then(function () {
                return res.json(user.toAuthJSON());
            });
        })
        .catch(next);
};

// Sign in in a user
const signInUser = (req, res, next) => {
    if (!req.body.user.email) {
        return res.status(422).send("Email can't be blank");
    }

    if (!req.body.user.password) {
        return res.status(422).send("Password can't be blank");
    }

    passport.authenticate('local', { session: false }, function (err, user, info) {
        if (err) {
            return next(err);
        }

        if (user) {
            user.token = user.generateJWT();
            return res.json(user.toAuthJSON());
        } else {
            return res.status(422).json(info);
        }
    })(req, res, next);
};

// Sign up a new user
const signUpUser = (req, res, next) => {
    let user = new User();

    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.setPassword(req.body.user.password);

    user.save()
        .then(function () {
            passport.authenticate('local', { session: false }, function (err, user, info) {
                if (err) {
                    return next(err);
                }

                if (user) {
                    user.token = user.generateJWT();
                    return res.json(user.toAuthJSON());
                } else {
                    return res.status(422).json(info);
                }
            })(req, res, next);
        })
        .catch(next);
};

// Delete user
const deleteUser = (req, res, next) => {
    User.findByIdAndRemove(req.payload.id)
        .then(function (user) {
            if (!user) {
                return res.sendStatus(401).send('The user does not exist.');
            }

            res.json(user);
        })
        .catch(next);
};

module.exports = {
    getUser,
    updateUser,
    signInUser,
    signUpUser,
    deleteUser,
};
