// Signup page for captains to register their vehicle and personal details.
import React, { useState } from "react";
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { captainDataContext } from "../context/CaptainContext";



const CaptainSignup = () => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [captainData, setCaptainData] = useState({});
    const [color, setColor] = useState('');
    const [plate, setPlate] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [capacity, setCapacity] = useState('');

    const navigate = useNavigate();

    const { captain, setCaptain } = React.useContext(captainDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newCaptain = {
            fullname: {
                firstname: firstname,
                lastname: lastname,
            },
            email: email,
            password: password,
            vehicle: {
                color: color,
                plate: plate,
                capacity: capacity,
                vehicleType: vehicleType
            }
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain);

        if (response.status === 201) {
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain/home')
        }

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setColor('');
        setPlate('');
        setVehicleType('');
        setCapacity(0);
    };

    // for testing purposes, is data coming or not? , if yes then how data is coming.
    // useEffect(() => {
    //     if (captainData.firstname && captainData.email && captainData.password) {
    //         console.log(captainData);
    //     }
    // }, [captainData]);

    useEffect(() => {
        if (vehicleType === "bike") {
            setCapacity(1);
        } else {
            setCapacity(''); // Clear it for other types initially
        }
    }, [vehicleType]);


    return (
        <div className="p-5 h-screen flex flex-col justify-between">
            <div>
                <img className="w-20 mb-3" src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="uber-captain-logo" />
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
                    <h3 className="text-base font-medium mb-3">Vehicle Information</h3>
                    <div className="flex gap-4">
                        <input
                            className="bg-[#eeeeee] w-1/2 px-4 py-2 mb-7 rounded border text-base placeholder:text-sm"
                            required
                            type="text"
                            value={color}
                            onChange={(e) => { setColor(e.target.value); }}
                            placeholder="Vehicle Color"
                        />
                        <input
                            className="bg-[#eeeeee] w-1/2 px-4 py-2 mb-7 rounded border text-base placeholder:text-sm"
                            required
                            type="text"
                            value={plate}
                            onChange={(e) => { setPlate(e.target.value); }}
                            placeholder="Plate Number"
                        />
                    </div>
                    <div className="flex gap-4">
                        <select
                            className="bg-[#eeeeee] w-3/4 px-4 py-2 mb-7 rounded border text-base"
                            required
                            value={vehicleType}
                            onChange={(e) => { setVehicleType(e.target.value); }}
                        >
                            <option value="">Select Vehicle Type</option>
                            <option value="car">Car</option>
                            <option value="bike">Bike or Scooty</option>
                            <option value="shuttle">Shuttle</option>
                        </select>

                        <div className="w-1/2">
                            <input
                                className="bg-[#eeeeee] w-full px-4 py-2 mb-2 rounded border text-base placeholder:text-sm appearance-none"
                                required
                                type="number"
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                                placeholder="Vehicle Capacity"
                                disabled={vehicleType === "bike"}
                                min={vehicleType === "car" ? 3 : vehicleType === "shuttle" ? 1 : undefined}
                                max={vehicleType === "car" ? 12 : vehicleType === "shuttle" ? 29 : undefined}
                                onKeyDown={(e) => {
                                    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                            {vehicleType === "shuttle" && (
                                <p className="text-xs text-gray-600">Max 29 passengers</p>
                            )}

                            {vehicleType === "car" && (
                                <p className="text-xs text-gray-600">Min 3 and Max 12</p>
                            )}
                        </div>
                    </div>


                    <button className="bg-black text-white w-full px-4 py-2 mb-3 rounded text-xl placeholder:text-base ">Signup</button>
                </form>

                <p className="text-center">Already registered ? <Link to="/captains/login" className="text-blue-600" >Login here</Link></p>
            </div>
            <div className="mt-8 mb-2">
                <p className="text-xs leading-tight">This site is protected by reCAPTCHA and the <span className="underline">Google Privacy policy</span> and <span className="underline">Terms of Service apply</span>.</p>
            </div>
        </div>
    );
}

export default CaptainSignup;