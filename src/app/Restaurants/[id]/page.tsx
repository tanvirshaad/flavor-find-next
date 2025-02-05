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
    const [foodItems, setFoodItems] = React.useState<any[]>([]);
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

    useEffect(() => {
        const getFoodItems = async () => {
            const items = await axios.get(
                `http://localhost:4000/food-items?restaurantId=${unwrappedParams.id}`
            );
            if (items?.data) {
                setFoodItems(Array.isArray(items.data) ? items.data : []);
            }
        };
        getFoodItems();
    }, [unwrappedParams.id]);
    const handleCreateReservation = (restaurantId: number) => {
        router.push(`/Reservations/${restaurantId}`);
    };

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-center text-6xl">{restaurant.name}</h1>
                <div className="flex justify-around items-center py-5 mt-5">
                    <img
                        src={restaurant.image}
                        alt={'image'}
                        width={500}
                        height={500}
                    />
                    <div>
                        <p className="text-2xl">
                            Cuisine: {restaurant.cuisine}
                        </p>
                        <p className="text-2xl">
                            Address: {restaurant.address}
                        </p>
                        <p className="text-2xl">Phone: {restaurant.phone}</p>
                        <p className="text-2xl">
                            Time: {restaurant.openingTime} -{' '}
                            {restaurant.closingTime}
                        </p>
                        <p className="text-2xl">Phone: {restaurant.phone}</p>
                        <button
                            onClick={() =>
                                handleCreateReservation(restaurant.id)
                            }
                            className="btn btn-primary mt-2"
                        >
                            Request For Reservation
                        </button>
                    </div>
                </div>
                <section className="container mx-auto my-20">
                    <h1 className="text-4xl text-center">Our Menu</h1>
                    {/* show fooditems in card */}
                    {foodItems.map((foodItem: any) => (
                        <div
                            key={foodItem.id}
                            className="card bg-base-100 w-96 shadow-xl pb-5 px-3"
                        >
                            <figure>
                                <img src={foodItem.image} />
                            </figure>
                            <h2 className="my-2 text-xl font-bold card-title">
                                {foodItem.name}
                            </h2>
                            <div className="card-actions justify-start">
                                <div className="badge badge-outline">
                                    {foodItem.cuisine}
                                </div>
                            </div>
                            <p className="my-3">{restaurant.address}</p>
                            {/* <div className="card-actions justify-center">
                                <Link
                                    href={`./Restaurants/${restaurant.id}`}
                                    className="btn btn-primary"
                                >
                                    View
                                </Link>
                            </div> */}
                        </div>
                    ))}
                </section>
                <section>
                    <h1 className="text-2xl font-bold text-center">
                        Leave a Review
                    </h1>

                    <RestaurantReview restaurantId={restaurant.id} />
                </section>
            </div>
        </>
    );
};

export default page;
