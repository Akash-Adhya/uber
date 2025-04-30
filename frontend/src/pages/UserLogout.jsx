// import React from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const UserLogout = () => {

//     const token = localStorage.getItem('token');
//     const navigate = useNavigate();

//     axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
//         headers:{
//             Authorization: `Bearer ${token}`,
//         }
//     }).then((response) => {
//         if(response == 200){
//             localStorage.removeItem('token');
//             navigate('/users/login');
//         }
//     });

//   return (
//     <div>UserLogout</div>
//   )
// }

// export default UserLogout;

import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const token = localStorage.getItem('token');
                
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/logout`, {}, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );

                if (response.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/users/login');
                }
            } catch (error) {
                console.error('Logout failed:', error);
                // Clear token and redirect even if logout fails
                localStorage.removeItem('token');
                navigate('/users/login');
            }
        };

        logoutUser();
    }, [navigate]);

    return <div>Logging out...</div>;
};

export default UserLogout;