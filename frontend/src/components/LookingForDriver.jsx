// Component for displaying the "Looking for a Driver" animation and info.
import React from 'react';
import { useEffect } from 'react';

const LookingForDriver = (props) => {

useEffect(() => {
    if (props.vehicleFound) {
        // After 3 seconds, close this panel and show waiting for driver
        const timer = setTimeout(() => {  
            props.setVehicleFound(false);
            props.setWaitingForDriver(true);
        }, 3000);

        return () => clearTimeout(timer);
    }
}, [props.vehicleFound, props.setVehicleFound, props.setWaitingForDriver]);

    return (
        <div>
            <h5 className="p-1 text-center w-[93%] absolute top-0"
                onClick={() => {
                    // Allow user to close the panel manually
                    props.setVehicleFound(false);
                }}>
                <i className="text-3xl font-bold text-gray-500 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mt-8 mb-4 text-center">Looking for a Driver</h3>
            <div className='flex flex-col justify-center items-center'>
                <img
                    className=""
                    src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png'
                    alt="Vehicle illustration"
                />

                <hr className="w-screen h-px bg-gray-400 " />

                <div className='w-full flex flex-col items-center'>
                    <div className='w-full flex items-center gap-5 p-3 border-b-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11 19.9451C6.50005 19.4476 3 15.6326 3 11C3 6.02944 7.02944 2 12 2C16.9706 2 21 6.02944 21 11C21 15.6326 17.5 19.4476 13 19.9451V24H11V19.9451Z" />
                            <circle cx="12" cy="11" r="2" fill="white" />
                        </svg>
                        <div>
                            <h3 className='text-lg font-medium'>Pickup Address</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>
                    <div className='w-full flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-sm ri-square-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Destination Address</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>
                    <div className='w-full flex items-center gap-5 p-3 '>
                        <i className="ri-cash-fill"></i>
                        <div >
                            <h3 className='text-xl font-bold'>₹193.20</h3>
                            <p className='text-sm -mt-1 text-gray-600'>cash</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LookingForDriver;