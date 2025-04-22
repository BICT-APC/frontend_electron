import { useEffect, useRef, useState } from 'react'
import { readApc } from '../../../shared/api'
import type { ResponseApcDto } from '../../../shared/api/apc-api/dto/response/response-apc-dto'

export function useApcData(areaIds: number[]) {
  const [apcData, setApcData] = useState<ResponseApcDto[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
    const fetchApcList = async () => {
      const results = await Promise.all(areaIds.map((id) => readApc(id)))
      setApcData(results)
    }

    fetchApcList()

    intervalRef.current = setInterval(fetchApcList, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [areaIds])

  return { apcData }
}
