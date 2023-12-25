import Layout from '../components/Layout';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import UserContext from '../components/UserContext'
import { useContext } from 'react';


export default function Home() {
  const [recentArticles, setRecentArticles] = useState([]);
  const { supabase } = useContext(UserContext);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) {
      console.error('Error fetching articles:', error);
    } else {
      setRecentArticles(data);
    }
  }

  return (
    <Layout title="Home page" description="Home">
      <section className="text-center my-10">
        <h1 className="text-4xl font-bold my-4">Welcome to Surf News</h1>
        <p className="text-xl my-4">Discover insightful articles about the discipline.</p>
        <Link href="/articles">
          <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Explore Articles
          </span>
        </Link>
      </section>

      <section className="my-10">
        <h2 className="text-3xl font-bold text-center my-4">Recent Articles</h2>
        <div className="flex flex-col items-center space-y-8">
          {recentArticles.map(article => (
            <div key={article.id} className="w-full max-w-2xl">
              <h3 className="text-2xl font-semibold mb-2">
                <Link href={`/articles/${article.slug}`}>
                  <span className="hover:text-blue-700">{article.title}</span>
                </Link>
              </h3>
              <p>{article.description}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
