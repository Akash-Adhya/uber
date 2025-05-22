/**
 * @fileoverview Geocoding utility functions for converting addresses to coordinates
 * using the OpenStreetMap Nominatim API.
 */

/**
 * Convert an address query into coordinates.
 * @param {string} query - The address to geocode
 * @returns {Promise<Array>} Array containing [latitude, longitude]
 * @throws {Error} If no results are found
 */
export const getCoordinates = async (query) => {
  const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
  const data = await res.json();
  if (!data.length) throw new Error("No results found");
  return [
    parseFloat(data[0].lat),
    parseFloat(data[0].lon)
  ];
};