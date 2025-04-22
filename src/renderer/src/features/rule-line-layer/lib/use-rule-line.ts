import { useEffect } from 'react'
import Konva from 'konva'
import { cctvSelectStore } from '../../cctv-selecet-layer/'
import { cctvConfigStore } from '../../cctv-config-button/'
import { ApcConfig, RuleLinePoints } from '../../../shared/types/apc'
import { updateRuleLineCctvId } from '../../../shared/api'
import { apcConfigStore } from '../../../entities/apc/apc-config-store'

interface UseRuleLine {
  ruleLine: RuleLinePoints[] | undefined
  cctvId: number
  size: { width: number; height: number }
  refs: {
    layerRef: React.MutableRefObject<Konva.Layer | null>
    rectRef: React.MutableRefObject<Konva.Rect | null>
    lineRef: React.MutableRefObject<Konva.Line | null>
    circleRefs: React.MutableRefObject<(Konva.Circle | null)[]>
  }
  states: {
    reSizedLine: RuleLinePoints[] | null
    setReSizedLine: React.Dispatch<React.SetStateAction<RuleLinePoints[] | null>>
    isCreating: boolean
    setIsCreating: React.Dispatch<React.SetStateAction<boolean>>
    selectedLine: boolean
    setSelectedLine: React.Dispatch<React.SetStateAction<boolean>>
  }
}

export const useRuleLine = ({ ruleLine, cctvId, size, refs, states }: UseRuleLine) => {
  const { width, height } = size
  const originalWidth = 1920
  const originalHeight = 1080
  const { layerRef, rectRef, lineRef, circleRefs } = refs
  const { reSizedLine, setReSizedLine, isCreating, setIsCreating, selectedLine, setSelectedLine } =
    states
  const { isRuleLineSetting, ruleLineSaveFlag, setRuleLineSaveFlag } = cctvConfigStore()
  const { selectedCctvId } = cctvSelectStore()
  // const { apcConfigList, setApcConfigList } = apcConfigStore()

  useEffect(() => {
    if (!ruleLine) {
      setReSizedLine(null)
      setIsCreating(false)
      setSelectedLine(false)
      return
    }

    const scaleX = width / originalWidth
    const scaleY = height / originalHeight
    const newReSizedLine = ruleLine.map((point, index) => ({
      x: point.x * scaleX,
      y: point.y * scaleY,
      orderIndex: index
    }))
    setReSizedLine(newReSizedLine)
    setIsCreating(false)
    setSelectedLine(false)
  }, [
    ruleLine,
    selectedCctvId,
    width,
    height,
    isRuleLineSetting,
    setReSizedLine,
    setIsCreating,
    setSelectedLine
  ])

  useEffect(() => {
    if (!layerRef.current) {
      setSelectedLine(false)
      setIsCreating(false)
      return
    }

    layerRef.current.moveToTop()
    if (selectedLine || isCreating) {
      if (rectRef.current) rectRef.current.moveToTop()
      if (lineRef.current) lineRef.current.moveToTop()
      circleRefs.current.forEach((circle) => circle?.moveToTop())
    }
  }, [
    selectedLine,
    isCreating,
    layerRef,
    rectRef,
    lineRef,
    circleRefs,
    setSelectedLine,
    setIsCreating
  ])

  // const parseTimeToObject = (timeStr: string): { hours: number; minutes: number; seconds: number } => {
  //   const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  //   return { hours, minutes, seconds };
  // };

  useEffect(() => {
    if (!ruleLineSaveFlag) return
    if (!reSizedLine || reSizedLine?.length < 2) {
      setRuleLineSaveFlag(false)
      return
    }

    const scaleX = width / originalWidth
    const scaleY = height / originalHeight

    const newLine = reSizedLine.map((ruleLinePoints, index) => ({
      x: ruleLinePoints.x / scaleX,
      y: ruleLinePoints.y / scaleY,
      orderIndex: index
    }))

    const saveRegionApi = async (newLine: RuleLinePoints[]) => {
      console.log(newLine, cctvId)
      // const result = await updateRuleLineCctvId(cctvId, { ruleLineList: newLine })
      // const newApcConfigList: ApcConfig[] = apcConfigList.map((apcConfig) => {
      //   if (apcConfig.cctvId === result.cctvId) {
      //     return {
      //       ...result

      //     }
      //   } else {
      //     return apcConfig
      //   }
      // })
      // setApcConfigList(newApcConfigList)
    }

    saveRegionApi(newLine)
    setRuleLineSaveFlag(false)
  }, [ruleLineSaveFlag, setRuleLineSaveFlag])
}
