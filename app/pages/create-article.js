import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import UserContext from '../components/UserContext'
import { useContext } from 'react';


const ReactQuill = React.lazy(() => import('react-quill'));
import 'react-quill/dist/quill.snow.css';

export default function CreateArticle() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { user, supabase } = useContext(UserContext);

  useEffect(() => {


    if (user) {
      setLoading(false);
    } else {
      router.push('/login');
    }

  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.from('articles').insert([
      { title, description, content, slug, email: user.email, },
    ]);

    if (error) {
      console.error('Error inserting record:', error.message);
      router.push('/articles');
    } else {
      console.log('Record inserted successfully:', data);
      setTitle('');
      setDescription('');
      setContent('');
      setSlug('');
      router.push('/articles');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout
      title="Create an article"
      description="Page to create and publish an article"
    >

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-6">Create a New Article</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto grid gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Title
              <input
                type="title"
                placeholder="Title"
                className="w-full px-3 py-2 border rounded"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}

              /> 
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
              <textarea
                name="description"
                placeholder="Description"
                className="w-full px-3 py-2 border rounded"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 ">
              Content
              <React.Suspense fallback={<p>Loading react-quill...</p>}>
                <ReactQuill
                  value={content}
                  
                  onChange={setContent}
                  theme="snow"
                  modules={{
                    toolbar: [
                      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
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
                placeholder="Surf, ski, ece, tom"
                className="w-full px-3 py-2 border rounded"              />
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
    </Layout>
  );
}
