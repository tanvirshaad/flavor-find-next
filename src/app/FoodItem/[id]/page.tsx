'use client';
import axios from 'axios';
import React, { use, useEffect } from 'react';
import Image from 'next/image';
import { TbCurrencyTaka } from 'react-icons/tb';


const page = ({ params }: { params: Promise<{ id: string }> }) => {
    const unwrappedParams = React.use(params);
    const [fooditem, setFoodItem] = React.useState<any>({});
    const [suggestions, setSuggestions] = React.useState<any[]>([]);
    useEffect(() => {
        const getFoodItem = async () => {
            // Fetch restaurant by id
            const fooditem = await axios.get(
                `http://localhost:4000/food-items/${unwrappedParams.id}`
            );
            setFoodItem(fooditem.data);
        };
        getFoodItem();
    }, [unwrappedParams.id]);
    useEffect(() => {
        const getSugesstions = async () => {
            const suggestions = await axios.get(
                `http://localhost:4000/food-items/cusine/?cuisine=${fooditem.cuisine}`
            );
            setSuggestions(suggestions.data);
        };
        getSugesstions();
    }, [fooditem.cuisine]);

    return (
        <div className="container mx-auto">
            <div className="flex justify-center gap-5 items-center py-3 mt-5">
                <div>
                    <h1 className="text-center text-4xl">{fooditem.name}</h1>
                    <Image
                        src={fooditem.image}
                        alt={''}
                        width={300}
                        height={300}
                    />
                </div>

                <div>
                    <p className="text-2xl">Cuisine: {fooditem.cuisine}</p>
                    <p className="text-2xl">Phone: {fooditem.phone}</p>

                    <button className="bg-black btn glass btn-error mt-3">
                        Add to Favourite
                    </button>
                </div>
            </div>
            {/* suggestions */}
            <section className="container mx-auto py-5 mt-10">
                <h1 className=" text-4xl">More Like This...</h1>
                <div className="grid grid-cols-3 gap-4 mt-5">
                    {suggestions.map((suggestion: any) => (
                        <div
                            key={suggestion.id}
                            className="card bg-base-100 w-96 shadow-xl pb-5 px-3"
                        >
                            <figure>
                                <img src={suggestion.image} alt="item" />
                            </figure>
                            <h2 className="my-2 text-xl font-bold card-title">
                                {suggestion.name}
                            </h2>
                            <div className="card-actions justify-start">
                                <div className="badge badge-outline">
                                    {suggestion.cuisine}
                                </div>
                            </div>
                            <p className="my-3 flex items-center">
                                {fooditem.price}
                                <TbCurrencyTaka className="inline-block ml-1" />
                            </p>
                            <p className="my-3">{suggestion.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default page;
