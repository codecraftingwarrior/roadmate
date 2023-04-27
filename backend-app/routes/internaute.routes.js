const express = require('express');
const createError = require("http-errors");
const bcrypt = require("bcrypt")
const jwtTokenVerifier = require("../middleware/auth")

const internauteRoute = express.Router();

internauteRoute.use(jwtTokenVerifier)

let Internaute = require('../models/Internaute');


internauteRoute
    .route('/find/:id')
    .get((req, res, next) => {
        Internaute
            .findById(req.params.id)
            .exec()
            .then(data => res.status(200).json(data))
            .catch(err => next(err))
    });

internauteRoute
    .route('/update/:id')
    .put(async (req, res, next) => {
        const {_id, firstName, lastName, phoneNumber, licenceNumber, licencePlateNumber, plainPassword, currentPassword} = req.body;

        let fetchedUser = await Internaute.findById(_id).exec()

        let mutableFields = {
            firstName,
            lastName,
            phoneNumber,
            licenceNumber,
            licencePlateNumber
        };

        if (plainPassword !== undefined) {
            const result = await bcrypt.compare(currentPassword, fetchedUser.password);
            let error = createError(400, 'Le mot de passe actuel saisie est incorrect.');

            if(!result) {
                return next(res.status(error.statusCode).json({message: error.message}))
            }

            mutableFields['password'] = await bcrypt.hash(plainPassword, 10)
        }

        Internaute
            .findByIdAndUpdate(req.params.id, {
                $set: mutableFields
            }, {new: true})
            .exec()
            .then(data => res.status(200).json(data))
            .catch(err => next(err))
    });


module.exports = internauteRoute;