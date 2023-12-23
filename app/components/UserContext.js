import {createContext, useState, useEffect} from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

const Context = createContext()

export default Context

export const ContextProvider = ({
  children
}) => {
  const supabase = useSupabaseClient()
  const supabaseUser = useUser()
  const [user, setUser] = useState()
  const [email, setEmail] = useState()


  useEffect(function () {
    if (supabaseUser) {
      setUser(supabaseUser)
      setEmail(supabaseUser.email);
    }
  }, [supabaseUser])

  return (
    <Context.Provider
      value={{
        user: user,
        email: email,
        supabase,
        logout: async () => {
          await supabase.auth.signOut()
          setUser(null)
          setEmail(null)
        }
      }}
    >
      {children}
    </Context.Provider>
  )
}