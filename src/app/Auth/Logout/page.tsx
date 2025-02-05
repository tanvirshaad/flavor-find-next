import axios from 'axios';
import React, { useState } from 'react';

const Logout = () => {
    const handleLogout = async () => {
        try {
            const response = await axios.get(
                'http://localhost:4000/users/logout',
                {
                    withCredentials: true,
                }
            );
            if (response.data) {
                document.cookie = `token=; path=/; max-age=0`;
                localStorage.removeItem('token');
                console.log(document.cookie);
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };
    return (
        <div>
            <button onClick={handleLogout} type="button">
                Logout
            </button>
        </div>
    );
};

export default Logout;
