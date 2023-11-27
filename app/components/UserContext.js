import {createContext, useState, useEffect} from 'react'

const Context = createContext()

export default Context

export const ContextProvider = ({
  children
}) => {
  const [profile, setProfile] = useState(null)
  const fetchData = async () => {
    const response = await fetch('/api/profile')
    return await response.json()
  }
  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await fetchData()
      setProfile(profile)
    }
    fetchProfile()
  }, [])
  
  return (
    <Context.Provider
      value={{
        profile: profile,
        login: async () => {
          const profile = await fetchData()
          setProfile(profile)
        },
        logout: () => {
          setProfile(null)
        }
      }}
    >
      {children}
    </Context.Provider>
  )
}