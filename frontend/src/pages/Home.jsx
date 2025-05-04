import React, { useRef, useState } from 'react';
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

const vehicles = [
    {
        id: 'uberGo',
        name: 'UberGo',
        time: '2 mins away',
        desc: 'Affordable, compact rides',
        price: '₹193.20',
        img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png'
    },
    {
        id: 'moto',
        name: 'Moto',
        time: '3 mins away',
        desc: 'Affordable motorcycle rides',
        price: '₹79.80',
        img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png'
    },
    {
        id: 'shuttle',
        name: 'UberShuttle',
        time: '10 mins away',
        desc: 'Reliable & Low cost travel',
        price: '₹118.80',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyB0m31f_VO9YndLRfs0lJRRYaD7YtapvL2Q&s'
    }
];

const Home = () => {

    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');

    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);

    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
    const vehiclePanelOpenRef = useRef(null);

    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const confirmRidePanelRef = useRef(null);

    const [vehicleFound, setVehicleFound] = useState(false);
    const vehicleFoundRef = useRef(null);
    
    const [waitingForDriver, setWaitingForDriver] = useState(false);
    const waitingForDriverRef = useRef(null);

    const submitHandler = e => {
        e.preventDefault();

    }


    useGSAP(() => {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24,
                opacity: 1,
                duration: 0.8
            });
            gsap.to(panelCloseRef.current, {
                opacity: 1,
                duration: 0.8
            });
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0,
                opacity: 0,
                duration: 0.7
            });
            gsap.to(panelCloseRef.current, {
                opacity: 0,
                duration: 0.7
            });
        }
    }, [panelOpen]);

    useGSAP(() => {
        if (vehiclePanelOpen) {
            gsap.to(vehiclePanelOpenRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelOpenRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehiclePanelOpen]);

    useGSAP(() => {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePanel]);


    useGSAP(() => {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehicleFound]);


    useGSAP(() => {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [waitingForDriver]);


    return (


        <div className='h-screen relative overflow-hidden'>
            {/* uber logo */}
            <img
                className="w-1/4 absolute top-5 left-5"
                src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                alt="uber-logo"
            />


            {/* Template image for development */}
            <div
                className="h-screen w-screen ">
                <img
                    onClick={() => setVehiclePanelOpen(false)}
                    className="h-full w-full object-cover"
                    src="https://cdn.dribbble.com/users/844221/screenshots/4539927/attachments/1027442/uber-search-2.png?resize=400x300&vertical=center"
                    alt="something"
                />

            </div>


            {/* Select pickup and Destination location section */}
            <div className=' flex flex-col justify-end h-screen absolute top-0 w-full '>
                <div className='h-[30%] p-6 bg-white relative rounded-3xl'>
                    <h5
                        ref={panelCloseRef}
                        onClick={() => {
                            setPanelOpen(false);
                        }}
                        className='absolute opacity-0 right-6 top-6 text-2xl'>
                        <i className="ri-arrow-down-wide-line" />
                    </h5>
                    <h4 className='text-2xl font-bold'>Find a trip</h4>
                    <form onSubmit={
                        (e) => {
                            submitHandler(e);
                        }
                    }>
                        <input
                            onClick={() => setPanelOpen(true)}
                            value={pickup}
                            onChange={(e) => setPickup(e.target.value)}
                            className="bg-[#eee] px-12 py-3 text-base rounded-lg w-full mt-5"
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        <input
                            onClick={() => setPanelOpen(true)}
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="bg-[#eee] px-12 py-3 text-base rounded-lg w-full mt-5"
                            type="text"
                            placeholder='Add your destination' />
                    </form>
                </div>
                <div ref={panelRef} className='bg-white h-0'>
                    <LocationSearchPanel setPanelOpen={setPanelOpen} vehiclePanelOpen={vehiclePanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
                </div>
            </div>


            {/* Ride Selection Section */}
            <div ref={vehiclePanelOpenRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10'>
                <VehiclePanel vehicles={vehicles} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} />
            </div>

            {/* Confirm Ride Section */}
            <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-3'>
                <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} setVehicleFound={setVehicleFound} />
            </div>

            {/* Searching for driver Section */}
            <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-3'>
                <LookingForDriver setVehicleFound={setVehicleFound} />
            </div>


            {/* Waiting for the driver to come to the pickup spot */}
            <div ref={waitingForDriverRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-3'>
                <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
            </div>

        </div>
    )
}

export default Home;