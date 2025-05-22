// Express routes for captain registration, login, profile, and logout.

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/register', [
    body('email').isEmail().withMessage("Invalid Email!!!"),
    body('fullname.firstname').isLength({ min: 3 }).withMessage("First name must be 3 characters long."),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
    body('vehicle.color').isLength({ min: 3 }).withMessage("Color must be at least 3 characters long."),
    body('vehicle.plate').isLength({ min: 3 }).withMessage("Plate must be at least 3 characters long."),
    body('vehicle.capacity').isNumeric().withMessage("Capacity must be a number."),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'shuttle']).withMessage("Vehicle type must be either car, bike or shuttle."),
], captainController.registerCaptain);


router.post('/login', [
    body('email').isEmail().withMessage("Invalid Email!!!"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
], captainController.loginCaptain);


router.post('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.post('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;