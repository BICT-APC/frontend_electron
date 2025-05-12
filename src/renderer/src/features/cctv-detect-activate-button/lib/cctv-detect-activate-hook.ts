import { useCallback, useEffect, useState } from 'react'
import {
  activateHumanDetect,
  deactivateHumanDetect,
  readHumanDetectConfig
} from '../../../shared/api'

interface CctvDetectActivateHookProps {
  cctvId: number | null
}

export const useCctvDetectActivate = ({ cctvId }: CctvDetectActivateHookProps) => {
  const [isActivate, setIsActivate] = useState<boolean | null>(null)

  const fetchDetectStatus = useCallback(async () => {
    if (!cctvId) return

    try {
      const humanDetectConfig = await readHumanDetectConfig(cctvId)
      setIsActivate(humanDetectConfig.isActivate)
    } catch (error) {
      console.error('Error fetching detect status:', error)
    }
  }, [cctvId])

  const toggleDetectStatus = useCallback(async () => {
    if (!cctvId) return

    try {
      if (isActivate) {
        await deactivateHumanDetect(cctvId)
      } else {
        await activateHumanDetect(cctvId)
      }
      await fetchDetectStatus()
    } catch (error) {
      console.error('Error toggling detect status:', error)
    }
  }, [cctvId, isActivate, fetchDetectStatus])

  useEffect(() => {
    fetchDetectStatus()
  }, [fetchDetectStatus])

  return {
    isActivate,
    toggleDetectStatus
  }
}
