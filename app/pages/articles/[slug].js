import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

import md5 from 'md5';

import { useContext } from 'react';
import UserContext from '../../components/UserContext'



export default function Article() {
  const router = useRouter();
  const { slug } = router.query;

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const { user, email, supabase } = useContext(UserContext)

  useEffect(() => {

    if (slug) {
      fetchArticle();
    }


  }, [slug]);

  const fetchArticle = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        *,
        comments (
          content,
          created_at,
          email
        )
      `)
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching article:', error);
    } else {
      setArticle(data);
      setComments(data.comments);
    }
  };

  const postComment = async () => {
    console.log('User from context:', user);
    console.log('User email:', email);


    const { data, error } = await supabase
      .from('comments')
      .insert([{ article_id: article.id, content: newComment, email: email }])
      .select();

    if (error) {
      console.error('Error posting comment:', error);
      console.log('User from context:', user);
      console.log('User email:', email);
    } else {
      setComments(comments => [...comments, ...(Array.isArray(data) ? data : [data])]);
      setNewComment('');
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    postComment();
  };

  const getGravatarUrl = (email) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}`;
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <article style={{ overflowY: 'scroll', maxHeight: '75vh' }}>
        <h1 className="text-4xl font-bold my-4">{article.title}</h1>
        <div className="prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: article.content }}></div>
        <section className="mt-10">
          <div className="border-t pt-4 mt-4">
            <h2 className="text-2xl font-bold mb-">Author</h2>
            <img src={getGravatarUrl(article.email)} alt="Author Gravatar" className="w-8 h-8 rounded-full" />
            <p className="text-sm text-gray-600">Article by: {article.email}</p>
            <p className="text-sm text-gray-500">
              Published on: {article.created_at ? new Date(article.created_at).toLocaleDateString() : 'Unknown date'}
            </p>
          </div>
        </section>

        <section className="mt-10">
          <div>
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <div>
              {comments.map((comment, index) => (
                <div key={index} className="mb-4">
                  <p className="text-sm text-gray-600">
                    {comment.created_at ? new Date(comment.created_at).toLocaleString() : 'Unknown date'}
                  </p>
                  <p>{comment.content}</p>
                  <p className="text-sm text-gray-500">Posted by: {comment.email}</p>
                  <img src={getGravatarUrl(comment.email)} alt="User Gravatar" className="w-8 h-8 rounded-full" />
                </div>
              ))}
            </div>
          </div>
          {user && (
            <form onSubmit={handleCommentSubmit} className="mt-4">
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
              >
                Post Comment
              </button>
            </form>
          )}
        </section>
      </article>
    </Layout>
  );
}