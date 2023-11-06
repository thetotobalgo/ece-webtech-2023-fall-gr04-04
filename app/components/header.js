import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
    const [profile, setProfile] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/profile');
                if (response.status === 200) {
                    const data = await response.json();
                    setProfile(data);
                } else {
                    console.error('Profile data request failed with status:', response.status);
                }
            } catch (error) {
                console.error('Error while fetching profile:', error);
            }
        }
        fetchData();
    }, []);

    const navigateTo = (path) => {
        router.push(path);
    };

    return (
        <header className="bg-gray-500 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <span
                        className="text-white text-2xl font-bold cursor-pointer"
                        onClick={() => navigateTo('/')}
                    >
                        Home
                    </span>
                    <span
                        className="text-white text-2xl font-bold ml-4 cursor-pointer"
                        onClick={() => navigateTo('/articles')}
                    >
                        Articles
                    </span>
                    <span
                        className="text-white text-2xl font-bold ml-4 cursor-pointer"
                        onClick={() => navigateTo('/articles')}
                    >
                        About
                    </span>
                </div>
                {profile ? (
                    <div className="text-white text-right">
                        <p className="text-xl">Username: {profile.name}</p>
                        <p className="text-xl">Email: {profile.email}</p>
                    </div>
                ) : (
                    <p className="text-white text-lg">Loading profile data...</p>
                )}
            </div>
        </header>
    );
};

export default Header;
