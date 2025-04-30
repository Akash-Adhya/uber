const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const BlacklistToken = require('../models/blacklistToken.model');



module.exports.registerCaptain = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
        return res.status(400).json({ message: "Captain already exists for this email!!" });
    }

    const hashPassword = await captainModel.hashPassword(password);

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

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });

}


module.exports.loginCaptain = async (req, res, next ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    const captain = await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(401).json({message: "Invalid email or password"});
    }

    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: "Invalid email or password"});
    }

    const token = captain.generateAuthToken();
    res.cookie('token', token);

    res.status(200).json({token, captain});
}


module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain);
}



module.exports.logoutCaptain = async (req, res, next) => {
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


