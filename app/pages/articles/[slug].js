// pages/articles/[slug].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Article() {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (slug) {
      async function fetchArticle() {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          console.error('Error fetching article:', error);
        } else {
          setArticle(data);
        }
      }

      fetchArticle();
    }
  }, [slug]);

  if (!article) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <article>
          <h1 className="text-4xl font-bold my-4">{article.title}</h1>
          <div className="prose lg:prose-xl">
            <p>{article.content}</p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
