import Head from 'next/head';
import Header from '../components/header.js';
import Footer from '../components/footer.js';
import { useTheme } from '../context/themeContext';


export default function Layout({
  children,
  title = 'Digital Publishing Platform',
  description = 'A minimal digital publishing platform'
}) {
  const { theme } = useTheme();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/logo.ico" />
      </Head>

      <div className={`${theme.text} ${theme.background}`}>
        <div className="flex flex-col min-h-screen bg-cover bg-center">
          <Header />

          {/* Add horizontal padding for side margins, adjust px-4 to increase or decrease the margin */}
          <main className="w-full flex-grow mx-auto bg-opacity-90 overflow-y-auto px-10" style={{ maxHeight: 'calc(100vh - var(--header-height) - var(--footer-height))' }}>
            {children}
          </main>

          <Footer />
        </div>
      </div>
    </>
  )
}
