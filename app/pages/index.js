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
    <Layout
      title="Home page"
      description="Home"
    >

      <section className="text-center">
        <h2 className="text-3xl font-bold my-4">Recent Articles</h2>
        <div className="flex flex-wrap justify-between space-x-4">
          {recentArticles.map(article => (
            <article key={article.id} className="w-full md:w-1/2 lg:w-1/4">
              <h3 className="text-2xl font-semibold mb-1">
                <Link href={`/articles/${article.slug}`}>
                  <span className="text-3xl hover:text-blue-700">{article.title}</span>
                </Link>
              </h3>
              <p>{article.description}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}


