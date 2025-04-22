import { useEffect } from 'react'
import Konva from 'konva'
import { cctvSelectStore } from '../../cctv-selecet-layer/model/cctv-selecet-store'
import { cctvConfigStore } from '../../cctv-config-button/model/cctv-config-store'
import { HumanDetectConfig, Roi } from '../../../shared/types/human-detect'
import { putHumanDetectRoiByCctvId } from '../../../shared/api'
import { humanDetectConfigStore } from '../../../entities/human-detect/human-detect-config-stroe'

interface UseRoi {
  humanDetectConfig: HumanDetectConfig
  size: {
    width: number
    height: number
  }
  refs: {
    layerRef: React.MutableRefObject<Konva.Layer | null>
    rectRef: React.MutableRefObject<Konva.Rect | null>
    groupRefs: React.MutableRefObject<(Konva.Group | null)[]>
    circleRefs: React.MutableRefObject<(Konva.Circle | null)[]>
  }
  states: {
    reSizedRegion: Roi[]
    setReSizedRegion: React.Dispatch<React.SetStateAction<Roi[]>>
    selectedPolyIndex: number | null
    setSelectedPolyIndex: React.Dispatch<React.SetStateAction<number | null>>
    creatingPolyIndex: number | null
    setCreatingPolyIndex: React.Dispatch<React.SetStateAction<number | null>>
  }
}

export const useRoi = ({ humanDetectConfig, size, refs, states }: UseRoi) => {
  const { conf, iou, imgsz, roiList, cctvId } = humanDetectConfig
  const { width, height } = size
  const originalWidth = 1920
  const originalHeight = 1080
  const { layerRef, rectRef, groupRefs, circleRefs } = refs
  const {
    reSizedRegion,
    setReSizedRegion,
    selectedPolyIndex,
    setSelectedPolyIndex,
    creatingPolyIndex,
    setCreatingPolyIndex
  } = states

  const { isRoiSetting, roiSaveFlag, setRoiSaveFlag } = cctvConfigStore()
  const { selectedCctvId } = cctvSelectStore()
  const { humanDetectConfigList, setHumanDetectConfigList } = humanDetectConfigStore()

  ////////////////
  useEffect(() => {
    if (!reSizedRegion) return
    if (cctvId !== selectedCctvId) return

    const newRegion = reSizedRegion.filter(
      (polygon, index) =>
        polygon.roi.length > 2 && index !== selectedPolyIndex && index !== creatingPolyIndex
    )

    if (reSizedRegion.length === newRegion.length) return

    setReSizedRegion([...newRegion])

    if (selectedPolyIndex === null && creatingPolyIndex !== null) {
      setCreatingPolyIndex(null)
    }
  }, [selectedCctvId])

  useEffect(() => {
    if (!roiSaveFlag) return
    const scaleX = width / originalWidth
    const scaleY = height / originalHeight

    const newRegion = reSizedRegion
      .filter((polygon) => polygon.roi.length > 2) // 길이가 2개 이하인 폴리곤은 필터링
      .map((polygon) => ({
        roi: polygon.roi.map((roiPoints, index) => ({
          x: roiPoints.x / scaleX,
          y: roiPoints.y / scaleY,
          orderIndex: index
        }))
      }))

    const saveRegionApi = async (newRegion: Roi[]) => {
      const results = await putHumanDetectRoiByCctvId(cctvId, {
        conf,
        iou,
        imgsz,
        roiList: newRegion
      })
      const newHumanDetectConfigList: HumanDetectConfig[] = humanDetectConfigList.map(
        (humanDetectConfig) => {
          if (humanDetectConfig.cctvId === results.cctvId) {
            return results
          } else {
            return humanDetectConfig
          }
        }
      )
      setHumanDetectConfigList(newHumanDetectConfigList)
    }
    saveRegionApi(newRegion)
    setRoiSaveFlag(false)
  }, [roiSaveFlag, setRoiSaveFlag])

  useEffect(() => {
    if (roiList) {
      const scaleX = width / originalWidth
      const scaleY = height / originalHeight
      const newReSizedRegion = roiList.map((polygon) => {
        const newPolygon = polygon.roi.map((point, index) => {
          const x = point.x * scaleX
          const y = point.y * scaleY
          return { x, y, orderIndex: index }
        })
        return { roi: newPolygon }
      })
      setReSizedRegion(newReSizedRegion)
      setSelectedPolyIndex(null)
      setCreatingPolyIndex(null)
    } else {
      setReSizedRegion([])
      setSelectedPolyIndex(null)
      setCreatingPolyIndex(null)
    }
  }, [
    roiList,
    selectedCctvId,
    width,
    height,
    isRoiSetting,
    setReSizedRegion,
    setSelectedPolyIndex,
    setCreatingPolyIndex
  ])

  useEffect(() => {
    if (!layerRef.current) {
      setSelectedPolyIndex(null)
      setCreatingPolyIndex(null)
      return
    }

    layerRef.current.moveToTop()

    if (selectedPolyIndex !== null) {
      if (rectRef.current) rectRef.current.moveToTop()
      groupRefs.current.forEach((item) => {
        if (item) item.moveToTop()
      })
      groupRefs.current[selectedPolyIndex]?.moveToTop()
      circleRefs.current.forEach((circleRef) => {
        circleRef?.moveToTop()
      })
    } else if (creatingPolyIndex !== null) {
      if (rectRef.current) rectRef.current.moveToTop()
      groupRefs.current[creatingPolyIndex]?.moveToTop()
      circleRefs.current.forEach((circleRef) => {
        circleRef?.moveToTop()
      })
    } else {
      if (rectRef.current) rectRef.current.moveToTop()
      groupRefs.current.forEach((item) => {
        if (item) item.moveToTop()
      })
    }
  }, [
    selectedPolyIndex,
    creatingPolyIndex,
    layerRef,
    rectRef,
    groupRefs,
    circleRefs,
    setSelectedPolyIndex,
    setCreatingPolyIndex
  ])
}
