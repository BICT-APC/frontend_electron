import { useCallback } from 'react'
import { apcConfigStore } from '../../../entities/apc/apc-config-store'
import { cctvStore } from '../../../entities/cctv/cctv-store'
import { humanDetectConfigStore } from '../../../entities/human-detect/human-detect-config-stroe'
import {
  getAllCctv,
  readApcConfigByCctvId,
  getHumanDetectConfigByCctvId
} from '../../../shared/api'

export const useFetchEntities = () => {
  const { setCctvList } = cctvStore()
  const { setApcConfigList } = apcConfigStore()
  const { setHumanDetectConfigList } = humanDetectConfigStore()

  // const parseTimeToObject = (timeStr: string): { hours: number; minutes: number; seconds: number } => {
  //   const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  //   return { hours, minutes, seconds };
  // };

  const fetchEntities = useCallback(async () => {
    try {
      const cctvResults = await getAllCctv()
      const cctvList = cctvResults.responseCctvDtoList

      // 1. CCTV 설정
      try {
        console.log(cctvList)
        setCctvList(cctvList)
      } catch (error) {
        console.error('Error setting cctv list:', error)
      }

      // 2. APC 설정 - 실패한 항목은 제외
      try {
        const apcPromises = cctvList.map((cctv) => readApcConfigByCctvId(cctv.id))

        const apcResults = await Promise.allSettled(apcPromises)

        const filteredApcResults = apcResults
          .filter((res) => res.status === 'fulfilled')
          .map((res: any) => ({
            ...res.value
          }))
        console.log('filteredApcResults', filteredApcResults)
        setApcConfigList(filteredApcResults)

        apcResults
          .filter((res) => res.status === 'rejected')
          .forEach((res: any, index) => {
            console.warn(`APC config failed for CCTV ID ${cctvList[index].id}:`, res.reason)
          })
      } catch (error) {
        console.error('Unexpected error fetching APC configs:', error)
      }

      // 3. HumanDetect 설정 - 실패한 항목은 제외
      try {
        const humanPromises = cctvList.map((cctv) => getHumanDetectConfigByCctvId(cctv.id))

        const humanResults = await Promise.allSettled(humanPromises)

        const filteredHumanResults = humanResults
          .filter((res) => res.status === 'fulfilled')
          .map((res: any) => res.value)

        setHumanDetectConfigList(filteredHumanResults)
        console.log(filteredHumanResults)
        humanResults
          .filter((res) => res.status === 'rejected')
          .forEach((res: any, index) => {
            console.warn(`HumanDetect config failed for CCTV ID ${cctvList[index].id}:`, res.reason)
          })
      } catch (error) {
        console.error('Unexpected error fetching HumanDetect configs:', error)
      }
    } catch (error) {
      console.error('Error fetching all entities:', error)
    }
  }, [setCctvList, setApcConfigList, setHumanDetectConfigList])

  return { fetchEntities }
}
