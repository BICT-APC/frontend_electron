export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

// export const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || `${BASE_API_URL}/auth-api`
export const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || `http://localhost:8004/auth-api`
export const LOGIN = '/api/login'
export const SIGNUP = '/api/auth/signup'
export const DELETE_USER = '/api/auth/delete_user'
export const UPDATE_USER = '/api/auth/update_user'
export const GET_USER = '/api/auth/get_user'
export const GET_USERS = '/api/auth/get_users'

export const CCTV_API_URL = import.meta.env.VITE_CCTV_API_URL || `${BASE_API_URL}/cctv-api`
export const GET_ALL_CCTV = '/api/cctv'

export const APC_API_URL = import.meta.env.VITE_APC_API_URL || `${BASE_API_URL}/apc-api`
export const GET_APC_CONFIG_BY_CCTV_ID = '/api/apc_config/by_cctv_id/'
export const PUT_APC_RULE_LINE_BY_CCTV_ID = '/api/apc_config/by_cctv_id/'
export const GET_APC = ''

export const HUMAN_DETECT_API_URL =
  import.meta.env.VITE_HUMAN_DETECT_API_URL || `${BASE_API_URL}/human-detect-api`
export const GET_HUMAN_DETECT_CONFIG_BY_CCTV = '/api/human_detect_config/by_cctv_id/'
export const PUT_HUMAN_DETECT_CONFIG_BY_CCTV = '/api/human_detect_config/by_cctv_id/'

export const HUMAN_DETECT_MODULE_URL =
  import.meta.env.VITE_HUMAN_DETECT_MODULE_URL || `${BASE_API_URL}/human-detect-module`
export const GET_STREAM = '/api/stream/custom/'

export const POMIT_API_URL = import.meta.env.VITE_POMIT_API_URL || `${BASE_API_URL}/pomit-api`
export const GET_REFRESH = '/api/pomit/refresh'
