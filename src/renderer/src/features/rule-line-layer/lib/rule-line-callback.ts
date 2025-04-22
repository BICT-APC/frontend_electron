// ✅ rule-line-callback.ts 다중 선 기능 + ROI 방식 참고 반영
import { useCallback, useRef } from 'react'
import { KonvaEventObject } from 'konva/lib/Node'
import { RuleLine } from '@renderer/shared/types/apc'

interface RuleLineCallback {
  states: {
    reSizedLineList: RuleLine[] | null,
    setReSizedLineList: React.Dispatch<React.SetStateAction<RuleLine[] | null>>
    isCreating: number | null,
    setIsCreating: React.Dispatch<React.SetStateAction<number | null>>,
    selectedLine: number | null,
    setSelectedLine: React.Dispatch<React.SetStateAction<number | null>>
    onPointDrag: boolean,
    setOnPointDrag: React.Dispatch<React.SetStateAction<boolean>>
  }
}
export const ruleLineCallback = ({states}: RuleLineCallback) => {
  const arrowRef = useRef<any>(null)

  const { 
    reSizedLineList,
    setReSizedLineList,
    isCreating,
    setIsCreating,
    selectedLine,
    setSelectedLine,
    onPointDrag,
    setOnPointDrag
  } = states

  const backgroundClickHandler = useCallback((event: KonvaEventObject<MouseEvent>) => {
    event.cancelBubble = true

    const stage = event.target.getStage()
    if (!stage) {
      return
    }

    const pointer = stage.getPointerPosition()
    if (!pointer) {
      return
    }

    const { x, y } = pointer

    if (selectedLine === null) {
      // 선 하나도 없을 경우
      if (!reSizedLineList || reSizedLineList.length === 0) {
        const newLine = [{ x, y, orderIndex: 0 }]
        setReSizedLineList([{ ruleLine: newLine }])
        setSelectedLine(null)
        setIsCreating(0) // ← 인덱스 지정
      } 
      // 현재 생성 중인 선이 있을 경우 → 점 하나 존재 상태에서 두 번째 점 찍기
      else if (isCreating !== null) {
        const updated = [...reSizedLineList]
        const currentLine = updated[isCreating].ruleLine
        if (currentLine.length === 1) {
          currentLine.push({ x, y, orderIndex: 1 })
          updated[isCreating] = {
            ruleLine: currentLine.map((p, i) => ({ ...p, orderIndex: i }))
          }
          setReSizedLineList(updated)
          setIsCreating(null)
          setSelectedLine(updated.length-1)
        }
      } 
      // 새 선 생성 시작
      else {
        const newLine = [{ x, y, orderIndex: 0 }]
        const updated = [...reSizedLineList, { ruleLine: newLine }]
        const newIndex = updated.length - 1
        setReSizedLineList(updated)
        setSelectedLine(null)
        setIsCreating(newIndex)
      }
    } else {
      // 선택 해제
      setSelectedLine(null)
    }
  }, [isCreating, selectedLine, reSizedLineList, setReSizedLineList, setSelectedLine, setIsCreating])

  const lineClickHandler = (index: number) => {
    if (!isCreating) {
      setSelectedLine(index)
    }
  }

  const pointDragMoveHandler = useCallback((
    event: KonvaEventObject<DragEvent>,
    pointIndex: number,
    lineIndex: number
  ) => {
    setOnPointDrag(true)
    const { x, y } = event.target.position()
    if (!reSizedLineList) {
      return
    }
    const updated = [...reSizedLineList]
    const targetLine = [...updated[lineIndex].ruleLine]
    targetLine[pointIndex] = { ...targetLine[pointIndex], x, y }
    updated[lineIndex] = { ...updated[lineIndex], ruleLine: targetLine }
    setReSizedLineList(updated)
  },[reSizedLineList])

  const pointDoubleClickHandler = (_event: KonvaEventObject<MouseEvent>, pointIndex: number, lineIndex: number) => {
    if (!reSizedLineList) {
      return
    }
    const updated = [...reSizedLineList]
    const targetLine = [...updated[lineIndex].ruleLine]
    targetLine.splice(pointIndex, 1)
    if (targetLine.length === 0) {
      updated.splice(lineIndex, 1)
      setReSizedLineList(updated)
      setSelectedLine(null)
      setIsCreating(null)
      return
    }
    updated[lineIndex] = {
      ...updated[lineIndex],
      ruleLine: targetLine.map((p, i) => ({ ...p, orderIndex: i }))
    }
    setReSizedLineList(updated)
  }

  const onDragEndHandler = useCallback(
    (event: KonvaEventObject<DragEvent>, lineIndex: number) => {
    if (onPointDrag) {
      setOnPointDrag(false)
      return
    }

    const { x: dx, y: dy } = event.target.position()
    if (!reSizedLineList) {
      return
    }
    const updated = [...reSizedLineList]
    const movedLine = updated[lineIndex].ruleLine.map(p => ({
      ...p,
      x: p.x + dx,
      y: p.y + dy
    }))
    updated[lineIndex] = { ...updated[lineIndex], ruleLine: movedLine }
    setReSizedLineList(updated)
    event.target.position({ x: 0, y: 0 })
  },[reSizedLineList])

  return {
    arrowRef,
    backgroundClickHandler,
    lineClickHandler,
    pointDragMoveHandler,
    pointDoubleClickHandler,
    onDragEndHandler
  }
}