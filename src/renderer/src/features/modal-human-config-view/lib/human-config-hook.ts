import { useEffect, useState } from 'react'
import { readHumanDetectConfig, updateHumanDetectConfig, deletePod } from '../../../shared/api'
import type { ResponseHumanDetectConfigDto } from '../../../shared/api/human-detect-api/dto/response-human-detect-config-dto'
import type { RequestPutHumanDetectConfigDto } from '../../../shared/api/human-detect-api/dto/request-put-human-detect-config-dto'

interface HumanConfigProps {
  cctvId: number
}

export function useHumanConfig({ cctvId }: HumanConfigProps) {
  const [config, setConfig] = useState<ResponseHumanDetectConfigDto | null>(null)
  const [saveMessage, setSaveMessage] = useState<string>('')

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

  const updateConfig = async (updatedConfig: RequestPutHumanDetectConfigDto) => {
    if (!config) return

    setSaveMessage('')
    try {
      const configData: RequestPutHumanDetectConfigDto = {
        conf: updatedConfig.conf !== undefined ? updatedConfig.conf : config.conf,
        iou: updatedConfig.iou !== undefined ? updatedConfig.iou : config.iou,
        imgsz: updatedConfig.imgsz !== undefined ? updatedConfig.imgsz : config.imgsz,
        roiList: config.roiList
      }

      const result = await updateHumanDetectConfig(cctvId, configData)
      setConfig(result)
      setSaveMessage('설정이 성공적으로 저장되었습니다.(설정을 적용하기 위해 Pod를 재시작합니다.)')
      const podData = await deletePod('human-detect-module')
      console.log(podData)
      // 3초 후 메시지 제거
      setTimeout(() => {
        setSaveMessage('')
      }, 10000)

      return result
    } catch (error) {
      console.error('Error updating human detection config:', error)
      setSaveMessage('오류가 발생했습니다.')
      return null
    }
  }

  return {
    config,
    saveMessage,
    readConfig,
    updateConfig
  }
}
