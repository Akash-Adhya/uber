
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutCaptain = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/captains/login');
                }
            } catch (error) {
                console.error('Logout failed:', error);
                localStorage.removeItem('token'); // even if failed, clear token
                navigate('/captains/login');
            }
        };

        logoutCaptain();
    }, [navigate]);

    return (
        <div>CaptainLogout</div>
    );
};

export default CaptainLogout;
