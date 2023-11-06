// pages/index.js

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <section>
                    <h1 className="text-4xl text-center mt-20">Welcome to our lab6 app</h1>
                </section>
            </main>
            <Footer />
        </div>
    );
}
