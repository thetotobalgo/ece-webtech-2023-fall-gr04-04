// components/Footer.js

import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-500 p-4 text-center text-white" style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <p className="text-sm">&copy; {new Date().getFullYear()} MTT</p>
        </footer>
    );
}

export default Footer;
