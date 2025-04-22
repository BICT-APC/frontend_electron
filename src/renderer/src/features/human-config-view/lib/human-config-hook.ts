import { useState } from 'react'
import { readHumanDetectConfig } from '../../../shared/api'
import type { ResponseHumanDetectConfigDto as _ResponseHumanDetectConfigDto } from '../../../shared/api/human-detect-api/dto/response-human-detect-config-dto'

export type ResponseHumanDetectConfigDto = _ResponseHumanDetectConfigDto
export function useHumanConfig() {
  const [config, setConfig] = useState<ResponseHumanDetectConfigDto | null>(null)

  const readConfig = async (cctvId: number) => {
    const data = await readHumanDetectConfig(cctvId)
    setConfig(data)
    return data
  }

  return {
    config,
    readConfig
  }
}
