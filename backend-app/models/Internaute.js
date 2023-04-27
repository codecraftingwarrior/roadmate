const mongoose = require('mongoose');
const createError = require("http-errors");
const Schema = mongoose.Schema;

let Internaute = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    licenceNumber: {
        type: String
    },
    licencePlateNumber: {
        type: String
    },
     type: {
        type: String
     }
});

Internaute.statics.checkUniqueness = async (internaute) => {
    let uniqueCriteria = {
        $or: [
            {email: internaute.email},
            {phoneNumber: internaute.phoneNumber},
            {licenceNumber: internaute.licenceNumber},
            {licencePlateNumber: internaute.licencePlateNumber}
        ],
    };

    const messages = []

    try {

        const data = await mongoose.model('Internaute').find(uniqueCriteria).exec();

        if (data.some(user => internaute.email && user.email === internaute.email)) {
            messages.push('e-mail déjà existant.')
        }

        if (data.some(user => internaute.phoneNumber && user.phoneNumber === internaute.phoneNumber)) {
            messages.push('Numéro de téléphone deja existant.')
        }

        if (data.some(user => internaute.licenceNumber && user.licenceNumber === internaute.licenceNumber)) {
            messages.push('Numéro de permis deja existant.')
        }

        if (data.some(user => internaute.licencePlateNumber && user.licencePlateNumber === internaute.licencePlateNumber)) {
            messages.push('Numéro de plaque d\'immatriculation déjà existant.')
        }

    } catch (e) {
        console.log(e);
        messages.push('Une erreur est survenue');
    }

    return messages;
};


module.exports = mongoose.model('Internaute', Internaute)