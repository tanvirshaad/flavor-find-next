'use client';
import axios from 'axios';
import { get } from 'http';
import Link from 'next/link';
import router from 'next/router';
import React from 'react';

interface Restaurant {
    id: number;
    name: string;
    address: string;
    cuisine: string;
    image: string;
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
            <div className="container mx-auto my-36">
                <h1 className="text-2xl font-bold text-center">Restaurants</h1>

                <div className="grid grid-cols-3 gap-4">
                    {restaurants.map((restaurant) => (
                        <div
                            key={restaurant.id}
                            className="card bg-base-100 w-96 shadow-xl pb-5 px-3 mb-10"
                        >
                            <figure>
                                <img src={restaurant.image} />
                            </figure>
                            <h2 className="my-2 text-xl font-bold card-title">
                                {restaurant.name}
                            </h2>
                            <div className="card-actions justify-start">
                                <div className="badge badge-outline">
                                    {restaurant.cuisine}
                                </div>
                            </div>
                            <p className="my-3">{restaurant.address}</p>
                            <div className="card-actions justify-center">
                                <Link
                                    href={`./Restaurants/${restaurant.id}`}
                                    className="btn btn-primary"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Restaurants;
