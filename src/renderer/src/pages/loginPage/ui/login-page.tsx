import { useEffect } from 'react'
import { LoginForm } from '../../../features/login-form'
import styles from './login-page.module.css'

export const LoginPage = () => {
  useEffect(() => {
    // 로그인 페이지가 로드될 때 localStorage에서 토큰 삭제
    localStorage.removeItem('accessToken')
  }, [])

  return (
    <div className={styles.wrapper}>
      <LoginForm />
    </div>
  )
}
