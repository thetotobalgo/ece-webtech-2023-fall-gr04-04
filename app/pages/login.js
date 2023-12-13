import { useRouter } from 'next/router'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Layout from '../components/Layout.js'

export default function Page() {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const user = useUser()
  if (user) {
    router.push('/profile')
  }
  
  return (
    <Layout
      title="Sign in"
      description="User sign in"
    >
      <h1 className='wt-title'>
        Sign in
      </h1>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['github']}
      />
    </Layout>
  )
}