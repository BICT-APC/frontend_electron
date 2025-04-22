export interface ResponseCctvListDto {
  responseCctvDtoList: ResponseCctvDto[]
}

export interface ResponseCctvDto {
  id: number
  iciIdx: number
  name: string
  onvifUrl: string | null
  userName: string | null
  password: string | null
  rtspUrl: string
  area: AreaDto
}

export interface AreaDto {
  id: number
  iaiIdx: number
  name: string
}
