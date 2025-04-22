import { useCallback, useRef, useState } from 'react'
import Konva from 'konva'
import { KonvaEventObject } from 'konva/lib/Node'
import { RuleLinePoints } from '../../../shared/types/apc'

export const ruleLineCallback = () => {
  const [reSizedLine, setReSizedLine] = useState<RuleLinePoints[] | null>(null)
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [selectedLine, setSelectedLine] = useState<boolean>(false)

  const [onPointDrag, setOnPointDrag] = useState<boolean>(false)

  const layerRef = useRef<Konva.Layer | null>(null)
  const rectRef = useRef<Konva.Rect | null>(null)
  const lineRef = useRef<Konva.Line | null>(null)
  const circleRefs = useRef<(Konva.Circle | null)[]>([])
  const arrowRef = useRef<Konva.Arrow | null>(null) // Arrow 참조 추가

  const backgroundClickHandler = useCallback(
    (event: KonvaEventObject<MouseEvent>) => {
      if (selectedLine) {
        setSelectedLine(false)
        return
      }

      const stage = event.target.getStage()
      const clickPosition = stage?.getPointerPosition()
      if (!clickPosition) return

      const clickX = clickPosition.x
      const clickY = clickPosition.y

      if (!isCreating) {
        setReSizedLine([{ x: clickX, y: clickY, orderIndex: 0 }])
        setIsCreating(true)
      } else if (reSizedLine && reSizedLine.length === 1) {
        const newLine = [...reSizedLine, { x: clickX, y: clickY, orderIndex: 1 }]
        setReSizedLine(newLine)
        setIsCreating(false)
      }
    },
    [reSizedLine, isCreating, selectedLine, setReSizedLine, setIsCreating, setSelectedLine]
  )

  const lineClickHandler = useCallback(() => {
    if (!isCreating) setSelectedLine(true)
  }, [isCreating, setSelectedLine])

  const pointDragMoveHandler = useCallback(
    (event: KonvaEventObject<DragEvent>, pointIndex: number) => {
      if (!reSizedLine) return
      setOnPointDrag(true)

      const x = event.target.x()
      const y = event.target.y()
      const newLine = [...reSizedLine]
      newLine[pointIndex] = { x, y, orderIndex: pointIndex }
      setReSizedLine(newLine)
    },
    [reSizedLine, setReSizedLine]
  )

  const pointDragEndHandler = useCallback(() => {
    setOnPointDrag(false)
  }, [])

  const pointDoubleClickHandler = useCallback(
    (event: KonvaEventObject<MouseEvent>, pointIndex: number) => {
      if (!reSizedLine) return
      event.cancelBubble = true

      const newLine = reSizedLine.filter((_, index) => index !== pointIndex)
      setReSizedLine(newLine.length > 0 ? newLine : null)
      setSelectedLine(false)
      setIsCreating(newLine.length === 1)
    },
    [reSizedLine, setReSizedLine, setSelectedLine, setIsCreating]
  )

  const lineDragMoveHandler = useCallback(
    (event: KonvaEventObject<DragEvent>) => {
      if (!reSizedLine || onPointDrag) return

      const dx = event.target.x()
      const dy = event.target.y()

      // Circle 실시간 위치 업데이트
      circleRefs.current.forEach((circle, index) => {
        if (circle && reSizedLine[index]) {
          circle.x(reSizedLine[index].x + dx)
          circle.y(reSizedLine[index].y + dy)
        }
      })

      // Arrow 실시간 위치 업데이트
      if (arrowRef.current && reSizedLine.length === 2) {
        const pointA = reSizedLine[0]
        const pointB = reSizedLine[1]
        const midX = (pointA.x + dx + pointB.x + dx) / 2
        const midY = (pointA.y + dy + pointB.y + dy) / 2

        const abX = pointB.x - pointA.x
        const abY = pointB.y - pointA.y
        const arrowDX = abY
        const arrowDY = -abX

        const arrowLength = 40
        const magnitude = Math.sqrt(arrowDX ** 2 + arrowDY ** 2) || 1
        const normalizedDX = (arrowDX / magnitude) * arrowLength
        const normalizedDY = (arrowDY / magnitude) * arrowLength

        const arrowEndX = midX + normalizedDX
        const arrowEndY = midY + normalizedDY

        arrowRef.current.points([midX, midY, arrowEndX, arrowEndY])
      }
    },
    [reSizedLine, onPointDrag]
  )

  const lineDragEndHandler = useCallback(
    (event: KonvaEventObject<DragEvent>) => {
      if (!reSizedLine || onPointDrag) return

      const dx = event.target.x()
      const dy = event.target.y()

      const newLine = reSizedLine.map((point) => ({
        ...point,
        x: point.x + dx,
        y: point.y + dy
      }))

      setReSizedLine(newLine)
      event.target.position({ x: 0, y: 0 }) // 드래그 종료 후 위치 초기화
    },
    [reSizedLine, setReSizedLine, onPointDrag]
  )

  return {
    backgroundClickHandler,
    lineClickHandler,
    pointDragMoveHandler,
    pointDragEndHandler,
    pointDoubleClickHandler,
    lineDragMoveHandler,
    lineDragEndHandler,
    layerRef,
    rectRef,
    lineRef,
    circleRefs,
    arrowRef, // Arrow 참조 추가
    reSizedLine,
    setReSizedLine,
    isCreating,
    setIsCreating,
    selectedLine,
    setSelectedLine
  }
}
