export interface Cctv {
  id: number
  iciIdx: number
  name: string
  onvifUrl: string | null
  userName: string | null
  password: string | null
  rtspUrl: string
  areaId: number
}

export interface Area {
  id: number
  iaiIdx: number
  name: string
  cctvIdList: number[]
}
