import Link from 'next/link';
import { useState, useContext } from 'react';
import md5 from 'md5';
import { useTheme } from './themeContext';
import UserContext from './UserContext';

/// In the header we have the 5 pages, the search bar with the results, the login/profile button and nightmode switch
/// We use the PostgreSQL websearch_to_tsquery function to fetch the results

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { toggleTheme } = useTheme();
  const { user, logout, supabase } = useContext(UserContext);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      searchArticles(e.target.value);
    } else {
      setSearchResults([]);
    }
  };

  const searchArticles = async (term) => {

    const formattedTerm = term.split(' ').join(' & ');

    const { data, error } = await supabase
      .from('articles')
      .select('title, slug')
      .textSearch('slug', formattedTerm, {
        type: 'websearch' 
      });

    if (error) {
      console.error('Error searching articles:', error);
      setSearchResults([]);
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
      <nav className="container mx-auto px-4 py-10 flex justify-between items-center">
        <div className="flex items-center">
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
          <Link href="/game">
            <span className="hover:text-gray-600 px-3 cursor-pointer">Game</span>
          </Link>

          <div className="relative">
            <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Search tags..."
                className="px-2 py-1 border rounded-l"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </form>

            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 mt-1 border rounded bg-white z-10">
                {searchResults.map((article) => (
                  <Link key={article.slug} href={`/articles/${article.slug}`}>
                    <span className="block px-4 py-2 hover:bg-gray-100">{article.title}</span>
                  </Link>
                ))}
              </div>
            )}
            
          </div>
        </div>

        <div className="flex items-center">
          {user ? (
            <div className="flex items-center">
              <button onClick={logout} className="hover:text-gray-600 px-3 cursor-pointer">
                Sign out
              </button>
              <Link href="/profile">
                <span>
                  <img src={getGravatarUrl(user.email)} alt="Gravatar" className="w-8 h-8 rounded-full mr-2" />
                </span>
              </Link>
            </div>
          ) : (
            <Link href="/login">
              <span className="hover:text-gray-600 px-3 cursor-pointer">Login</span>
            </Link>
          )}

          <button onClick={toggleTheme} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" >
            Night Mode
          </button>
        </div>
      </nav>
    </header>
  );
}