import { useEffect, useState } from 'react'
import { readHumanDetectConfig } from '../../../shared/api'
import type { ResponseHumanDetectConfigDto } from '../../../shared/api/human-detect-api/dto/response-human-detect-config-dto'

interface HumanConfigProps {
  cctvId: number
}

export function useHumanConfig({ cctvId }: HumanConfigProps) {
  const [config, setConfig] = useState<ResponseHumanDetectConfigDto | null>(null)

  useEffect(() => {
    if (cctvId) {
      readConfig(cctvId)
    }
  }, [cctvId])

  const readConfig = async (cctvId: number) => {
    const data = await readHumanDetectConfig(cctvId)
    setConfig(data)
    return data
  }

  return {
    config
  }
}
