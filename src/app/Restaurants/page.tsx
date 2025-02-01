'use client';
import axios from 'axios';
import { get } from 'http';
import React from 'react';

interface Restaurant {
    id: number;
    name: string;
    address: string;
}

const Restaurants = () => {
    const [restaurants, setRestaurants] = React.useState<Restaurant[]>([]);
    const getRestaurants = async () => {
        const response = await axios.get('http://localhost:4000/restaurants');

        setRestaurants(response.data);
    };
    getRestaurants();
    return (
        <div>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold text-center">Restaurants</h1>

                <div className="grid grid-cols-3 gap-4">
                    {restaurants.map((restaurant) => (
                        <div
                            key={restaurant.id}
                            className="bg-gray-200 p-4 rounded"
                        >
                            <h2 className="text-xl font-bold">
                                {restaurant.name}
                            </h2>
                            <p>{restaurant.address}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Restaurants;
