const BASE_URL = ''

export const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || `${BASE_URL}/auth-api`

export const LOGIN = '/api/login'
export const UPDATE_USER = '/api/auth/update_user'

export const CCTV_API_URL = import.meta.env.VITE_CCTV_API_URL || `${BASE_URL}/cctv-api`

export const READ_ALL_CCTV = '/api/cctv/read'
export const READ_ALL_AREA = '/api/area/read'

export const APC_API_URL = import.meta.env.VITE_APC_API_URL || `${BASE_URL}/apc-api`

export const READ_APC = '/api/apc/read/'
export const READ_APC_CONFIG = '/api/apc_config/read/'
export const UPDATE_APC_CONFIG = '/api/apc_config/update/'

export const READ_EVENT_CONFIG = '/api/event_config/read/'
export const UPDATE_EVENT_CONFIG = '/api/event_config/update/'

export const HUMAN_DETECT_API_URL = import.meta.env.VITE_HUMAN_DETECT_API_URL || `${BASE_URL}/human-detect-api`

export const READ_HUMAN_DETECT_CONFIG = '/api/human_detect_config/read/'
export const UPDATE_HUMAN_DETECT_CONFIG = '/api/human_detect_config/update/'

export const POMIT_API_URL = import.meta.env.VITE_POMIT_API_URL || `${BASE_URL}/pomit-api`
export const GET_REFRESH = '/api/pomit/refresh'

export const APP_MANAGE_API = import.meta.env.VITE_APP_MANAGE_API || `${BASE_URL}/app-manage-api`

export const READ_DEPLOYMENTS = '/api/app-manage/deployments'
const POD_API = '/api/app-manage/pods'
export const POD_LOGS = (podName: string) => `${POD_API}/${podName}/logs`
export const POD_DETAIL = (podName: string) => `${POD_API}/${podName}`

export const TURN_SERVER = import.meta.env.VITE_TURN_SERVER || '14.42.211.57:31000'

export const SFU_SERVER = import.meta.env.VITE_SFU_SERVER || '14.42.211.57:31000/sfu-server'
