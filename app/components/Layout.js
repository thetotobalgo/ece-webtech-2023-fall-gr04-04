import Head from 'next/head'
import Header from '../components/Header.js'

export default function Layout({
  children,
  title,
  description
}){
  return (
    <>
      <div>
        <Header />
        <main className="py-10 min-h-screen max-w-full md:max-w-2xl md:mx-auto">
          {children}
        </main>
      </div>
    </>
  )
}
