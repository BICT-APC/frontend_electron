import { useState, useEffect } from 'react'
import { useApcConfig } from './apc-config-hook'

interface UseResetTimeProps {
  areaId: number
}

export function useResetTime({ areaId }: UseResetTimeProps) {
  const { updateApcEventResetTime, readApcEventConfig } = useApcConfig({ areaId })
  const [hours, setHours] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)
  const [saveMessage, setSaveMessage] = useState<string>('')

  // resetTime이 변경될 때 로컬 상태 업데이트
  useEffect(() => {
    handleReadResetTime(areaId)
  }, [areaId])

  const handleReadResetTime = async (areaId: number) => {
    const result = await readApcEventConfig(areaId)
    setHours(Number(result?.resetTime?.split(':')[0] || 0))
    setMinutes(Number(result?.resetTime?.split(':')[1] || 0))
    setSeconds(Number(result?.resetTime?.split(':')[2] || 0))
  }

  const handleSaveResetTime = async () => {
    setSaveMessage('')

    try {
      const newResetTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

      const result = await updateApcEventResetTime(areaId, newResetTime)
      if (result) {
        setSaveMessage('리셋 시간이 성공적으로 저장되었습니다.')
        console.log(newResetTime, result)
      } else {
        setSaveMessage('리셋 시간 저장에 실패했습니다.')
      }
    } catch (error) {
      console.error('Error saving reset time:', error)
      setSaveMessage('오류가 발생했습니다.')
    }

    // 3초 후 메시지 제거
    setTimeout(() => {
      setSaveMessage('')
    }, 3000)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>,
    max: number
  ) => {
    const value = parseInt(e.target.value) || 0
    if (value >= 0 && value <= max) {
      setter(value)
    }
  }

  return {
    hours,
    minutes,
    seconds,
    saveMessage,
    setHours,
    setMinutes,
    setSeconds,
    handleSaveResetTime,
    handleInputChange
  }
}
