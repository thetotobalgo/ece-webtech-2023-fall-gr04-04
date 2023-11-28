import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-4 text-center">
        <Link href="/contacts">
          <span className="text-gray-800 hover:text-gray-600 px-3 cursor-pointer">Contact</span>
        </Link>
        <a href="#" className="text-gray-800 hover:text-gray-600 px-3">Terms of Service</a>
      </div>
    </footer>
  )
}

export default Footer;
