// pages/index.js
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Home() {
  const [recentArticles, setRecentArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(2);

      if (error) {
        console.error('Error fetching articles:', error);
      } else {
        setRecentArticles(data);
      }
    }
    fetchArticles();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Digital Publishing Platform</title>
        <meta name="description" content="A minimal digital publishing platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4">
        <section className="text-center my-10">
          <h1 className="text-4xl font-bold my-4">Welcome to Surf News</h1>
          <p className="text-xl my-4">Discover insightful articles about the discipline.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
        </section>

        <section>
          <h2 className="text-3xl font-bold my-4">Recent Articles</h2>
          <div className="flex justify-between space-x-4">
            {recentArticles.map(article => (
              <article key={article.id} className="w-1/2">
                <h3 className="text-2xl font-semibold mb-1">
                  <Link href={`/articles/${article.slug}`}>
                    <p className="text-blue-500 hover:text-blue-700">{article.title}</p>
                  </Link>
                </h3>
                <p className="text-gray-700">{article.description}</p>
              </article>
            ))}
          </div>
        </section>
        {/* <iframe src="/SurferGame.html" width="100%" height="300px"></iframe> */}
      </main>
      <Footer />
    </div>
  );
}
