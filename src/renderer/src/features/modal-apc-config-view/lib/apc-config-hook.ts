import { useEffect, useState } from 'react'
import {
  readApc,
  readEventConfig,
  updateSettingCount,
  updateEventConfig
} from '../../../shared/api'
import { ResponseApcDto } from '../../../shared/api/apc-api/dto/response/response-apc-dto'
import { RequestSettingApcDto } from '../../../shared/api/apc-api/dto/request/request-apc-setting-dto'
import { ResponseEventConfigDto } from '../../../shared/api/apc-api/dto/response/response-event-config-dto'

interface ApcConfigProps {
  areaId: number
}

export function useApcConfig({ areaId }: ApcConfigProps) {
  const [config, setConfig] = useState<ResponseApcDto | null>(null)
  const [resetTime, setResetTime] = useState<string>('')
  const [eventConfig, setEventConfig] = useState<ResponseEventConfigDto | null>(null)

  const readConfig = async (areaId: number) => {
    if (!areaId) return null

    try {
      const data = await readApc(areaId)
      setConfig(data)
      return data
    } catch (error) {
      console.error('Failed to read config:', error)
      return null
    }
  }

  const updateApcCount = async (apcCount: RequestSettingApcDto) => {
    try {
      if (!areaId) return null

      const response = await updateSettingCount(apcCount)
      return response
    } catch (error) {
      console.error('Failed to update reset time:', error)
      return null
    }
  }

  const readApcEventConfig = async (areaId: number) => {
    if (!areaId) return null

    try {
      const data = await readEventConfig(areaId)
      setEventConfig(data)
      return data
    } catch (error) {
      console.error('Failed to read event config:', error)
      return null
    }
  }

  const updateApcEventResetTime = async (areaId: number, newResetTime: string) => {
    try {
      if (!areaId) return null
      const response = await updateEventConfig(areaId, {
        resetTime: newResetTime
      })

      setResetTime(newResetTime)
      return response
    } catch (error) {
      console.error('Failed to update reset time:', error)
      return null
    }
  }

  return {
    config,
    resetTime,
    eventConfig,
    readConfig,
    readApcEventConfig,
    updateApcCount,
    updateApcEventResetTime
  }
}
