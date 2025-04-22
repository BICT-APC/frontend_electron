import axios from 'axios'
import { CCTV_API_URL } from '../../constants/paths'
import { cctvService } from './service/cctv-service'

const cctvClient = axios.create({
  baseURL: CCTV_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const {
  readAllArea,
  readAllCctv
} = cctvService(cctvClient)
