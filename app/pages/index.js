// pages/index.js
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';


export default function Home() {
  const [recentArticles, setRecentArticles] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the current user session to check if someone is logged in
    const session = supabase.auth.getSession();
    setUser(session?.user || null);

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
    <Layout>



      <section className="text-center my-10">
        <h1 className="text-4xl font-bold my-4">Welcome to Surf News</h1>
        <p className="text-xl my-4">Discover insightful articles about the discipline.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Get Started
        </button>
      </section>

      <section>
        <h2 className="text-3xl font-bold my-4">Recent Articles</h2>
        <div className="flex flex-wrap justify-between space-x-4">
          {recentArticles.map(article => (
            <article key={article.id} className="w-full md:w-1/2 lg:w-1/4">
              <h3 className="text-2xl font-semibold mb-1">
                <Link href={`/articles/${article.slug}`}>
                  <span className="text-blue-500 hover:text-blue-700">{article.title}</span>
                </Link>
              </h3>
              <p className="text-gray-700">{article.description}</p>              
            </article>
          ))}
        </div>
      </section>
      {/* Iframe commented out as before */}
    </Layout>
  );
}



