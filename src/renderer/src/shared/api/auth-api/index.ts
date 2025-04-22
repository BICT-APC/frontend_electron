import axios from 'axios'
import { authService } from './service/auth-service'
import { AUTH_API_URL } from '../../constants/paths'

const authClient = axios.create({
  baseURL: AUTH_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'application/json'
  }
})
export const publicClient = axios.create({
  baseURL: AUTH_API_URL,
  headers: { 'Content-Type': 'application/json' }
})

export const { login, updateUser } = authService(authClient, publicClient)
