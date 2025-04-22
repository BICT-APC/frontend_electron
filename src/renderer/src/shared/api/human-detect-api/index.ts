import axios from 'axios'
import { HUMAN_DETECT_API_URL } from '../../constants/paths'
import { humanDetectService } from './service/human-detect-service'

const humanDetectClient = axios.create({
  baseURL: HUMAN_DETECT_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const {
  readHumanDetectConfig,
  updateHumanDetectConfig
} = humanDetectService(humanDetectClient)
