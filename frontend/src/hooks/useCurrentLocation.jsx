import { useState, useEffect } from 'react';

const useCurrentLocation = ({ setPickup }) => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      return data.display_name || '';
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      return '';
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }

    const handleSuccess = async (pos) => {
      const { latitude, longitude } = pos.coords;
      setPosition({ lat: latitude, lng: longitude });
      
      try {
        const address = await reverseGeocode(latitude, longitude);
        setAddress(address);
        if (setPickup) {
          setPickup(address);
        }
      } catch (err) {
        console.error("Error getting address:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const handleError = (err) => {
      setError(err.message);
      setIsLoading(false);
      console.error("Error getting location:", err);
    };

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, [setPickup]);

  return { 
    position, 
    address, 
    error, 
    isLoading,
    coordinates: position ? [position.lat, position.lng] : null
  };
};

export default useCurrentLocation;