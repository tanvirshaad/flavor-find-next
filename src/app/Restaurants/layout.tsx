'use client';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getUserFromCookie } from '@/utility/token';
import axios from 'axios';
import router from 'next/navigation';
import Cookies from 'js-cookie';

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const pathname = usePathname();
    // const isLoginPage = pathname === '/Auth/Login';

    const isLogged = getUserFromCookie();
    console.log(isLogged);
    useEffect(() => {
        const fetchUsername = async () => {
            if (isLogged) {
                try {
                    const response = await axios.get(
                        `http://localhost:4000/users/${isLogged}`
                    );
                    setUsername(response.data.username);
                } catch (error) {
                    console.error('Error fetching username:', error);
                }
            }
        };

        fetchUsername();
    }, [isLogged]);

    const handleLogout = async () => {
        try {
            const response = await axios.get(
                'http://localhost:4000/users/logout',
                {
                    withCredentials: true,
                }
            );
            if (response.data) {
                document.cookie = `token=; path=/; max-age=0`;
                localStorage.removeItem('token');
                Cookies.remove('token');
                router.push('/Auth/Login');
                console.log(document.cookie);
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <main className="mx-auto">
            <nav className="bg-black fixed w-full z-20 top-0 start-0 border-b border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link
                        href="/"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                            Flavor Find
                        </span>
                    </Link>
                    <button
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div
                        className="hidden w-full md:block md:w-auto"
                        id="navbar-default"
                    >
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-black text-white">
                            <li>
                                <a
                                    href="/Home"
                                    className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                                    aria-current="page"
                                >
                                    Home
                                </a>
                            </li>
                            {/* <li>
                                <a
                                    href=""
                                    className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                                    aria-current="page"
                                >
                                    Home
                                </a>
                            </li> */}
                            <li>
                                <a
                                    href="/Restaurants"
                                    className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                                    aria-current="page"
                                >
                                    All Restaurants
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/Restaurants/CreateRestaurant"
                                    className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                                    aria-current="page"
                                >
                                    Create Restaurant
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/FoodItem"
                                    className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                                    aria-current="page"
                                >
                                    Food Items
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/FoodItem/CreateFoodItem"
                                    className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                                    aria-current="page"
                                >
                                    Create Food Items
                                </a>
                            </li>
                            <li>
                                <Link
                                    href={
                                        isLogged
                                            ? '/Auth/Logout'
                                            : '/Auth/Login'
                                    }
                                    className="block py-2 px-3 text-white rounded-sm hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 md:p-0"
                                >
                                    {isLogged
                                        ? `Logged In: ${username}`
                                        : 'Login'}
                                </Link>
                            </li>
                            {isLogged && (
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                                    >
                                        Logout
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            {children}
        </main>
    );
}
