// Controller for captain authentication, registration, profile, and logout endpoints.

const captainModel = require('../models/captain.model'); // Captain mongoose model
const captainService = require('../services/captain.service'); // Service for captain logic
const { validationResult } = require('express-validator'); // For request validation
const BlacklistToken = require('../models/blacklistToken.model'); // Model for blacklisted tokens

/**
 * Registers a new captain.
 * Validates input, checks for existing captain, hashes password, creates captain, returns JWT.
 */
module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    // Check if captain already exists
    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
        return res.status(400).json({ message: "Captain already exists for this email!!" });
    }

    // Hash the password before saving
    const hashPassword = await captainModel.hashPassword(password);

    // Create the captain using the service
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    // Generate JWT token for authentication
    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
}

/**
 * Logs in a captain.
 * Validates input, checks credentials, returns JWT if valid.
 */
module.exports.loginCaptain = async (req, res, next ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    // Find captain by email and include password field
    const captain = await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(401).json({message: "Invalid email or password"});
    }

    // Compare password with hash
    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: "Invalid email or password"});
    }

    // Generate JWT token for authentication
    const token = captain.generateAuthToken();
    res.cookie('token', token);

    res.status(200).json({token, captain});
}

/**
 * Returns the authenticated captain's profile.
 */
module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain);
}

/**
 * Logs out the captain by blacklisting the JWT token.
 * Clears cookie and returns logout status.
 */
module.exports.logoutCaptain = async (req, res, next) => {
    try {
        // Get token from header or cookie
        const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Check if token is already blacklisted
        const existingEntry = await BlacklistToken.findOne({ token });
        if (existingEntry) {
            res.clearCookie('token');
            return res.status(200).json({ message: 'Already logged out' });
        }

        // Add token to blacklist
        await BlacklistToken.create({ token });
        
        res.clearCookie('token');
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error('Logout error:', error);
        
        // Handle duplicate key error specifically
        if (error.code === 11000) {
            res.clearCookie('token');
            return res.status(200).json({ message: 'Logout successful (token already blacklisted)' });
        }
        
        return res.status(500).json({ 
            message: "Logout failed",
            error: error.message
        });
    }
};


