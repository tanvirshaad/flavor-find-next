'use client';
import axios from 'axios';
import axiosInstance from '@/utility/axiosConfig';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
axios.defaults.withCredentials = true;

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({ username: '', password: '' });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        const newErrors = { username: '', password: '' };
        if (!formData.username) {
            newErrors.username = 'Username is required';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        // If there are errors, don't submit
        if (newErrors.username || newErrors.password) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:4000/users/login',
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data) {
                localStorage.setItem('token', response.data);
            }

            console.log('Response received');
            console.log('Cookies:', document.cookie);

            alert('Login successful!');
            router.push('/Restaurants');
        } catch (error) {
            console.error('Login failed', error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Form
                className="p-6 bg-white shadow-md rounded w-96"
                onSubmit={handleSubmit}
                action={''}
            >
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <input
                    className={`w-full mb-1 p-2 border rounded ${
                        errors.username ? 'border-red-500' : ''
                    }`}
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />
                {errors.username && (
                    <p className="text-red-500 text-sm mb-3">
                        {errors.username}
                    </p>
                )}

                <input
                    className={`w-full mb-1 p-2 border rounded ${
                        errors.password ? 'border-red-500' : ''
                    }`}
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mb-3">
                        {errors.password}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    Login
                </button>
                <Link href={'/Auth/Registration'}>New Here?</Link>
            </Form>
        </div>
    );
};

export default Login;
