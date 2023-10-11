import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (

    <main>
      <header>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/articles">Articles</Link>
        <Link href="/contacts">Contacts</Link>
      </header>

      <section>
        <img src="/face.jpg"></img>
        <h1>Welcome to our lab4 app</h1>
      </section>
    </main>
  );
};

export default Page;
