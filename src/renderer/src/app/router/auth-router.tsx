import { JSX } from 'react'
import { Navigate } from 'react-router-dom'

export function AuthRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = localStorage.getItem('accessToken') ? true : false
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

