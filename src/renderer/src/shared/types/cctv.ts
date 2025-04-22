export interface Cctv {
  id: number
  iciIdx: number
  name: string
  onvifUrl: string | null
  userName: string | null
  password: string | null
  rtspUrl: string
  area: Area
}

export interface Area {
  id: number
  iaiIdx: number
  name: string
}
