// Page for displaying ride details, driver info, and payment confirmation.
import React from 'react';
import { Link } from 'react-router-dom';

const Riding = () => {
    return (
        <div className='h-screen flex flex-col'>

            <Link to='/home' className='fixed bg-white h-10 w-10 flex items-center justify-center rounded-full top-2 right-2'>
                <i className="text-xl ri-home-5-line"></i>
            </Link>

            {/* Map Section - Top Half */}
            <div className='flex-1 h-1/2'>
                <img
                    className="w-full h-full object-cover"
                    src="https://cdn.dribbble.com/users/844221/screenshots/4539927/attachments/1027442/uber-search-2.png?resize=400x300&vertical=center"
                    alt="Map view"
                />
            </div>

            {/* Ride Details Section - Bottom Half */}
            <div className='flex-1 h-1/2 flex flex-col overflow-y-auto'>
                {/* Driver & Vehicle Info */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <img
                        className="h-20 w-20 object-contain"
                        src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png'
                        alt="Vehicle illustration"
                    />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium'>Harry Sharma</h2>
                        <h4 className='text-xl font-semibold'>WB 67 A 1234</h4>
                        <p className='text-gray-600'>Tata nano</p>
                        <div className='flex items-center justify-end gap-1'>
                            <i className="ri-star-s-fill text-yellow-400"></i>
                            <span className='font-medium'>3.2</span>
                        </div>
                    </div>
                </div>

                {/* Destination Info */}
                <div className='w-full p-4 space-y-4'>
                    <div className='flex items-center gap-4'>
                        <i className="text-sm ri-square-fill text-blue-500 "></i>
                        <div>
                            <h3 className='text-lg font-medium'>Destination Address</h3>
                            <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className='flex items-center gap-4'>
                        <i className="ri-money-rupee-circle-fill text-green-500 text-am"></i>
                        <div>
                            <h3 className='text-xl font-bold'>₹193.20</h3>
                            <p className='text-sm text-gray-600'>Cash</p>
                        </div>
                    </div>
                </div>

                {/* Confirm Button - Sticky at bottom */}
                <div className='mt-auto p-4 bg-white border-t border-gray-200'>
                    <button className='w-full py-3 bg-black text-white text-xl font-semibold rounded-lg hover:bg-gray-800 transition-colors'>
                        Make a Payment
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Riding;