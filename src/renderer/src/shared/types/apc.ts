export interface ApcConfig {
  cctvId: number
  ruleLineList: RuleLine[]
}

export interface RuleLinePoints {
  x: number
  y: number
  orderIndex: number
}

export interface RuleLine {
  ruleLine: RuleLinePoints[]
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
