// ✅ rule-line-callback.ts 다중 선 기능 완전 구현
import { useRef } from 'react'
import { KonvaEventObject } from 'konva/lib/Node'
import { ruleLineStore } from '../model/rule-line-store'

export const ruleLineCallback = () => {
  const arrowRef = useRef<any>(null)

  const {
    isCreating,
    reSizedLineList,
    setReSizedLineList,
    selectedLine,
    setSelectedLine
  } = ruleLineStore()

  const backgroundClickHandler = (event: KonvaEventObject<MouseEvent>) => {
    const { reSizedLineList, setReSizedLineList, isCreating, setIsCreating, selectedLine, setSelectedLine } = ruleLineStore.getState()
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
      if ( reSizedLineList === null ) {
        const newLine = [{ x, y, orderIndex: 0 }]
        setReSizedLineList([{ ruleLine: newLine }])
        setSelectedLine(0)
        setIsCreating(true)
      } else {
        if (isCreating) {
          const updated = [...reSizedLineList]
          const currentLine = updated[updated.length - 1].ruleLine
          if (currentLine.length < 2) {
            currentLine.push({ x, y, orderIndex: 1 })
            updated[updated.length - 1] = { ruleLine: currentLine }
            setReSizedLineList(updated)
            setIsCreating(false)
            setSelectedLine(null)
          }
        } else {
          const newLine = [{ x, y, orderIndex: 0 }]
          const updated = [...reSizedLineList, { ruleLine: newLine }]
          setReSizedLineList(updated)
          setSelectedLine(updated.length - 1)
          setIsCreating(true)
        }
      }
    } else {
      setSelectedLine(null)
    }
  }

  const lineClickHandler = (index: number) => {
    setSelectedLine(index)
  }

  const pointDragMoveHandler = (
    event: KonvaEventObject<DragEvent>,
    pointIndex: number,
    lineIndex: number
  ) => {
    const { x, y } = event.target.position()
    if (!reSizedLineList) {
      return
    }
    const updated = [...reSizedLineList]
    const targetLine = [...updated[lineIndex].ruleLine]
    targetLine[pointIndex] = { ...targetLine[pointIndex], x, y }
    updated[lineIndex] = { ...updated[lineIndex], ruleLine: targetLine }
    setReSizedLineList(updated)
  }

  const pointDragEndHandler = (event: KonvaEventObject<DragEvent>, pointIndex: number, lineIndex: number) => {
    // 포인트 드래그 끝났을 때 동작 (예: 로그 찍기 등)
    console.log(`Point ${pointIndex} of line ${lineIndex} drag ended at`, event.target.position())
  }

  const pointDoubleClickHandler = (_event: KonvaEventObject<MouseEvent>, pointIndex: number, lineIndex: number) => {
    // 포인트 더블클릭 시 삭제
    if (!reSizedLineList) {
      return
    }
    const updated = [...reSizedLineList]
    const targetLine = [...updated[lineIndex].ruleLine]
    if (targetLine.length <= 2) {
      return
    }// 2개 이하는 삭제 불가
    targetLine.splice(pointIndex, 1)
    updated[lineIndex] = { ...updated[lineIndex], ruleLine: targetLine }
    setReSizedLineList(updated)
  }

  const lineDragMoveHandler = (event: KonvaEventObject<DragEvent>, lineIndex: number) => {
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
    event.target.position({ x: 0, y: 0 }) // 위치 초기화 (Konva Drag offset 보정)
  }

  const lineDragEndHandler = (_event: KonvaEventObject<DragEvent>, lineIndex: number) => {
    // 라인 이동 완료 시 로그 출력
    console.log(`Line ${lineIndex} drag ended`)
  }

  return {
    arrowRef,
    backgroundClickHandler,
    lineClickHandler,
    pointDragMoveHandler,
    pointDragEndHandler,
    pointDoubleClickHandler,
    lineDragMoveHandler,
    lineDragEndHandler
  }
}  
