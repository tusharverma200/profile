import React, { useEffect, useState } from 'react';
import Logo from "../assets/logo.png";

const Navbar = () => {
    const [profilePhoto, setProfilePhoto] = useState('');

    useEffect(() => {
        const photo = sessionStorage.getItem("profilePhoto");
        if (photo) {
            setProfilePhoto(photo);
        }
    }, []); // Empty dependency array to run once after the component mounts

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img className="h-8 w-auto" src={Logo} alt="Logo" />
                        </div>

                    </div>
                    <div className="flex items-center">
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <a href="/" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">Home</a>
                            <a href="/books" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">Books</a>
                            <a href="/guest" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">Guests</a>
                            <a href="/events" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">Events</a>
                            <a href="/services" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">Services</a>
                            <a href="/support" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">Support</a>
                        </div>
                        <div className="ml-3 relative">
                            <img className="h-8 w-8 rounded-full" src={profilePhoto ? profilePhoto : 'https://via.placeholder.com/32'} alt="Profile" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
