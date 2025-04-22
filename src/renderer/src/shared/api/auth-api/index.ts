import axios from 'axios'
import { authService } from './service/auth-service'
import { AUTH_API_URL } from '../../constants/paths'

// 토큰을 가져오는 함수
const getAuthHeader = async () => {
  try {
    const token = await window.electronToken.getToken()
    return token ? `Bearer ${token}` : ''
  } catch (error) {
    console.error('토큰 가져오기 실패:', error)
    return ''
  }
}

// 인증이 필요한 요청을 위한 인터셉터 설정
const authClient = axios.create({
  baseURL: AUTH_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 요청 전에 토큰을 가져와 헤더에 추가
authClient.interceptors.request.use(async (config) => {
  const authHeader = await getAuthHeader()
  if (authHeader) {
    config.headers.Authorization = authHeader
  }
  return config
})

export const publicClient = axios.create({
  baseURL: AUTH_API_URL,
  headers: { 'Content-Type': 'application/json' }
})

export const { login, updateUser } = authService(authClient, publicClient)
