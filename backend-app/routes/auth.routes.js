const express = require('express');
const authRoute = express.Router();
const createError = require("http-errors");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")


let Internaute = require('../models/Internaute');

authRoute
    .route('/register')
    .post(async (req, res, next) => {
        const internaute = req.body;

        const {password} = internaute

        const errors = await Internaute.checkUniqueness(internaute)

        if (errors.length > 0) {
            let err = createError(422, errors.join("\n"), {expose: false});
            return next(res.status(err.statusCode).json({message: err.message}));
        }

        req.body.password = await bcrypt.hash(password, 10)

        Internaute
            .create(internaute)
            .then(data => res.status(201).json(data))
            .catch(err => next(err))
    });

authRoute
    .route('/login')
    .post(async (req, res, next) => {

        const {email, password} = req.body;
        let error = createError(401, 'Login ou mot de passe incorrect.');

        if (!email || !password) {
            return next(res.status(error.statusCode).json({message: error.message}))//TODO
        }

        let fetchedUser = await Internaute.findOne({email}).exec()

        if (!fetchedUser) {
            return next(res.status(error.statusCode).json({message: error.message}))//TODO
        }

        const result = await bcrypt.compare(password, fetchedUser.password);

        if (!result) {
            return next(res.status(error.statusCode).json({message: error.message}))//TODO
        }

        const token = jwt.sign({
            id: fetchedUser.id,
            username: fetchedUser.email
        }, process.env.JWT_SECRET, {expiresIn: '48 hours'})

        return res.json({token})
    })


module.exports = authRoute;