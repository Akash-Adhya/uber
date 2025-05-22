// Component for finishing a ride and showing ride summary to the captain.
import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const FinishRide = (props) => {

    const navigate = useNavigate()

    async function endRide() {
        // Show ride complete toast (API call commented out)
        toast.success("Ride Complete!");
        // Example: send ride end request to backend and navigate
        // const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

        //     rideId: props.ride._id


        // }, {
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem('token')}`
        //     }
        // })

        // if (response.status === 200) {
        //     navigate('/captain-home')
        // }

    }

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                // Close finish ride panel
                props.setFinishRidePanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>
            <div className='flex items-center justify-between p-4 border-2 border-gray-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
                    <h2 className='text-lg font-medium'>Jonny Sins</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>8B bus turminus, Jadavpur</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Jadavpur, Kolkata</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Sonagachi beswa para</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹195</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>

                <div className='mt-10 w-full'>

                    <Link
                        to='/captain/home'
                        onClick={endRide}
                        className='w-full mt-5 flex  text-lg justify-center bg-black text-white font-semibold p-3 rounded-lg'>Finish Ride
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FinishRide;