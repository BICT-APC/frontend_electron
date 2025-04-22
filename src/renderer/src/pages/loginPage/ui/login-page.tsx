import styles from './login-page.module.css'
import { LoginForm } from '../../../features/login-form'

export const LoginPage = () => {
  return (
    <div className={styles.wrapper}>
      <LoginForm />
    </div>
  )
}