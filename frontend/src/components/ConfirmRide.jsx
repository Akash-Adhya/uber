import React from 'react';
import { toast } from 'react-hot-toast'
const ConfirmRide = (props) => {

    const handle = () => {
        toast.success("Booking successful!");
        props.setVehicleFound(true);
        props.setConfirmRidePanel(false);
    }

    return (
        <div>
            <h5 className="p-1 text-center w-[93%] absolute top-0"
                onClick={() => {
                    props.setConfirmRidePanel(false);
                    props.setVehiclePanelOpen(true);
                }}>
                <i className="text-3xl font-bold text-gray-300 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-center">Confirm Your Ride</h3>


            <div className='flex flex-col justify-center items-center'>
                <img
                    className=""
                    src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png'
                    alt="Vehicle illustration"
                />

                <div className='w-full flex flex-col items-center'>
                    <div className='w-full flex items-center gap-5 p-3 border-b-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11 19.9451C6.50005 19.4476 3 15.6326 3 11C3 6.02944 7.02944 2 12 2C16.9706 2 21 6.02944 21 11C21 15.6326 17.5 19.4476 13 19.9451V24H11V19.9451Z" />
                            <circle cx="12" cy="11" r="2" fill="white" />
                        </svg>

                        <div >
                            <h3 className='text-lg font-medium'>Pickup Address</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>
                    <div className='w-full flex items-center gap-5  p-3 border-b-2'>
                        <i className="text-sm ri-square-fill"></i>
                        <div >
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
                <button onClick={handle} className='w-full m-3 mb-5 p-4 bg-black text-white text-2xl font-semibold rounded-xl'>Confirm</button>
            </div>

        </div>
    )
}

export default ConfirmRide;