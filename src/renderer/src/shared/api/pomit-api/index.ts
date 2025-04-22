import axios from 'axios'
import { POMIT_API_URL } from '../../constants/paths'
import { pomitService } from './service/pomit-service'

const pomitClient = axios.create({
  baseURL: POMIT_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const { getRefresh } = pomitService(pomitClient)
