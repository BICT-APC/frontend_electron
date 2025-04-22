import { useState } from 'react'
import { login } from '../../../shared/api/auth-api'
import { RequestLoginDto } from '../../../shared/api/auth-api/dto/request-auth-dto'
import { ResponseLoginDto } from '../../../shared/api/auth-api/dto/response-auth-dto'

export const useLoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    try {
      const loginDto: RequestLoginDto = { username, password }
      const token: ResponseLoginDto = await login(loginDto)
      localStorage.setItem('accessToken', token.token)
      window.location.href = '/'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || '로그인에 실패했습니다.')
    }
  }

  return { username, setUsername, password, setPassword, error, handleSubmit }
}
