'use client';
import { getUserFromCookie } from '@/utility/token';
import axios from 'axios';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const CreateRestaurant = () => {
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        const checkAuth = () => {
            const userId = getUserFromCookie();
            console.log('UserId from token:', userId);
            if (!userId) {
                setError('Please login first');
                router.push('/Auth/Login');
            }
        };

        checkAuth();
    }, [router]);
    const onSubmit = async (data: any) => {
        setLoading(true);
        setError('');
        const userId = getUserFromCookie();

        try {
            const response = await axios.post(
                'http://localhost:4000/restaurants/',
                {
                    ...data,
                    userId,
                    openingTime: `${data.openingTime}:00`,
                    closingTime: `${data.closingTime}:00`,
                    isApproved: false,
                },
                { withCredentials: true } // Ensures cookies (JWT) are sent
            );

            alert('Restaurant Created Successfully!');
            reset();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg my-36">
            <h2 className="text-2xl font-bold text-center mb-4">
                Create Restaurant
            </h2>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <Form
                action={'/'}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <input
                    type="text"
                    placeholder="Restaurant Name"
                    {...register('name', { required: true })}
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    placeholder="Address"
                    {...register('address', { required: true })}
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    placeholder="Cuisine Type"
                    {...register('cuisine', { required: true })}
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    placeholder="Phone"
                    {...register('phone', { required: true })}
                    className="input input-bordered w-full"
                />
                <div className="flex gap-2">
                    <div className="w-1/2">
                        <label className="label">Opening Time</label>
                        <input
                            type="time"
                            {...register('openingTime', { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="label">Closing Time</label>
                        <input
                            type="time"
                            {...register('closingTime', { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn bg-black btn-primary w-full"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Restaurant'}
                </button>
            </Form>
        </div>
    );
};

export default CreateRestaurant;
// function useForm(): { register: any; handleSubmit: any; reset: any } {
//     throw new Error('Function not implemented.');
// }
