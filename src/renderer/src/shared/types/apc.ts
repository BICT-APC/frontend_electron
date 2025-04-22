export interface ApcConfig {
  cctvId: number
  ruleLine: RuleLinePoints[]
  // eventConfig: EventConfig
}

export interface RuleLinePoints {
  x: number
  y: number
  orderIndex: number
}

export interface EventConfig {
  areaId: number
  resetTime: LocalTime
}

export interface LocalTime {
  hours: number
  minutes: number
  seconds: number
}
