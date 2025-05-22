// Component for selecting a vehicle type and proceeding to ride confirmation.
import React, { useState } from 'react';

const VehiclePanel = (props) => {
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    return (
        <div>
            <h5 className="p-1 text-center w-[93%] absolute top-0"
                onClick={() => {
                    // Close vehicle panel and reset selection
                    props.setVehiclePanelOpen(false);
                    setSelectedVehicle(null);
                }}>
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>

            {props.vehicles.map(vehicle => (
                <div
                    key={vehicle.id}
                    onClick={() => {
                        // Set selected vehicle and open confirm ride panel
                        setSelectedVehicle(vehicle.id);
                        props.setConfirmRidePanel(true);
                        props.setVehiclePanelOpen(false);
                    }}
                    className={`flex border-2 mb-2 rounded-xl w-full p-3 items-center justify-between cursor-pointer transition-all duration-200 
                        ${selectedVehicle === vehicle.id ? 'border-black' : 'border-gray-100'}`}
                >
                    {/* Vehicle info */}
                    <img className="h-10" src={vehicle.img} alt="" />
                    <div className="ml-2 w-1/2">
                        <h5 className="text-base font-medium">{vehicle.name} <span className="ri-user-3-fill"></span></h5>
                        <h5 className="font-medium text-sm">{vehicle.time}</h5>
                        <h5 className="text-gray-600">{vehicle.desc}</h5>
                    </div>
                    <h2 className="text-lg font-semibold">{vehicle.price}</h2>
                </div>
            ))}
        </div>
    );
};

export default VehiclePanel;
