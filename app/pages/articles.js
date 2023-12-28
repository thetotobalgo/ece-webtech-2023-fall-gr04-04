import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import UserContext from '../components/UserContext'
import { useContext } from 'react';

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const router = useRouter();

    const { user, supabase } = useContext(UserContext);

    //A revoir les use effects
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase
                .from('articles')
                .select('*');

            if (error) {
                console.error('Error fetching articles', error);
            } else {
                setArticles(data);
            }
        }

        fetchData();
    }, []);


    return (
        <Layout title="Article" description="Acess the articles from the website" >

            <h1 className="text-4xl font-bold my-4 text-center">
                Surf World News Articles
            </h1>

            {user && (
                <div className="text-center mt-8">
                    <button onClick={() => router.push('/create-article')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
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
                                    <span className="hover:text-blue-700">{article.title}</span>
                                </Link>
                            </h2>
                            <p>{article.description}</p>
                        </li>
                    ))}
                </ul>
            </div>

        </Layout>
    );
}
