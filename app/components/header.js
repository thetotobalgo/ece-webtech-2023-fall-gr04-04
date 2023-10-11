import Reat from 'react';
import Link from 'next/link';

const Header = () => {
    return (
        <header>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/articles">Articles</Link>
        </header>
    );
}

export default Header;