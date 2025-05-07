import axios from "axios";
// const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async ({ address, setAddress, onLocationFound }) => {
    const handleSearch = async () => {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
            const location = {
                lat: data[0].lat,
                lon: data[0].lon,
                display_name: data[0].display_name,
            };
            onLocationFound(location);
        } else {
            onLocationFound(null);
        }
    };

    return (
        <div className="p-4">
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter an address"
                className="border p-2 rounded mr-2"
            />
            <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
                Find Location
            </button>
        </div>
    );
};


// module.exports.getDistanceTime = async (origin, destination) => {
//     if (!origin || !destination) {
//         throw new Error('Origin and destination are required');
//     }

//     const apiKey = process.env.GOOGLE_MAPS_API;

//     const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

//     try {


//         const response = await axios.get(url);
//         if (response.data.status === 'OK') {

//             if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
//                 throw new Error('No routes found');
//             }

//             return response.data.rows[ 0 ].elements[ 0 ];
//         } else {
//             throw new Error('Unable to fetch distance and time');
//         }

//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// }

// module.exports.getAutoCompleteSuggestions = async (input) => {
//     if (!input) {
//         throw new Error('query is required');
//     }

//     const apiKey = process.env.GOOGLE_MAPS_API;
//     const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

//     try {
//         const response = await axios.get(url);
//         if (response.data.status === 'OK') {
//             return response.data.predictions.map(prediction => prediction.description).filter(value => value);
//         } else {
//             throw new Error('Unable to fetch suggestions');
//         }
//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// }

// module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

//     // radius in km
//     const captains = await captainModel.find({
//         location: {
//             $geoWithin: {
//                 $centerSphere: [ [ ltd, lng ], radius / 6371 ]
//             }
//         }
//     });

//     return captains;


// }