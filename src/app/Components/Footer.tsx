import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black w-full shadow-sm dark:bg-gray-800">
            <div className="w-full p-4 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    © 2025{' '}
                    <a href="https://flowbite.com/" className="hover:underline">
                        Flavor Find
                    </a>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    );
};

export default Footer;
