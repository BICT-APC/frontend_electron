import { RuleLine } from "@renderer/shared/types/apc"

export interface ResponseApcConfigDto {
  id: number
  areaId: number
  cctvId: number
  ruleLine: RuleLine[]
}


