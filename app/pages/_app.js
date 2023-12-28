import '@/styles/globals.css'

import { ContextProvider } from '../components/UserContext'
import { ThemeProvider } from '../components/themeContext';

import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

import { useState } from 'react'


export default function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient())
  return (
    <ThemeProvider>

      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >

        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>

      </SessionContextProvider>

    </ThemeProvider>
  );
}