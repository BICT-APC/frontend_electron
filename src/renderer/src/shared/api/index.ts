import { getHumanDetectConfigByCctvId, putHumanDetectRoiByCctvId } from './human-detect-api'
import { 
  readApcConfigByCctvId,
  readEventConfigByCctvId,
  updateRuleLineCctvId,
  updateEventConfigCctvId
} from './apc-api'
import { getAllCctv } from './cctv-api'
import { getRefresh } from './pomit-api'

export {
  getHumanDetectConfigByCctvId,
  putHumanDetectRoiByCctvId,
  readApcConfigByCctvId,
  readEventConfigByCctvId,
  updateRuleLineCctvId,
  updateEventConfigCctvId,
  getAllCctv,
  getRefresh
}
