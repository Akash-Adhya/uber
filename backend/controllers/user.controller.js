// Controller for user authentication, registration, profile, and logout endpoints.

const userModel = require('../models/user.model')
const userService = require('../services/user.service')
const { validationResult } = require('express-validator');
const BlacklistToken = require('../models/blacklistToken.model');


module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password} = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email !!" });
    }

    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname, 
        lastname: fullname.lastname, 
        email,
        password: hashPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({token, user});

}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message: "Invalid email or password"});
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: "Invalid email or password"});
    }

    const token = user.generateAuthToken();
    res.cookie('token', token);


    res.status(200).json({token, user});
}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}



module.exports.logoutUser = async (req, res, next) => {
    
    try {
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