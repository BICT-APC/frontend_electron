import { useEffect } from 'react'
import Konva from 'konva'
import { cctvSelectStore } from '../../cctv-selecet-layer/'
import { cctvConfigStore } from '../../cctv-config-button/'
import { RuleLine } from '../../../shared/types/apc'
import { updateRuleLine } from '../../../shared/api'
import { apcConfigStore } from '../../../entities/apc/apc-config-store'

interface UseRuleLine {
  ruleLineList: RuleLine[] | undefined
  cctvId: number
  size: { width: number; height: number }
  refs: {
    layerRef: React.RefObject<Konva.Layer | null>
    rectRef: React.RefObject<Konva.Rect | null>
    groupRefs: React.RefObject<(Konva.Group | null)[]>
    circleRefs: React.RefObject<(Konva.Circle | null)[]>
  },
  states: {
    reSizedLineList: RuleLine[] | null,
    setReSizedLineList: React.Dispatch<React.SetStateAction<RuleLine[] | null>>
    isCreating: number | null,
    setIsCreating: React.Dispatch<React.SetStateAction<number | null>>,
    selectedLine: number | null,
    setSelectedLine: React.Dispatch<React.SetStateAction<number | null>>
  }
}

export const useRuleLine = ({ ruleLineList, cctvId, size, refs, states }: UseRuleLine) => {
  const { width, height } = size
  const { 
    reSizedLineList,
    setReSizedLineList,
    isCreating,
    setIsCreating,
    selectedLine,
    setSelectedLine
  } = states
  const originalWidth = 1920
  const originalHeight = 1080

  const { layerRef, rectRef, groupRefs, circleRefs } = refs
  const { isRuleLineSetting, ruleLineSaveFlag, setRuleLineSaveFlag } = cctvConfigStore();
  const { selectedCctvId } = cctvSelectStore()
  const { apcConfigList, setApcConfigList } = apcConfigStore()

  useEffect(() => {
    if (!ruleLineList) {
      return
    }
    const scaleX = width / originalWidth
    const scaleY = height / originalHeight

    const resizedList = ruleLineList.map((lineObj) => ({
      ruleLine: lineObj.ruleLine.map((p, i) => ({
        x: p.x * scaleX,
        y: p.y * scaleY,
        orderIndex: i
      }))
    }))
    setReSizedLineList(resizedList)
    setIsCreating(null)
    setSelectedLine(null)
  }, [ruleLineList, width, height, selectedCctvId, ruleLineSaveFlag, isRuleLineSetting])

  useEffect(() => {
    if (!layerRef.current) {
      return
    }
  
    // 항상 레이어 맨 위로 올림
    layerRef.current.moveToTop()
  
    // 선택된 선이 있을 경우
    if (selectedLine !== null) {
      rectRef.current?.moveToTop()
      groupRefs.current[selectedLine]?.moveToTop()
      circleRefs.current.forEach((circle) => circle?.moveToTop())
    } 
    // 새로 생성 중인 경우
    else if (isCreating) {
      rectRef.current?.moveToTop()
      groupRefs.current.forEach((group) => group?.moveToTop())
      circleRefs.current.forEach((circle) => circle?.moveToTop())
    } 
    // 아무 것도 선택 안된 경우
    else {
      rectRef.current?.moveToTop()
      groupRefs.current.forEach((group) => group?.moveToTop())
    }
  }, [selectedLine, isCreating, groupRefs, circleRefs])

  useEffect(() => {
    if (!ruleLineSaveFlag) {
      return
    }
    if (!reSizedLineList || reSizedLineList.length === 0) {
      setRuleLineSaveFlag(false)
      return
    }

    const scaleX = width / originalWidth
    const scaleY = height / originalHeight

    const newLineList = reSizedLineList.map((ruleLineObj) => ({
      ruleLine: ruleLineObj.ruleLine.map((p, i) => ({
        x: p.x / scaleX,
        y: p.y / scaleY,
        orderIndex: i
      }))
    }))

    const save = async () => {
      const result = await updateRuleLine(cctvId, { ruleLineList: newLineList })
      const updated = apcConfigList.map((cfg) =>
        cfg.cctvId === result.cctvId ? { ...result } : cfg
      )
      setApcConfigList(updated)
    }

    save()
    setRuleLineSaveFlag(false)
  }, [ruleLineSaveFlag])

  useEffect(() => {
    if (!reSizedLineList) {
      return
    }
  
    const filtered = reSizedLineList.filter(line => line.ruleLine.length > 0)
    if (filtered.length !== reSizedLineList.length) {
      setReSizedLineList(filtered)
    }
  }, [reSizedLineList])


}
