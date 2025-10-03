"use client"

import type React from "react"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiClient } from "../services/api"
import type { AuthContextState, AuthResponse } from "../types"

const AuthContext = createContext<AuthContextState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("slf_token"))
  const [user, setUser] = useState<AuthResponse["user"] | null>(() => {
    const saved = localStorage.getItem("slf_user")
    return saved ? JSON.parse(saved) : null
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
    } else {
      delete apiClient.defaults.headers.common.Authorization
    }
  }, [token])

  const login = useCallback(
    (authData: AuthResponse) => {
      localStorage.setItem("slf_token", authData.token)
      localStorage.setItem("slf_user", JSON.stringify(authData.user))
      setToken(authData.token)
      setUser(authData.user)
      navigate("/dashboard", { replace: true })
    },
    [navigate],
  )

  const logout = useCallback(() => {
    localStorage.removeItem("slf_token")
    localStorage.removeItem("slf_user")
    setToken(null)
    setUser(null)
    navigate("/", { replace: true })
  }, [navigate])

  const value = useMemo(
    () => ({
      token,
      user,
      login,
      logout,
      isAuthenticated: Boolean(token),
    }),
    [login, logout, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
