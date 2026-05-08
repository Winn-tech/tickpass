'use client'
import { useEffect } from 'react'
import { getMe } from '../utils/authsApi'
import { useAuthStore } from '../store/authStore'

const AuthInitializer = () => {
  const { setUser, clearUser, setAuthReady, isAuthReady } = useAuthStore()

  useEffect(() => {
    if (isAuthReady) return

    let isMounted = true

    const initAuth = async () => {
      try {
        const response = await getMe()

        if (!isMounted) return

        if (response.status === 'success') {
          setUser(response.data)
        } else {
          clearUser()
        }
      } catch {
        if (isMounted) {
          clearUser()
        }
      } finally {
        if (isMounted) {
          setAuthReady(true)
        }
      }
    }

    initAuth()

    return () => {
      isMounted = false
    }
  }, [isAuthReady, setUser, clearUser, setAuthReady])

  return null
}

export default AuthInitializer
