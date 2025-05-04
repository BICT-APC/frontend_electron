import { readHumanDetectConfig, updateHumanDetectConfig } from './human-detect-api'
import {
  readApc,
  readApcLog,
  readApcConfig,
  readEventConfig,
  updateRuleLine,
  updateEventConfig
} from './apc-api'
import { readAllArea, readAllCctv } from './cctv-api'
import { getRefresh } from './pomit-api'

export {
  readHumanDetectConfig,
  updateHumanDetectConfig,
  readApc,
  readApcLog,
  readApcConfig,
  readEventConfig,
  updateRuleLine,
  updateEventConfig,
  readAllArea,
  readAllCctv,
  getRefresh
}
