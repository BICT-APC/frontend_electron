export interface RequestPutRuleLineDto {
  ruleLineList: RuleLineDto[]
}

export interface RuleLineDto {
  ruleLine: RuleLinePointsDto[]
}

export interface RuleLinePointsDto {
  x: number
  y: number
  orderIndex: number
}
