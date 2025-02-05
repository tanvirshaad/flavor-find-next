'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';
import Link from 'next/link';

export default function HomePage() {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const router = useRouter();

    // Fetch restaurants from API
    useEffect(() => {
        fetch('http://localhost:4000/restaurants') // Replace with your API
            .then((res) => res.json())
            .then((data) => setRestaurants(data))
            .catch((err) => console.error('Error fetching restaurants:', err));
    }, []);

    // Handle search with debounce (Live Search)
    const fetchSearchResults = async (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }
        try {
            const response = await axios.get(
                `http://localhost:4000/food-items/search?item=${query}`
            );
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching food items:', error);
        }
    };

    const debouncedSearch = useCallback(debounce(fetchSearchResults, 300), []);

    // Update search results as user types
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value);
    };

    return (
        <div className="mx-auto p-4 mt-18">
            {/*  Carousel Banner */}
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                className="w-full max-w-full h-[500px] rounded-lg overflow-hidden"
            >
                {[
                    '/images/banner1.jpg',
                    '/images/banner2.jpg',
                    '/images/banner3.jpg',
                ].map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-[500px]">
                            <Image
                                src={img}
                                alt={`Banner ${index + 1}`}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/*Search */}
            <div className="container flex flex-col items-center mt-6">
                <h2 className="text-2xl font-bold mb-5">
                    Search Your Favourite Food{' '}
                </h2>
                <input
                    type="text"
                    placeholder="Search food items..."
                    className="input input-bordered w-1/2"
                    value={query}
                    onChange={handleSearchChange}
                />

                {/* Search Results */}
                {searchResults.length > 0 ? (
                    <div className="mt-4 w-1/2 bg-white shadow-lg rounded-lg p-4">
                        <h3 className="text-lg font-bold mb-2">
                            Search Results
                        </h3>
                        {searchResults.map((item: any) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center p-2 border-b"
                            >
                                <p>{item.name}</p>
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() =>
                                        router.push(`/FoodItem/${item.id}`)
                                    }
                                >
                                    View Item
                                </button>
                            </div>
                        ))}
                    </div>
                ) : query.length > 0 ? (
                    <p className="text-gray-500 mt-2">No results found.</p>
                ) : null}
            </div>

            {/*Featured Restaurants */}
            <div className="container mx-auto my-40">
                <h2 className="text-center text-2xl font-bold mt-6 mb-20">
                    Featured Restaurants
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {restaurants.length > 0 ? (
                        restaurants.map((restaurant: any) => (
                            <div
                                key={restaurant.id}
                                className="p-4 bg-white shadow-lg rounded-lg"
                            >
                                <h3 className="text-lg font-bold">
                                    {restaurant.name}
                                </h3>
                                <p className="text-gray-500">
                                    {restaurant.address}
                                </p>
                                <p className="text-sm text-gray-700">
                                    Cuisine: {restaurant.cuisine}
                                </p>
                                <Link href={`/Restaurants/${restaurant.id}`}>
                                    <button className="btn btn-sm btn-primary mt-2">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="text-center mt-4">
                            No restaurants found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
