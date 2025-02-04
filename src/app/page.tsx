'use client';
import Image from 'next/image';
import Home from './Home/page';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Login from './Auth/Login/page';

export default function Page() {
    // const [data, setData] = useState<any[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);
    // useEffect(() => {
    //     axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
    //         setData(res.data);
    //         setLoading(false);
    //     });
    // }, []);
    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    return (
        <>
        <Login></Login>
            {/* <Home />
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center">Posts</h1>
        <div className="grid grid-cols-3 gap-4">
          {data.map((post) => (
            <div key={post.id} className="bg-gray-200 p-4 rounded">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      </div> */}
        </>
    );
}
