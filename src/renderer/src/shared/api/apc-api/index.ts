import axios from 'axios'
import { apcService } from './service/apc-service'
import { APC_API_URL } from '../../constants/paths'

const apcClient = axios.create({
  baseURL: APC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const { readApc, readApcConfig, readEventConfig, updateRuleLine, updateEventConfig } =
  apcService(apcClient)
