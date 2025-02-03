'use client';
import axios from 'axios';
import React, { useEffect } from 'react';
import Image from 'next/image';

const page = ({ params }: { params: Promise<{ id: string }> }) => {
    const unwrappedParams = React.use(params);
    const [restaurant, setRestaurant] = React.useState<any>({});
    useEffect(() => {
        const getRestuarant = async () => {
            // Fetch restaurant by id
            const restaurant = await axios.get(
                `http://localhost:4000/restaurants/${unwrappedParams.id}`
            );
            setRestaurant(restaurant.data);
        };
        getRestuarant();
    }, [unwrappedParams.id]);

    return (
        <div className="container mx-auto">
            <h1 className="text-center text-6xl">{restaurant.name}</h1>
            <div className="flex justify-around items-center py-5 mt-5">
                <Image src="" alt={restaurant.name} width={500} height={500} />
                <div>
                    <p className="text-2xl">Cuisine: {restaurant.cuisine}</p>
                    <p className="text-2xl">Address: {restaurant.address}</p>
                    <p className="text-2xl">Phone: {restaurant.phone}</p>
                    <p className="text-2xl">
                        Time: {restaurant.openingTime} -{' '}
                        {restaurant.closingTime}
                    </p>
                    <p className="text-2xl">Phone: {restaurant.phone}</p>
                    <button className="bg-black btn glass btn-error mt-3">
                        Request For Reservation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default page;
