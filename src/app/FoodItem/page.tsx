'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';

interface FoodItem {
    id: number;
    name: string;
    price: string;
    description: string;
    image: string;
    cuisine: string;
}
const FoodItem = () => {
    const [foodItems, setFoodItems] = React.useState<FoodItem[]>([]);

    const getFoodItem = async () => {
        try {
            const items = await axios.get(
                'http://localhost:4000/food-items/all'
            );
            setFoodItems(items.data);
        } catch (err: any) {
            console.error(err);
        }
    };
    getFoodItem();

    return (
        <div>
            <div className="container mx-auto my-40">
                <h1 className="text-2xl font-bold text-center mb-10">
                    Food Items
                </h1>

                <div className="grid grid-cols-3 gap-4">
                    {foodItems.map((fooditem) => (
                        <div
                            key={fooditem.id}
                            className="card bg-base-100 w-96 shadow-xl pb-5 px-3 mt-3"
                        >
                            <figure>
                                <img src={fooditem.image} />
                            </figure>
                            <h2 className="my-2 text-xl font-bold card-title">
                                {fooditem.name}
                            </h2>
                            <div className="card-actions justify-start">
                                <div className="badge badge-outline">
                                    {fooditem.cuisine}
                                </div>
                            </div>
                            <p className="my-3 flex items-center">
                                {fooditem.price}
                                <TbCurrencyTaka className="inline-block ml-1" />
                            </p>
                            <p className="my-3">{fooditem.description}</p>
                            <div className="card-actions justify-center">
                                <Link
                                    href={`./FoodItem/${fooditem.id}`}
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

export default FoodItem;
