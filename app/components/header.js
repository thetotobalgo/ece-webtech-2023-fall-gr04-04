import Link from 'next/link';
import { useState, useEffect } from 'react';
import md5 from 'md5';
import { useContext } from 'react';
import { useTheme } from './themeContext';
import UserContext from './UserContext';



const Header = () => {

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

  //Search articles 

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

  //Retrieve gravatar picture url

  const getGravatarUrl = (email) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}`;
  };

  return (
    <header>
      <nav className="container mx-auto px-4 py-10 flex justify-between items-center">

        <div className="relative flex items-center">
          
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

              <button onClick={logout} className="hover:text-gray-600 px-3 cursor-pointer">
                Sign out
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
          <button 
            onClick={toggleTheme} 
            className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        >
            Night Mode
        </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

   