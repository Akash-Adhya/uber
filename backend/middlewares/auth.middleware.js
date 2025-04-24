const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized access !!'})
    }

    const blacklistToken = await userModel.findOne({token: token});
    if(blacklistToken){
        return res.status(401).json({message: 'User is logged out!'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if(!user){
            return res.status(401).json({ message: 'Unauthorized access !!'});
        }
        req.user = user;
        return next();
    } catch(err){
        return res.status(401).json({ message: 'Unauthorized access !!'});
    }
}
