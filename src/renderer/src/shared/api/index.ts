import { readHumanDetectConfig, updateHumanDetectConfig } from './human-detect-api'
import {
  readApcConfig,
  readEventConfig,
  updateRuleLine,
  updateEventConfig
} from './apc-api'
import { readAllArea, readAllCctv} from './cctv-api'
import { getRefresh } from './pomit-api'

export {
  readHumanDetectConfig,
  updateHumanDetectConfig,
  readApcConfig,
  readEventConfig,
  updateRuleLine,
  updateEventConfig,
  readAllArea,
  readAllCctv,
  getRefresh
}
