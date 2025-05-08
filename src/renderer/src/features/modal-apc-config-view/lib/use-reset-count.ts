import { useEffect, useState } from 'react'
import { useApcConfig } from './apc-config-hook'

interface UseResetCountProps {
  areaId: number
}

export const useResetCount = ({ areaId }: UseResetCountProps) => {
  const { readConfig, updateApcCount } = useApcConfig({ areaId })
  const [countIn, setCountIn] = useState<number>(0)
  const [countOut, setCountOut] = useState<number>(0)
  const [countTotal, setCountTotal] = useState<number>(0)
  const [saveMessage, setSaveMessage] = useState<string>('')

  useEffect(() => {
    handleReadConfig(areaId)
  }, [areaId])

  const handleReadConfig = async (areaId: number) => {
    const result = await readConfig(areaId)
    if (result) {
      setCountIn(result.in)
      setCountOut(result.out)
      setCountTotal(result.total)
    }
  }

  const onChangeApcCount = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const value = parseInt(event.target.value) || 0
    if (value >= 0) {
      setter(value)
    }
  }

  const saveApcCount = async () => {
    setSaveMessage('')
    
    try {
      const result = await updateApcCount({
        areaId,
        in: countIn,
        out: countOut,
        total: countTotal
      })
      if (result) {
        handleReadConfig(areaId)
        setSaveMessage('APC 카운터가 성공적으로 저장되었습니다.')
      } else {
        setSaveMessage('APC 카운터 저장에 실패했습니다.')
      }
    } catch (error) {
      console.error('Failed to update APC count:', error)
      setSaveMessage('오류가 발생했습니다.')
    }
    
    // 3초 후 메시지 제거
    setTimeout(() => {
      setSaveMessage('')
    }, 3000)
  }

  return {
    countIn,
    countOut,
    countTotal,
    saveMessage,
    setCountIn,
    setCountOut,
    setCountTotal,
    onChangeApcCount,
    saveApcCount
  }
}
