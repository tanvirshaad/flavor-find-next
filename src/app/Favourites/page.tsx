"use client"
import { getUserFromCookie } from '@/utility/token';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Favourites = () => {
    const [favourites, setFavourites] = useState<any[]>([]);
    const userId = getUserFromCookie();
    useEffect(() => {
        const fetchFavourites = async () => {
            await axios.get('http://localhost:4000/favourites/3')
            setFavourites(favourites);
        }
        fetchFavourites();
    }, [])
  return (
    <div className='container mx-auto'>
        <h1 className='text-2xl font-bold'>My Favourites</h1>
        <div className='flex flex-col items-center justify-center'>
            {favourites.map((favourite) => (
                <div key={favourite.id}>{favourite.foodItemId}</div>
            ))}
        </div>
    </div>

  )
}

export default Favourites