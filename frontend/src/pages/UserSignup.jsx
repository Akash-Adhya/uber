import React, { useState } from "react";
// import { useEffect } from 'react';
import { Link } from "react-router-dom";

const UserSignup = () => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        setUserData({
            fullname: {
                firstname: firstname,
                lastname: lastname,
            },
            email: email,
            password: password
        });
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    };

    // for testing purposes, is data coming or not , if yes then how data is coming.
    // useEffect(() => {
    //     if (userData.firstname && userData.email && userData.password) {
    //         console.log(userData);
    //     }
    // }, [userData]);


    return (
        <div className="p-5 h-screen flex flex-col justify-between">
            <div>
                <img className="w-1/4 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber-logo" />
                <form onSubmit={submitHandler}>
                    <h3 className="text-base font-medium mb-3">Enter your name</h3>
                    <div className="flex gap-4 mb-3">
                        <input
                            className="bg-[#eeeeee] w-1/2 px-4 py-2 mb-7 rounded border text-base placeholder:text-sm"
                            required
                            type="text"
                            value={firstname}
                            onChange={(e) => { setFirstName(e.target.value); }}
                            placeholder="First name"
                        />
                        <input
                            className="bg-[#eeeeee] w-1/2 px-4 py-2 mb-7 rounded border text-base placeholder:text-sm"
                            type="text"
                            value={lastname}
                            onChange={(e) => { setLastName(e.target.value); }}
                            placeholder="Last name"
                        />
                    </div>
                    <h3 className="text-base font-medium mb-3">Enter your email</h3>
                    <input
                        className="bg-[#eeeeee] w-full px-4 py-2 mb-7 rounded border text-base placeholder:text-sm"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); }}
                        placeholder="email@example.com"
                    />
                    <h3 className="text-base font-medium mb-3">Enter Password</h3>
                    <input
                        className="bg-[#eeeeee] w-full px-4 py-2 mb-7 rounded border text-base placeholder:text-sm"
                        required
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); }}
                        placeholder="password"
                    />
                    <button className="bg-black text-white w-full px-4 py-2 mb-3 rounded text-xl placeholder:text-base ">Signup</button>
                </form>

                <p className="text-center">Already have an account ? <Link to="/users/login" className="text-blue-600" >Login</Link></p>
            </div>
            <div>
                <p className="text-xs leading-tight">This site is protected by reCAPTCHA and the <span className="underline">Google Privacy policy</span> and <span className="underline">Terms of Service apply</span>.</p>
            </div>
        </div>
    );
}

export default UserSignup;