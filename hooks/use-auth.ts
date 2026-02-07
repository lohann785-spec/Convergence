'use client'

import { useState, useEffect, useCallback } from 'react'

export interface User {
  id: string
  email: string
  name: string
  plan: string
  creditsTotal: number
  creditsUsed: number
  avatar?: string
  bio?: string
  theme?: string
  accentColor?: string
  fontSize?: string
  codeFont?: string
  animatedBg?: boolean
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Récupérer l'utilisateur du localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('convergence_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (err) {
        console.error('Error parsing stored user:', err)
      }
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Connexion échouée')
      }

      const data = await response.json()
      const userData: User = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        plan: data.user.plan,
        creditsTotal: data.user.creditsTotal || 5,
        creditsUsed: data.user.creditsUsed || 0,
      }
      setUser(userData)
      localStorage.setItem('convergence_user', JSON.stringify(userData))
      return userData
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur de connexion'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signup = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Inscription échouée')
      }

      const data = await response.json()
      const userData: User = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        plan: 'FREE',
        creditsTotal: 5,
        creditsUsed: 0,
      }
      setUser(userData)
      localStorage.setItem('convergence_user', JSON.stringify(userData))
      return userData
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur d\'inscription'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('convergence_user')
  }, [])

  const updateUser = useCallback(async (updates: Partial<User>) => {
    if (!user) return
    setIsLoading(true)
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, ...updates }),
      })

      if (!response.ok) {
        throw new Error('Mise à jour échouée')
      }

      const data = await response.json()
      const updatedUser: User = { ...user, ...data.user }
      setUser(updatedUser)
      localStorage.setItem('convergence_user', JSON.stringify(updatedUser))
      return updatedUser
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur de mise à jour'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [user])

  return {
    user,
    isLoading,
    error,
    login,
    signup,
    logout,
    updateUser,
    isAuthenticated: !!user,
  }
}
