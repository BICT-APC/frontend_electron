import { useCallback } from 'react'
import { apcConfigStore } from '../../../entities/apc/apc-config-store'
import { cctvStore } from '../../../entities/cctv/cctv-store'
import { humanDetectConfigStore } from '../../../entities/human-detect/human-detect-config-stroe'
import {
  readAllArea,
  readAllCctv,
  readApcConfig,
  readEventConfig,
  readHumanDetectConfig
} from '../../../shared/api'

export const useFetchEntities = () => {
  const { setCctvList, setAreaList } = cctvStore()
  const { setApcConfigList, setEventConfigList } = apcConfigStore()
  const { setHumanDetectConfigList } = humanDetectConfigStore()

  // const parseTimeToObject = (timeStr: string): { hours: number; minutes: number; seconds: number } => {
  //   const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  //   return { hours, minutes, seconds };
  // };

  const fetchEntities = useCallback(async () => {
    try {
      const cctvResults = await readAllCctv();
      const areaResults = await readAllArea();

      const cctvList = cctvResults.responseCctvDtoList;
      const areaList = areaResults.responseAreaDtoList;

      // 1. CCTV 설정
      try {
        setCctvList(cctvList)
      } catch (error) {
        console.error('Error setting cctv list:', error)
      }

      try {
        setAreaList(areaList)
      } catch (error) {
        console.error('Error setting cctv list:', error)
      }

      // 2. APC 설정 - 실패한 항목은 제외
      try {
        const apcConfigPromises = cctvList.map((cctv) => readApcConfig(cctv.id))
        const eventConfigPromises = areaList.map((area) => readEventConfig(area.id))

        const apcConfigResults = await Promise.allSettled(apcConfigPromises)
        const eventConfigResults = await Promise.allSettled(eventConfigPromises)

        const filteredApcConfigResults = apcConfigResults
          .filter((res) => res.status === 'fulfilled')
          .map((res: any) => ({
            ...res.value
          }))
        setApcConfigList(filteredApcConfigResults)

        apcConfigResults
          .filter((res) => res.status === 'rejected')
          .forEach((res: any, index) => {
            console.warn(`APC config failed for CCTV ID ${cctvList[index].id}:`, res.reason)
          })
        
        const filteredEventConfigResults = eventConfigResults
          .filter((res) => res.status === 'fulfilled')
          .map((res: any) => ({
            ...res.value
          }))
        setEventConfigList(filteredEventConfigResults)

        eventConfigResults
          .filter((res) => res.status === 'rejected')
          .forEach((res: any, index) => {
            console.warn(`APC config failed for CCTV ID ${cctvList[index].id}:`, res.reason)
          })
      } catch (error) {
        console.error('Unexpected error fetching APC configs:', error)
      }

      // 3. HumanDetect 설정 - 실패한 항목은 제외
      try {
        const humanPromises = cctvList.map((cctv) => readHumanDetectConfig(cctv.id))

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
