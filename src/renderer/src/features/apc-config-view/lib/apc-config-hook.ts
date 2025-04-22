import { useState } from 'react'
import { readApcConfig } from '../../../shared/api'
import type { ResponseApcConfigDto } from '../../../shared/api/apc-api/dto/response/response-apc-config-dto'

export function useApcConfig() {
  const [config, setConfig] = useState<ResponseApcConfigDto | null>(null)

  const readConfig = async (cctvId: number) => {
    const data = await readApcConfig(cctvId)
    setConfig(data)
    return data
  }

  return {
    config,
    readConfig
  }
}
