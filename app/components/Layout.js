import Head from 'next/head'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'

export default function Layout({
  children,
  title,
  description
}){
  return (
    <>
      <Head>
        <title>{`Webtech ${title && `- ${title}`}`}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header/>
        <main className="py-10 min-h-screen max-w-full md:max-w-2xl md:mx-auto">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}