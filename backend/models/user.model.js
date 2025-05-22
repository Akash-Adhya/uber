/**
 * @fileoverview User model schema and methods.
 * Defines the structure and behavior of user documents.
 * Mongoose model schema and methods for user documents.
 */

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// User schema definition
const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long."]
        },
        lastname: {
            type: String,
            minlength: [3, "Last name must be at least 3 characters long."]
        },
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false, // Do not return password by default
    },
    socketId: {
        type: String,
    },
});

/**
 * Generates a JWT token for user authentication.
 * @method generateAuthToken
 * @returns {string} JWT token valid for 24 hours
 */
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

/**
 * Compares provided password with stored hash.
 * @method comparePassword
 * @param {string} password - Plain text password to compare
 * @returns {Promise<boolean>} True if passwords match
 */
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

/**
 * Hashes a password using bcrypt.
 * @method hashPassword
 * @param {string} password - Plain text password to hash
 * @returns {Promise<string>} Hashed password
 */
userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password, 10);
}

// Create and export the user model
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;