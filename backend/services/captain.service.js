// Service functions for captain creation and related business logic.

const captainModel = require('../models/captain.model'); // Captain mongoose model

/**
 * Creates a new captain in the database.
 * @param {Object} param0 - Captain details
 * @returns {Promise<Object>} The created captain document
 */
module.exports.createCaptain = async (
    { firstname, lastname, email, password, color, plate, capacity, vehicleType }
) => {
    // Validate required fields
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required!');
    }

    // Create and return the captain document
    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });

    return captain;
};