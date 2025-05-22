/**
 * @fileoverview Routing utility functions using OSRM API.
 * Provides functions for calculating routes between coordinates.
 * 
 * API Used:
 * - OSRM (Open Source Routing Machine)
 * - Endpoint: router.project-osrm.org
 * 
 * @requires fetch
 */

/**
 * Gets a driving route between two coordinate points.
 * @async
 * @param {Object} start - Starting coordinates {lat: number, lon: number}
 * @param {Object} end - Ending coordinates {lat: number, lon: number}
 * @returns {Promise<Object>} GeoJSON geometry of the route
 * @throws {Error} If route calculation fails
 */
export const getRoute = async (start, end) => {
  const url = `https://router.project-osrm.org/route/v1/driving/${start.lon},${start.lat};${end.lon},${end.lat}?overview=full&geometries=geojson`;
  const res = await fetch(url);
  const data = await res.json();
  return data.routes[0].geometry;
};
