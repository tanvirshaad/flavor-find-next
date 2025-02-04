'use client';
import axios from 'axios';
import React, { use, useEffect } from 'react';
import Image from 'next/image';
import { TbCurrencyTaka } from 'react-icons/tb';
import { getUserFromCookie } from '@/utility/token';


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


    const handleAddToFavourite = async() => {
        try {
            const response = await axios.post(`http://localhost:4000/favourites?foodItemId=${Number(unwrappedParams.id)}`, {
                userId: getUserFromCookie(),
                foodItemId: Number(unwrappedParams.id),
                
                status: 'active'
            });
            
            if (response.status === 200) {
                alert('Added to favourite');
            }
        } catch (error: any) {
            console.error('Error adding to favourites:', error.response?.data || error.message);
            alert('Failed to add to favourites. Please try again.');
        }
    }

    return (
        <div className="container mx-auto my-5">
            <div className='flex justify-center items-center'>
                <div className="card card-side bg-base-100 shadow-xl max-w-4xl">
                <div>
                    
                    <Image
                        src={fooditem.image}
                        alt={'image'}
                        width={300}
                        height={300}
                    />
                </div>

                <div className='card-body'>
                    <h1 className="card-title">{fooditem.name}</h1>
                    <p className="text-1xl">Cuisine: {fooditem.cuisine}</p>
                    <p className="text-1xl">Phone: {fooditem.phone}</p>

                    <div className="card-actions justify-end">
                        <button onClick={handleAddToFavourite} className="btn btn-primary">Add To Favourite</button>
                    </div>
                </div>
            </div>
            </div>
            {/* suggestions */}
            <section className="container mx-auto py-5 mt-20">
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
