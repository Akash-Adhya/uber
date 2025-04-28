import React, { useState } from "react";
// import { useEffect } from "react";
import { Link } from "react-router-dom";


const UserLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [userData, setUserData] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        setUserData({
            email:email,
            password:password
        });
        // console.log(email, password);
        setEmail('');
        setPassword('');
    };

    // This function observe over the captainData and 
    // whenever any changes happens, it changes(reloads) the webpage for that perticular portion,
    // not the whole page.
    // useEffect(() => {
    //     if (userData.email && userData.password) { 
    //         console.log(userData);
    //     }
    // }, [userData]);


    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img className="w-1/4 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber-logo" />
                <form onSubmit={submitHandler}>
                    <h3 className="text-lg font-medium mb-3">Enter your email</h3>
                    <input
                        className="bg-[#eeeeee] w-full px-4 py-2 mb-7 rounded border text-xl placeholder:text-base"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); }}
                        placeholder="email@example.com"
                    />
                    <h3 className="text-lg font-medium mb-3">Enter Password</h3>
                    <input
                        className="bg-[#eeeeee] w-full px-4 py-2 mb-7 rounded border text-xl placeholder:text-base"
                        required
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); }}
                        placeholder="password"
                    />
                    <button className="bg-black text-white w-full px-4 py-2 mb-3 rounded text-xl placeholder:text-base ">Login</button>
                </form>

                <p className="text-center">New here? <Link to="/users/signup" className="text-blue-600" >Create New Account</Link></p>
            </div>

            <div>
                <Link to="/captains/login" className="flex items-center justify-center w-full bg-[#B8860B] text-white w-full px-4 py-2 mb-7 rounded text-xl">Login as a Captain</Link>
            </div>
        </div>
    );
}

export default UserLogin;