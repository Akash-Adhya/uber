import React, { useState, useEffect } from 'react';



const LocationSearchPanel = ({
  setPanelOpen,
  vehiclePanelOpen,
  setVehiclePanelOpen,
  setPickup,
  setDestination,
  activeInput,
  pickup,
  destination,
  currentLocationAddress // <-- Add this prop
}) => {


  const [activeIndex, setActiveIndex] = useState('');

  const locations = [
    "Swapna Apartment, Jorabagan, near Jorabagan post office, Kolkata",
    "221B Baker Street, London",
    "188, Raja S.C. Mallick Rd, Kolkata – 700032.",
    "Plot No.8, Salt Lake Bypass, LB Block, Sector-III, Salt Lake City, Kolkata – 700106"
  ];

  useEffect(() => {
    if (!vehiclePanelOpen) {
      setActiveIndex(''); // Reset activeIndex when the panel is closed
    }
  }, [vehiclePanelOpen]);

  return (
    <div className="flex flex-col gap-4 m-0">
      {/* Use Current Location Button */}
      <button
        className="flex items-center border-2 border-blue-500 rounded-xl p-2 cursor-pointer bg-blue-50 hover:bg-blue-100 transition mb-2"
        onClick={() => {
          if (!currentLocationAddress) return;
          if (activeInput === "pickup") {
            setPickup(currentLocationAddress);
          } else if (activeInput === "destination") {
            setDestination(currentLocationAddress);
          }
          // Optionally close the panel or move to next step if both are filled
          const newPickup = activeInput === "pickup" ? currentLocationAddress : pickup;
          const newDestination = activeInput === "destination" ? currentLocationAddress : destination;
          if (newPickup && newDestination) {
            setPanelOpen(false);
            setVehiclePanelOpen(true);
            setPickup('');
            setDestination('');
          }
        }}
        disabled={!currentLocationAddress}
      >
        <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <i className="ri-navigation-fill text-2xl text-blue-600"></i>
        </div>
        <div className="ml-4 bg-white rounded-2xl w-full text-left">
          <h4 className="text-base font-medium text-blue-800">
            Use Current Location
          </h4>
          <div className="text-xs text-gray-500 truncate">{currentLocationAddress || "Locating..."}</div>
        </div>
      </button>
      {locations.map((location, index) => (
        <div
          key={index}
          onClick={() => {
            setActiveIndex(index);
            // Simulate updated values
            const newPickup = activeInput === "pickup" ? location : pickup;
            const newDestination = activeInput === "destination" ? location : destination;
            // Update actual state
            if (activeInput === "pickup") {
              setPickup(location);
            } else if (activeInput === "destination") {
              setDestination(location);
            }
            // Now safely check both fields
            if (newPickup && newDestination) {
              // Move to the next panel
              setPanelOpen(false);
              setVehiclePanelOpen(true);

              // Reset input fields
              setPickup('');
              setDestination('');
            }
          }}


          className={`flex items-center border-2 rounded-xl ${activeIndex === index ? 'border-black' : 'border-gray-100'} p-2 cursor-pointer`}
        >
          <div className="h-12 w-12 bg-[#eee] rounded-full flex items-center justify-center flex-shrink-0">
            <i className="ri-map-pin-fill text-xl"></i>
          </div>
          <div className="ml-4 bg-white rounded-2xl w-full">
            <h4 className="text-base font-medium text-gray-800">
              {location}
            </h4>
          </div>
        </div>
      ))}

    </div>
  );
};

export default LocationSearchPanel;
