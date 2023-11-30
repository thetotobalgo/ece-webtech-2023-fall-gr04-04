import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Make sure you import useRouter
import { supabase } from '../utils/supabaseClient';
import Layout from '../components/Layout';

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [session, setSession] = useState(null);
    const router = useRouter(); // Instantiate the useRouter hook

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        async function fetchData() {
            const { data, error } = await supabase
                .from('articles')
                .select('*');

            if (error) {
                console.error('Error fetching articles:', error);
            } else {
                setArticles(data);
            }
        }

        fetchData();
    }, []);



    return (
        <Layout>
        <h1 className="text-4xl font-bold my-4 text-center">
            Surf World News Articles
        </h1>
        {session && (
            <div className="text-center mt-8">
                <button
                    onClick={() => router.push('/create-article')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Create New Article
                </button>
            </div>
        )}
        <div style={{ overflowY: 'scroll', maxHeight: '60vh' }}>
            <ul className="list-none space-y-4">
                {articles.map(article => (
                    <li key={article.id} className="border-b border-gray-200 py-4">
                        <h2 className="text-2xl font-semibold">
                            <Link href={`/articles/${article.slug}`}>
                                <span className="text-blue-500 hover:text-blue-700">{article.title}</span>
                            </Link>
                        </h2>
                        <p className="text-gray-700">{article.description}</p>
                    </li>
                ))}
            </ul>
        </div>

        

    </Layout>
    );
}

