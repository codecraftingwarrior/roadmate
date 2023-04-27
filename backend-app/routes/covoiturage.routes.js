const express = require('express');
const jwtTokenVerifier = require("../middleware/auth")

const covoiturageRoute = express.Router()

covoiturageRoute.use(jwtTokenVerifier)

let Covoiturage = require('../models/Covoiturage')
const createError = require("http-errors");
const Internaute = require("../models/Internaute");
const bcrypt = require("bcrypt");

covoiturageRoute
    .route('/store')
    .post((req, res, next) => {
        const covoiturage = req.body

        Covoiturage
            .create(covoiturage)
            .then(data => res.status(201).json(data))
            .catch(err => next(err))
    })

covoiturageRoute
    .route('/:userEmail/bookings')
    .get((req, res, next) => {
        const {userEmail} = req.params

        Covoiturage
            .find({'passengers.email': userEmail})
            .sort({date: 1})
            .then(documents => res.status(200).json(documents))
            .catch((error) => next(error));
    })


covoiturageRoute
    .route('/find-cities')
    .get((req, res, next) => {

        const projection = {
            _id: 1,
            "departureCity.name": 1,
            "arrivalCity.name": 1
        };

        Covoiturage
            .find({}, projection)
            .then(data => res.status(200).json(data))
            .catch(err => next(err))
    })


covoiturageRoute
    .route('/update/:id')
    .put(async (req, res, next) => {
        Covoiturage
            .findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true})
            .exec()
            .then(data => res.status(200).json(data))
            .catch(err => next(err))
    });

covoiturageRoute
    .route('/user/:email/find')
    .get((req, res, next) => {
        Covoiturage
            .find({driverEmail: req.params.email})
            .sort({date: 1})
            .then(data => res.status(200).json(data))
            .catch(err => next(err))
    })

covoiturageRoute
    .route('/delete/:id')
    .delete((req, res, next) => {
        Covoiturage
            .findByIdAndDelete(req.params.id)
            .exec()
            .then(data => res.status(200).json({deleted: data}))
            .catch(err => next(err))
    });

covoiturageRoute
    .route('/search')
    .post((req, res, next) => {

        const criteria = {}

        let {departureCity, arrivalCity, date, maxPrice, numSeats} = req.body

        if (departureCity?.length) {
            criteria['departureCity.name'] = departureCity
        }

        if (arrivalCity?.length) {
            criteria['arrivalCity.name'] = arrivalCity
        }

        if (date?.length) {
            criteria['date'] = {$regex: '^' + date}
        }

        if (maxPrice !== 0) {
            criteria['price'] = {$lte: maxPrice}
        }

        if (numSeats === 0 || numSeats === null)
            numSeats = 1

        criteria['$expr'] = {
            $gte: [
                {$subtract: ['$numSeats', {$size: '$passengers'}]},
                numSeats
            ]
        }


        Covoiturage
            .find(criteria)
            .sort({date: 1})
            .then(data => res.status(200).json(data))
            .catch(err => next(err))
    })

covoiturageRoute
    .route('/:id/book')
    .put(async (req, res, next) => {
        const {passenger} = req.body;
        console.log('passenger', passenger);
        let errorCarpoolNotFound = createError(401, 'Covoiturage non trouvé');
        let errorNoMoreAvailableSeats = createError(401, 'Il reste plus de siége disponible');
        let errorPassengerAlreadyExists = createError(401, 'Passager déja existe');

        let fetchedCovoiturage = await Covoiturage.findById(req.params.id).exec()

        if (!fetchedCovoiturage) {
            return next(res.status(errorCarpoolNotFound.statusCode).json({message: errorCarpoolNotFound.message}))
        }

        if (fetchedCovoiturage.passengers.indexOf(passenger) !== -1) {
            return next(res.status(errorPassengerAlreadyExists.statusCode).json({message: errorPassengerAlreadyExists.message}))
        }
        console.log(fetchedCovoiturage.passengers.find(element => element === passenger))

        if (fetchedCovoiturage.passengers.length < fetchedCovoiturage.numSeats) {
            Covoiturage
                .findByIdAndUpdate(req.params.id, {$addToSet: {passengers: passenger}}, {new: true})
                .exec()
                .then(data => {
                    console.log(data)
                    res.status(200).json(data)
                })
                .catch(err => next(err))
        } else {
            return next(res.status(errorNoMoreAvailableSeats.statusCode).json({message: errorNoMoreAvailableSeats.message}))
        }

    });

module.exports = covoiturageRoute