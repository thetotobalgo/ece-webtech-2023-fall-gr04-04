// pages/create-article.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient'; // Make sure this path is correct

export default function CreateArticle() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Check if user is logged in
    useEffect(() => {
        const session = supabase.auth.getSession();

        if (session) {
            setLoading(false); // User is logged in, allow them to create an article
        } else {
            router.push('/login'); // Not logged in, redirect to login
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase.from('articles').insert([
            { title, description, content, slug },
        ]);

        if (error) {
            console.error('Error inserting record:', error.message);
            router.push('/articles');
        } else {
            console.log('Record inserted successfully:', data);
            // Reset the input values after successful submission
            setTitle('');
            setDescription('');
            setContent('');
            setSlug('');
            // Display a confirmation message
        
            router.push('/articles'); // Redirect to articles page after creation
        }
    };

    if (loading) {
        return <p>Loading...</p>; // Or any other loading indicator you prefer
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className='text-4xl font-bold text-center mb-6'>
                Create a New Article
            </h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto grid gap-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Title
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </label>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Description
                        <textarea
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </label>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Content
                        <textarea
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </label>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Tags
                        <textarea
                            name="slug"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </label>
                </div>
                <div>
                    <button
                        type="submit"
                        className="rounded-md py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Create Article
                    </button>
                </div>
            </form>
        </div>
    );
}
