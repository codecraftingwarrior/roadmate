const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({name: String, lat: Number, lng: Number, address: String})

let Covoiturage = new Schema({
    departureCity: placeSchema,
    arrivalCity: placeSchema,
    date: {
        type: String
    },
    email: {
        type: String
    },
    numSeats: {
        type: Number
    },
    passengers: {
        type: Array
    },
    driverEmail: {
      type: String
    },
    price: {
        type: Number
    }
});

module.exports = mongoose.model('Covoiturage', Covoiturage)