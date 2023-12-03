import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import md5 from 'md5';
import { useTheme } from '../context/themeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const session = supabase.auth.getSession();
    setUser(session?.user || null);

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      if (authListener?.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      searchArticles(e.target.value);
    } else {
      setSearchResults([]);
    }
  };

  const searchArticles = async (term) => {
    const { data, error } = await supabase
      .from('articles')
      .select('title, slug')
      .ilike('slug', `%${term}%`);

    if (error) {
      console.error('Error searching articles:', error);
    } else {
      setSearchResults(data);
    }
  };

  const getGravatarUrl = (email) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}`;
  };

  return (
    <header>
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">

        <div className="relative flex items-center">
          <Link href="/">
            <span>
              <Image
                src="/logo.png"
                alt="Surf News Logo"
                width={100}
                height={50}
              />
            </span>
          </Link>
          <Link href="/">
            <span className="hover:text-gray-600 px-3 cursor-pointer">Home</span>
          </Link>
          <Link href="/articles">
            <span className="hover:text-gray-600 px-3 cursor-pointer">Articles</span>
          </Link>
          <Link href="/forecast">
            <span className="hover:text-gray-600 px-3 cursor-pointer">Forecast</span>
          </Link>
          <Link href="/about">
            <span className="hover:text-gray-600 px-3 cursor-pointer">About</span>
          </Link>

          

          <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search..."
              className="px-2 py-1 border rounded-l"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </form>

          {searchResults.length > 0 && (
            <div className="absolute border rounded">
              {searchResults.map((article) => (
                <Link key={article.slug} href={`/articles/${article.slug}`}>
                  <span className="block px-4 py-2 hover:bg-gray-100">{article.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center">
          {user ? (
            <div className="flex items-center">

              <button onClick={signOut} className="hover:text-gray-600 px-3 cursor-pointer">
                Log out
              </button>
              <Link href="/profile">
                <img
                  src={getGravatarUrl(user.email)}
                  alt="Gravatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
              </Link>
            </div>
          ) : (
            <Link href="/login">
              <span className="hover:text-gray-600 px-3 cursor-pointer">Login</span>
            </Link>
          )}
          <button onClick={toggleTheme}>Night mode</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

   