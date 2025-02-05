'use client';
import { getUserFromCookie } from '@/utility/token';
import axios from 'axios';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const CreateFoodItem = () => {
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
                'http://localhost:4000/food-items/',
                {
                    ...data,

                    price: Number(data.price),
                    restaurantId: Number(data.restaurantId),
                    isAvailable: true,
                },
                { withCredentials: true } // Ensures cookies (JWT) are sent
            );

            alert('Food Item Created Successfully!');
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
                    placeholder="Food Name"
                    {...register('name', { required: true })}
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    placeholder="Description"
                    {...register('description', { required: true })}
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    placeholder="Cuisine Type"
                    {...register('cuisine', { required: true })}
                    className="input input-bordered w-full"
                />
                <input
                    type="number"
                    placeholder="Price"
                    {...register('price', { required: true })}
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    {...register('image', { required: true })}
                    className="input input-bordered w-full"
                />
                <input
                    type="number"
                    placeholder="Restaurant ID"
                    {...register('restaurantId', { required: true })}
                    className="input input-bordered w-full"
                />
                <button
                    type="submit"
                    className="btn bg-black btn-primary w-full"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Food Item'}
                </button>
            </Form>
        </div>
    );
};

export default CreateFoodItem;
// function useForm(): { register: any; handleSubmit: any; reset: any } {
//     throw new Error('Function not implemented.');
// }
