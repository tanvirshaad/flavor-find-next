'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { getUserFromCookie } from '@/utility/token';

const VerifyUser = () => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };
    const getUser = async () => {
        const userId = getUserFromCookie();
        const response = await axios.get(
            `http://localhost:4000/users/${userId}`
        );
        return response.data;
    };
    const sendOtp = async () => {
        const userId = getUserFromCookie();
        try {
            const user = await getUser();
            const response = await axios.post(
                'http://localhost:4000/otp/generate',
                {
                    userId,
                    email: user.email,
                }
            );
            setMessage('OTP sent successfully!');
        } catch (error) {
            setMessage('Failed to send OTP. Please try again.');
            console.error('Error sending OTP:', error);
        }
    };
    sendOtp();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userId = getUserFromCookie();
        try {
            const response = await axios.post(
                'http://localhost:4000/otp/verify',
                {
                    userId,
                    otp,
                }
            );
            setMessage('OTP verified successfully!');
        } catch (error) {
            setMessage('Failed to verify OTP. Please try again.');
            console.error('Error verifying OTP:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="p-6 bg-white shadow-md rounded w-96"
            >
                <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
                <input
                    type="text"
                    name="otp"
                    value={otp}
                    onChange={handleChange}
                    placeholder="Enter OTP"
                    className="w-full mb-4 p-2 border rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    Verify Me
                </button>
                {message && <p className="mt-4 text-center">{message}</p>}
            </form>
        </div>
    );
};

export default VerifyUser;
