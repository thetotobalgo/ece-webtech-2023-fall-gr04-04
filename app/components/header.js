import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import md5 from 'md5'; // Import the md5 library

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession();
    setUser(session?.user || null);

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      if (authListener?.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null); // reset user to null on sign out
  };

  // Function to generate Gravatar URL based on user's email
  const getGravatarUrl = (email) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}`;
  };

  return (
    <header className="bg-gray-100">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center"> {/* Use a flex container for horizontal alignment */}
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
            <span className="text-gray-800 hover:text-gray-600 px-3 cursor-pointer">Home</span>
          </Link>
          <Link href="/articles">
            <span className="text-gray-800 hover:text-gray-600 px-3 cursor-pointer">Articles</span>
          </Link>
          <Link href="/about">
            <span className="text-gray-800 hover:text-gray-600 px-3 cursor-pointer">About</span>
          </Link>
        </div>
        <div className="flex items-center"> 
          {user ? (
            <div className="flex items-center">
              <img
                src={getGravatarUrl(user.email)}
                alt="Gravatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              {/* <span className="text-gray-800 px-3">{user.email}</span> */}
              <button onClick={signOut} className="text-gray-800 hover:text-gray-600 px-3 cursor-pointer">
                Log out
              </button>
            </div>
          ) : (
            <Link href="/login">
              <span className="text-gray-800 hover:text-gray-600 px-3 cursor-pointer">Login</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
