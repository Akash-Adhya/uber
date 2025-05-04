import React, { useState, useEffect } from 'react';

const LocationSearchPanel = (props) => {

  const [activeIndex, setActiveIndex] = useState('');

  const locations = [
    "Swapna Apartment, Jorabagan, near Jorabagan post office, Kolkata",
    "221B Baker Street, London",
    "188, Raja S.C. Mallick Rd, Kolkata – 700032.",
    "Plot No.8, Salt Lake Bypass, LB Block, Sector-III, Salt Lake City, Kolkata – 700106"
  ];

  useEffect(() => {
    if (!props.vehiclePanelOpen) {
      setActiveIndex(''); // Reset activeIndex when the panel is closed
    }
  }, [props.vehiclePanelOpen]);

  return (
    <div className="flex flex-col gap-4 m-0">

      {locations.map((location, index) => (
        <div
          key={index}
          onClick={() => {
            setActiveIndex(index);
            props.setVehiclePanelOpen(true);
            props.setPanelOpen(false);
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
