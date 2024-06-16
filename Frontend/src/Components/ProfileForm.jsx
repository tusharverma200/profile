import React, { useState } from 'react';
import axios from 'axios';

const ProfileForm = () => {
    const [profile, setProfile] = useState({
        profilePhoto: '',
        firstName: '',
        lastName: '',
        email: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfile({ ...profile, profilePhoto: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            profilePhoto: profile.profilePhoto,
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            address: profile.address
        }

        try {
            console.log(profile);
            const user = await axios.post('http://localhost:3000/api/profiles', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            sessionStorage.setItem("profilePhoto", user.data.profilePhoto);
            console.log(user.data.profilePhoto);
            alert('Profile saved successfully');
        } catch (error) {
            console.error('Error saving profile', error);
            alert('Error saving profile');
        }
    };

    const handleReset = () => {
        setProfile({
            profilePhoto: '',
            firstName: '',
            lastName: '',
            email: '',
            address: '',
        });
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold mb-4">My Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-6">
                    <div className="shrink-0">
                        <img
                            className="h-16 w-16 object-cover rounded-full"
                            src={profile.profilePhoto ? URL.createObjectURL(profile.profilePhoto) : 'https://via.placeholder.com/150'}
                            alt="Current profile photo"
                        />
                    </div>
                    <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input
                            type="file"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={profile.lastName}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        type="reset"
                        onClick={handleReset}
                        className="py-2 px-4 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;
