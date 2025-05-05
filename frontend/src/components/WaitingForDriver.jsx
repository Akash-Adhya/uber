import React from 'react';

const WaitingForDriver = (props) => {
    return (
        <div className='mt-7'>
            <h5 className="p-1 m-0 text-center w-[93%] absolute top-0"
                onClick={() => {
                    props.setWaitingForDriver(false);
                }}>
                <i className="text-3xl font-bold text-gray-500 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-3xl font-bold pb-5'>Meet at the pickup</h3>
            <div className="flex items-center justify-between pb-5">
                <img
                    className="h-20"
                    src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png'
                    alt="Vehicle illustration"
                />
                <div className='text-right'>
                    <h2 className='text-lg font-medium'>Harry Sharma</h2>
                    <h4 className='text-xl font-semibold'>WB 67 A 1234</h4>
                    <p className=' text-gray-600'>Tata nano</p>
                    <h4 className='font-medium'><i className="ri-star-s-line"></i>3.2</h4>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center'>
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

export default WaitingForDriver;