import Link from 'next/link';
import { useTheme } from './themeContext';

///Footer with the Contact form and the empty Terms of Services

export default function Footer() {

  //Use the theme colors
  const { toggleTheme } = useTheme();

  return (
    <footer>
      <div className="container mx-auto px-4 py-4 text-center">
        <Link href="/contacts">
          <span className="hover:text-gray-600 px-3 cursor-pointer">Contact</span>
        </Link>
        <a href="#" className="hover:text-gray-600 px-3">Terms of Service</a>
      </div>
    </footer>
  )
}