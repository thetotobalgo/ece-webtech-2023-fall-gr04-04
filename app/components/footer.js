import Link from 'next/link';
import { useTheme } from '../context/themeContext';


const Footer = () => {
  const { theme } = useTheme();
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

export default Footer;
