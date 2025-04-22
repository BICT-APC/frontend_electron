// ui/LoginForm.tsx
import { useLoginForm } from '../lib/useLoginForm'
import styles from './LoginForm.module.css'
import { TextButton } from '../../text-button'

export const LoginForm = () => {
  const { username, setUsername, password, setPassword, error, handleSubmit } = useLoginForm()

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        {error && <div className={styles.error}>{error}</div>}
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.buttonWrapper}>
          <TextButton onClick={handleSubmit}>로그인</TextButton>
        </div>
      </div>
    </div>
  )
}