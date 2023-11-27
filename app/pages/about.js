import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Layout from '../components/Layout'; // If you have a Layout component

export default function About() {
  return (
    <Layout title="About Surf News" description="Learn more about Surf News and our team.">
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold my-4 text-center">About Surf News</h1>
        <p className="text-xl my-4">
          Surf News is dedicated to bringing you the latest and most exciting news from the world of surfing. 
          From the biggest waves to the latest surf competitions, we keep our finger on the pulse of the surf world.
        </p>

        <h2 className="text-3xl font-bold my-4">Our Team</h2>
        <div className="space-y-4">
          <p><strong>Tom:</strong> Avid surfer and journalist, Tom combines his passion for the sport with his talent for storytelling.</p>
          <p><strong>Saad:</strong> With a keen eye for detail, Saad ensures that all our articles are accurate and up-to-date.</p>
          <p><strong>Thayri:</strong> Our on-the-ground reporter, Thayri brings a fresh perspective with interviews and coverage of live events.</p>
        </div>
      </main>
      
    </Layout>
  );
}
