import { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/api'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try {
      const stored = localStorage.getItem('jia_admin_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const [token, setToken] = useState(() => localStorage.getItem('jia_admin_token') || null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const data = await api.get('/auth/me')
        if (data.success && data.admin) {
          setAdmin(data.admin)
          localStorage.setItem('jia_admin_user', JSON.stringify(data.admin))
        }
      } catch (err) {
        console.warn('Admin token expired or invalid:', err.message)
        logout()
      } finally {
        setLoading(false)
      }
    }

    verifyToken()
  }, [token])

  const login = async (email, password) => {
    const data = await api.post('/auth/login', { email, password })
    if (data.success && data.token) {
      setToken(data.token)
      setAdmin(data.admin)
      localStorage.setItem('jia_admin_token', data.token)
      localStorage.setItem('jia_admin_user', JSON.stringify(data.admin))
      return data
    }
    throw new Error(data.message || 'Login failed')
  }

  const logout = () => {
    setToken(null)
    setAdmin(null)
    localStorage.removeItem('jia_admin_token')
    localStorage.removeItem('jia_admin_user')
  }

  const value = {
    admin,
    token,
    isAuthenticated: Boolean(token && admin),
    loading,
    login,
    logout,
  }

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}
