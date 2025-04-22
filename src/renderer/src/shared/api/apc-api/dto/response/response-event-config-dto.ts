import { ApcConfig } from '@renderer/shared/types/apc'

export interface ResponseEventConfigDto {
  id: number
  areaId: number
  resetTime: string
  apcConfig: ApcConfig
}
