// Import required models and libraries
const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');

/**
 * Middleware to authenticate a user using JWT.
 * Checks for token in cookies or Authorization header.
 * Verifies token, checks blacklist, and attaches user to req.user if valid.
 */
module.exports.authUser = async (req, res, next) => {
    // Get token from cookie or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        // No token provided
        return res.status(401).json({ message: 'Unauthorized access !!' })
    }

    // Check if token is blacklisted (i.e., user logged out)
    const blacklistToken = await blacklistTokenModel.findOne({ token: token });
    if (blacklistToken) {
        return res.status(401).json({ message: 'User is logged out!' });
    }

    // After verifying the token
    req.token = token;

    try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Find user by decoded ID
        const user = await userModel.findById(decoded._id);
        if (!user) {
            // User not found
            return res.status(401).json({ message: 'Unauthorized access !!' });
        }
        // Attach user to request object for downstream use
        req.user = user;
        return next();
    } catch (err) {
        // Token invalid or expired
        return res.status(401).json({ message: 'Unauthorized access !!' });
    }
}

/**
 * Middleware to authenticate a captain using JWT.
 * Checks for token in cookies or Authorization header.
 * Verifies token, checks blacklist, and attaches captain to req.captain if valid.
 */
module.exports.authCaptain = async (req, res, next) => {
    // Get token from cookie or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        // No token provided
        return res.status(401).json({ message: 'Unauthorized access !' })
    }

    // Check if token is blacklisted (i.e., captain logged out)
    const blacklistToken = await blacklistTokenModel.findOne({ token: token });
    if (blacklistToken) {
        return res.status(401).json({ message: 'Unauthorized access !' });
    }

    // After verifying the token
    req.token = token;

    try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Find captain by decoded ID
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            // Captain not found
            return res.status(401).json({ message: 'Unauthorized access !!' });
        }
        // Attach captain to request object for downstream use
        req.captain = captain;
        return next();
    } catch (err) {
        // Token invalid or expired
        return res.status(401).json({ message: 'Unauthorized access !!!' });
    }
}