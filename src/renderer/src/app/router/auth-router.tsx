import { JSX, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

export function AuthRoute({ children }: { children: JSX.Element }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkToken = async () => {
      try {
        // localStorage에서 토큰 삭제 (기존 토큰 정리)
        // localStorage.removeItem('accessToken')

        // Electron 세션에서 토큰 확인
        const token = await window.electronToken.getToken()
        setIsLoggedIn(!!token)
        
      } catch (error) {
        console.error('토큰 확인 중 오류 발생:', error)
        setIsLoggedIn(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkToken()
  }, [])

  if (isLoading) {
    // 로딩 중일 때 표시할 내용 (선택사항)
    return null
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />
}
