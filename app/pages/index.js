// pages/index.js
import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section>
          <h1 className="text-4xl text-center mt-20">Welcome to our lab6 app</h1>
          <ul className="flex justify-center mt-8">
            <li className="mr-4">
              <Link href="/use-states">
                <p className="text-blue-500">Use State</p>
              </Link>
            </li>
            <li className="mr-4">
              <Link href="/login-test">
                <p className="text-blue-500">Login Native</p>
              </Link>
            </li>
            <li>
              <Link href="/login-controlled">
                <p className="text-blue-500">Login Controlled</p>
              </Link>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
