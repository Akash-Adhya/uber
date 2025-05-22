/**
 * Mongoose model schema and methods for captain documents.
 * @fileoverview Captain model schema and methods.
 * Defines structure and behavior of captain documents.
 * 
 * Schema Fields:
 * - fullname: First and last name
 * - email: Unique email address
 * - password: Hashed password (not returned in queries)
 * - status: active/inactive
 * - vehicle: Details about captain's vehicle
 * - location: Current geographical coordinates
 * 
 * Methods:
 * - generateAuthToken: Creates JWT for authentication
 * - comparePassword: Validates password against hash
 * - hashPassword: Creates password hash
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Captain schema definition
const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // Do not return password by default
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 character long."],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 character long."],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1 "],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'shuttle']
        }
    },
    location: {
        lat: { type: Number },
        lng: { type: Number },
    },
});

/**
 * Generates a JWT token for captain authentication.
 * @returns {string} JWT token valid for 24 hours
 */
captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
}

/**
 * Compares provided password with stored hash.
 * @param {string} password - Plain text password to compare
 * @returns {Promise<boolean>} True if passwords match
 */
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

/**
 * Hashes a password using bcrypt.
 * @param {string} password - Plain text password to hash
 * @returns {Promise<string>} Hashed password
 */
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

// Create and export the captain model
const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;
