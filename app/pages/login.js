// pages/login.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import { supabase } from '../utils/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Layout from '../components/Layout';


export default function Login() {
  const [session, setSession] = useState(null);
  const router = useRouter(); // Initialize useRouter hook

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        // If there is a session, navigate to the index page
        router.push('/');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        // If there is a session, navigate to the index page
        router.push('/');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  if (!session) {
    return (
      <Layout>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['github']}
        />
      </Layout>
    );
  } else {
    return (
      <div>
        Logged in!
      </div>
    );
  }
}
