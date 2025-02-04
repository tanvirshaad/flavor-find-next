'use client';
import axios from 'axios';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RestaurantReview from '@/app/Reviews/RestaurantReview/page';

const page = ({ params }: { params: Promise<{ id: string }> }) => {
    const router = useRouter();
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
    const handleCreateReservation = (restaurantId: number) => {
        router.push(`/Reservations/${restaurantId}`);
    };

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
                    <button
                        onClick={() => handleCreateReservation(restaurant.id)}
                        className="btn btn-primary mt-2"
                    >
                        Request For Reservation
                    </button>
                </div>
            </div>
            <section>
                <h1 className='text-2xl font-bold text-center'>Leave a Review</h1>
                
                <RestaurantReview restaurantId={restaurant.id} />
            </section>
        </div>
    );
};

export default page;
