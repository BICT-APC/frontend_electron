export const CCTV_API_URL = import.meta.env.VITE_CCTV_API_URL || `/cctv-api`
export const GET_ALL_CCTV = '/api/cctv'


export const APC_API_URL = import.meta.env.VITE_APC_API_URL || `/apc-api`

export const READ_APC_CONFIG_BY_CCTV_ID = '/api/apc_config/read/'
export const UPDATE_APC_CONFIG_BY_CCTV_ID = '/api/apc_config/update/'

export const READ_EVENT_CONFIG_BY_AREA_ID = '/api/event_config/read/'
export const UPDATE_EVENT_CONFIG_BY_AREA_ID = '/api/event_config/update/'

export const HUMAN_DETECT_API_URL =
  import.meta.env.VITE_HUMAN_DETECT_API_URL || `/human-detect-api`
export const GET_HUMAN_DETECT_CONFIG_BY_CCTV = '/api/human_detect_config/by_cctv_id/'
export const PUT_HUMAN_DETECT_CONFIG_BY_CCTV = '/api/human_detect_config/by_cctv_id/'

export const HUMAN_DETECT_MODULE_URL =
import.meta.env.VITE_HUMAN_DETECT_MODULE_URL || `/human-detect-module`
export const GET_STREAM = '/api/stream/custom/'

export const POMIT_API_URL = import.meta.env.VITE_POMIT_API_URL || `/pomit-api`
export const GET_REFRESH = '/api/pomit/refresh'
