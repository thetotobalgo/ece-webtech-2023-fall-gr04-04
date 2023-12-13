import Head from 'next/head';
import Header from '../components/header.js';
import Footer from '../components/footer.js';
import { useTheme } from './themeContext';

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

      <div className={theme}>

        <div className="flex flex-col min-h-screen" style={{ theme }}>
          <Header />
          <main className="w-full flex-grow mx-auto overflow-y-auto px-10" style={{ maxHeight: 'calc(100vh - var(--header-height) - var(--footer-height))' }}>

            {children}
          </main>
          <Footer />
        </div>

      </div>
    </>
  );
}
