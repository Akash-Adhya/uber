// Service functions for user creation and related business logic.

const userModel = require('../models/user.model'); // User mongoose model

/**
 * Creates a new user in the database.
 * @param {Object} param0 - User details
 * @returns {Promise<Object>} The created user document
 */
module.exports.createUser = async ({firstname, lastname, email, password}) => {
    // Validate required fields
    if(!firstname || !email || !password){
        throw new Error("All fields are required!");
    }

    // Create and return the user document
    const user = await userModel.create({
        fullname: {
            firstname, 
            lastname,
        },
        email,
        password,
    });

    return user;
}
