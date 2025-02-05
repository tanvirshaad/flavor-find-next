'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Form from 'next/form';
import { stat } from 'fs';

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        role: 'user',
        status: 'active',
    });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/users/', formData);
            alert('Registration successful!');
            router.push('/Auth/Login');
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <Form
                    className="p-6 bg-white shadow-md rounded w-96"
                    onSubmit={handleSubmit}
                    action={'/'}
                >
                    <h2 className="text-xl font-bold mb-4">Register</h2>
                    <input
                        className="w-full mb-3 p-2 border rounded"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full mb-3 p-2 border rounded"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        required
                    />
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
                        type="email"
                        name="email"
                        placeholder="Email"
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
                        Register
                    </button>
                </Form>
            </div>
        </>
    );
};

export default Registration;
