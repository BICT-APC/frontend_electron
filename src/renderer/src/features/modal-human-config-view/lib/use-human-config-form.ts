import { useHumanConfig } from './human-config-hook'
import type { RequestPutHumanDetectConfigDto } from '../../../shared/api/human-detect-api/dto/request-put-human-detect-config-dto'

interface UseHumanConfigFormProps {
  cctvId: number
}

export function useHumanConfigForm({ cctvId }: UseHumanConfigFormProps) {
  const { config, saveMessage, updateConfig } = useHumanConfig({ cctvId })

  // 슬라이더 값 변경 핸들러
  const handleConfChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const value = parseFloat(e.target.value)
    if (!isNaN(value) && value >= 0 && value <= 1) {
      setter(value)
    }
  }

  const handleIouChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const value = parseFloat(e.target.value)
    if (!isNaN(value) && value >= 0 && value <= 1) {
      setter(value)
    }
  }

  // 직접 입력 값 변경 핸들러
  const handleConfInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const value = parseFloat(e.target.value)
    if (!isNaN(value) && value >= 0 && value <= 1) {
      setter(value)
    }
  }

  const handleIouInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const value = parseFloat(e.target.value)
    if (!isNaN(value) && value >= 0 && value <= 1) {
      setter(value)
    }
  }

  const handleImgszChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setter(parseInt(e.target.value))
  }

  // 설정 저장 핸들러
  const handleSaveConfig = async (confValue: number, iouValue: number, imgszValue: number) => {
    await updateConfig({
      conf: confValue,
      iou: iouValue,
      imgsz: imgszValue
    } as RequestPutHumanDetectConfigDto)
  }

  return {
    config,
    saveMessage,
    handleConfChange,
    handleIouChange,
    handleConfInputChange,
    handleIouInputChange,
    handleImgszChange,
    handleSaveConfig
  }
}
