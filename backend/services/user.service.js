const userModel = require('../models/user.model');


const createUser = async ({firstname, lastname, email, password}) => {
    if(!firstname || !email || !password){
        throw new Error("All fields are required!");
    }

    
}

module.exports = createUser;