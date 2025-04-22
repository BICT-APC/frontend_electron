import { useEffect } from 'react'
import Konva from 'konva'
import { cctvSelectStore } from '../../cctv-selecet-layer/'
import { cctvConfigStore } from '../../cctv-config-button/'
import { RuleLine } from '../../../shared/types/apc'
import { updateRuleLine } from '../../../shared/api'
import { apcConfigStore } from '../../../entities/apc/apc-config-store'
import { ruleLineStore } from '../model/rule-line-store'

interface UseRuleLine {
  ruleLineList: RuleLine[] | undefined
  cctvId: number
  size: { width: number; height: number }
  refs: {
    layerRef: React.RefObject<Konva.Layer | null>
    rectRef: React.RefObject<Konva.Rect | null>
    lineRef: React.RefObject<Konva.Line | null>
    circleRefs: React.RefObject<(Konva.Circle | null)[]>
  }
}

export const useRuleLine = ({ ruleLineList, cctvId, size, refs }: UseRuleLine) => {
  const { width, height } = size
  const originalWidth = 1920
  const originalHeight = 1080

  const { layerRef, rectRef, lineRef, circleRefs } = refs

  const {
    reSizedLineList,
    setReSizedLineList,
    isCreating,
    setIsCreating,
    selectedLine,
    setSelectedLine
  } = ruleLineStore();
  const { ruleLineSaveFlag, setRuleLineSaveFlag } = cctvConfigStore();
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
    setIsCreating(false)
    setSelectedLine(null)
  }, [ruleLineList, width, height, selectedCctvId])

  useEffect(() => {
    if (!layerRef.current) {
      return
    }
    layerRef.current.moveToTop()
    if (selectedLine) {
      rectRef.current?.moveToTop()
      lineRef.current?.moveToTop()
      circleRefs.current.forEach((circle) => circle?.moveToTop())
    }
  }, [selectedLine, isCreating])

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
}
