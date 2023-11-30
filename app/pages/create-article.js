// pages/create-article.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient'; // Make sure this path is correct

// Add the import for React.lazy here
const ReactQuill = React.lazy(() => import('react-quill'));
import 'react-quill/dist/quill.snow.css'; // Import the CSS for the "snow" theme

export default function CreateArticle() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in
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
      // Redirect to the articles page after creation
      router.push('/articles');
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Or any other loading indicator you prefer
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">Create a New Article</h1>
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
            <React.Suspense fallback={<p>Loading react-quill...</p>}>
              <ReactQuill
                value={content}
                onChange={setContent}
                theme="snow" // Choose a theme that suits your design
                modules={{
                  toolbar: [
                    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['bold', 'italic', 'underline'],
                    [{ 'align': [] }],
                    ['link', 'image'],
                  ],
                }}
              />
            </React.Suspense>
          </label>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Tags
            <input
              type="text"
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
