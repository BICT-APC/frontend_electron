export interface ResponseApcConfigDto {
  id: number
  areaId: number
  cctvId: number
  ruleLine: RuleLinePointsDto[]
  // eventConfig: EventConfigDto
}

export interface EventConfigDto {
  id: number
  areaId: number
  resetTime: string
}

export interface RuleLinePointsDto {
  id: number
  x: number
  y: number
  orderIndex: number
}
