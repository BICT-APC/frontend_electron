import { useEffect, useState } from 'react'
import { readApc } from '../../../shared/api'
import type { ResponseApcDto } from '../../../shared/api/apc-api/dto/response/response-apc-dto'

interface ApcConfigProps {
  areaId: number
}

export function useApcConfig({ areaId }: ApcConfigProps) {
  const [config, setConfig] = useState<ResponseApcDto | null>(null)

  useEffect(() => {
    if (areaId) {
      readConfig(areaId)
    }
  }, [areaId])

  const readConfig = async (areaId: number) => {
    const data = await readApc(areaId)
    setConfig(data)
    return data
  }

  return {
    config
  }
}
