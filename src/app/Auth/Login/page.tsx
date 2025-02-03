'use client';
import axios from 'axios';
import axiosInstance from '@/utility/axiosConfig';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
axios.defaults.withCredentials = true;

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted');
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
        <div>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <Form
                    className="p-6 bg-white shadow-md rounded w-96"
                    onSubmit={handleSubmit}
                    action={'/'}
                >
                    <h2 className="text-xl font-bold mb-4">Login</h2>
                    <input
                        className="w-full mb-3 p-2 border rounded"
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full mb-3 p-2 border rounded"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded"
                    >
                        Login
                    </button>
                </Form>
            </div>
        </div>
    );
};

export default Login;
