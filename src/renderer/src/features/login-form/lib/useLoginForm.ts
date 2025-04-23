import { useState } from 'react'
import { login } from '../../../shared/api/auth-api'
import { RequestLoginDto } from '../../../shared/api/auth-api/dto/request-auth-dto'
import { ResponseLoginDto } from '../../../shared/api/auth-api/dto/response-auth-dto'
import { useNavigate } from 'react-router-dom'

export const useLoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setError('')
    try {
      const loginDto: RequestLoginDto = { username, password }
      const token: ResponseLoginDto = await login(loginDto)

      // localStorage 대신 Electron 세션에 토큰 저장
      // window.electronToken.setToken(token.token)
      sessionStorage.setItem("token", token.token)

      navigate('/')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || '로그인에 실패했습니다.')
    }
  }

  return { username, setUsername, password, setPassword, error, handleSubmit }
}
