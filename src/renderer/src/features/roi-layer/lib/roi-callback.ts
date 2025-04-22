import { useCallback, useState, useRef } from 'react'
import Konva from 'konva'
import { KonvaEventObject } from 'konva/lib/Node'
import { Shape, ShapeConfig } from 'konva/lib/Shape'
import { Context } from 'konva/lib/Context'

import { Roi, RoiPoints } from '../../../shared/types/human-detect'

export const roiCallback = () => {
  const [reSizedRegion, setReSizedRegion] = useState<Roi[]>([])
  const [selectedPolyIndex, setSelectedPolyIndex] = useState<number | null>(null)
  const [creatingPolyIndex, setCreatingPolyIndex] = useState<number | null>(null)
  const [onPointDrag, setOnPointDrag] = useState<boolean>(false)

  const layerRef = useRef<Konva.Layer | null>(null)
  const rectRef = useRef<Konva.Rect | null>(null)
  const groupRefs = useRef<(Konva.Group | null)[]>([])
  const circleRefs = useRef<(Konva.Circle | null)[]>([])

  const backgroundClickHandler = useCallback(
    (event: KonvaEventObject<MouseEvent>) => {
      if (!reSizedRegion) return
      if (selectedPolyIndex !== null) setSelectedPolyIndex(null)
      else {
        if (!reSizedRegion) return
        const stage = event.target.getStage()
        const clickPosition = stage?.getPointerPosition()
        if (!clickPosition) return
        const clickX = clickPosition.x
        const clickY = clickPosition.y
        let newRegion = [...reSizedRegion]
        if (!creatingPolyIndex) {
          newRegion.push({ roi: [{ x: clickX, y: clickY, orderIndex: 0 }] })
          setReSizedRegion(newRegion)
          setCreatingPolyIndex(reSizedRegion.length)
        } else {
          if (newRegion[creatingPolyIndex].roi.length === 1) {
            newRegion[creatingPolyIndex].roi.push({ x: clickX, y: clickY, orderIndex: 1 })
            setReSizedRegion(newRegion)
          } else {
            let closestIndex = -1
            let minDistance = Infinity
            for (let i = 0; i < newRegion[creatingPolyIndex].roi.length; i++) {
              const startPoint = newRegion[creatingPolyIndex].roi[i]
              const nextIndex = i + 1 >= newRegion[creatingPolyIndex].roi.length ? 0 : i + 1
              const endPoint = newRegion[creatingPolyIndex].roi[nextIndex]
              const distance = pointToSegmentDistance(clickX, clickY, startPoint, endPoint)
              if (distance < minDistance) {
                minDistance = distance
                closestIndex = i
              }
            }
            if (closestIndex !== -1) {
              newRegion[creatingPolyIndex].roi.splice(closestIndex + 1, 0, {
                x: clickX,
                y: clickY,
                orderIndex: closestIndex + 1
              })
            }
            ////////////
            newRegion[creatingPolyIndex].roi = newRegion[creatingPolyIndex].roi.map(
              (point, index) => ({
                ...point,
                orderIndex: index
              })
            )
            /////////////////
            setReSizedRegion(newRegion)
          }
        }
      }
    },
    [reSizedRegion, creatingPolyIndex, selectedPolyIndex]
  )

  const pointToSegmentDistance = (px: number, py: number, start: RoiPoints, end: RoiPoints) => {
    const x1 = start.x,
      y1 = start.y
    const x2 = end.x,
      y2 = end.y

    const A = px - x1
    const B = py - y1
    const C = x2 - x1
    const D = y2 - y1

    const dot = A * C + B * D
    const len_sq = C * C + D * D
    let param = -1

    if (len_sq !== 0) param = dot / len_sq

    let xx, yy

    if (param < 0) {
      xx = x1
      yy = y1
    } else if (param > 0.999) {
      xx = x2
      yy = y2
    } else {
      xx = x1 + param * C
      yy = y1 + param * D
    }

    const dx = px - xx
    const dy = py - yy
    return Math.sqrt(dx * dx + dy * dy)
  }

  const groupDragEndHandler = useCallback(
    (event: KonvaEventObject<DragEvent>, polyIndex: number) => {
      if (onPointDrag) {
        setOnPointDrag(false)
        return
      }
      if (!reSizedRegion) return
      let newRegion = [...reSizedRegion]
      newRegion[polyIndex].roi = newRegion[polyIndex].roi.map((point) => ({
        x: point.x + event.target.x(),
        y: point.y + event.target.y(),
        orderIndex: point.orderIndex
      }))
      setReSizedRegion(newRegion)
      event.target.position({ x: 0, y: 0 })
    },
    [reSizedRegion, onPointDrag]
  )

  const groupDoubleClickHandler = useCallback(
    (polyIndex: number) => {
      if (polyIndex === creatingPolyIndex) {
        setCreatingPolyIndex(null)
      }
    },
    [creatingPolyIndex, reSizedRegion]
  )

  const polygonClickHandler = useCallback(
    (polyIndex: number) => {
      setSelectedPolyIndex(polyIndex)
      if (creatingPolyIndex !== null) setCreatingPolyIndex(null)
    },
    [creatingPolyIndex]
  )

  const lineSceneFunc = (context: Context, shape: Shape<ShapeConfig>, polygon: RoiPoints[]) => {
    context.beginPath()
    polygon.forEach((point, index) => {
      if (index === 0) context.moveTo(point.x, point.y)
      else context.lineTo(point.x, point.y)
    })
    context.closePath()
    context.fillStrokeShape(shape)
  }

  const lineDoubleClickHandler = useCallback(
    (event: KonvaEventObject<MouseEvent>, polyIndex: number) => {
      if (!reSizedRegion || creatingPolyIndex !== null) return

      const stage = event.target.getStage()
      const clickPosition = stage?.getPointerPosition()
      if (!clickPosition) return

      const clickX = clickPosition.x
      const clickY = clickPosition.y
      const polygon = reSizedRegion[polyIndex]

      let isPointOnAnyLine = false
      let newPolygon = { ...polygon } // 복사

      for (let i = 0; i < polygon.roi.length; i++) {
        const startPoint = polygon.roi[i]
        const nextIndex = i + 1 >= polygon.roi.length ? 0 : i + 1
        const endPoint = polygon.roi[nextIndex]

        const isOnLineSegment = isPointOnLineSegment(startPoint, endPoint, {
          x: clickX,
          y: clickY,
          orderIndex: i + 1
        })
        if (isOnLineSegment) {
          isPointOnAnyLine = true

          // 점 삽입
          newPolygon.roi.splice(i + 1, 0, { x: clickX, y: clickY, orderIndex: i + 1 })
          newPolygon.roi = newPolygon.roi.map((point, index) => ({
            ...point,
            orderIndex: index
          }))

          const newRegion = [...reSizedRegion]
          newRegion[polyIndex] = newPolygon
          setReSizedRegion(newRegion)
          break
        }
      }

      if (!isPointOnAnyLine) {
        const newRegion = [...reSizedRegion]
        newRegion.splice(polyIndex, 1)
        setReSizedRegion(newRegion)
        setSelectedPolyIndex(null)
        setCreatingPolyIndex(null)
      }
    },
    [reSizedRegion, creatingPolyIndex]
  )

  const isPointOnLineSegment = (start: RoiPoints, end: RoiPoints, point: RoiPoints) => {
    const lineLength = Math.hypot(end.x - start.x, end.y - start.y)
    const distanceToStart = Math.hypot(point.x - start.x, point.y - start.y)
    const distanceToEnd = Math.hypot(point.x - end.x, point.y - end.y)
    const isOnLine = Math.abs(distanceToStart + distanceToEnd - lineLength) <= 3
    return isOnLine
  }

  const pointDoubleClickHandler = useCallback(
    (event: KonvaEventObject<MouseEvent>, pointIndex: number, polyIndex: number) => {
      if (!circleRefs.current[pointIndex]) return
      if (!reSizedRegion) return
      event.cancelBubble = true
      let newRegion = [...reSizedRegion]
      newRegion[polyIndex].roi.splice(pointIndex, 1)
      if (newRegion[polyIndex].roi.length === 0) {
        setSelectedPolyIndex(null)
        setCreatingPolyIndex(null)
      }
      ////////////
      newRegion[polyIndex].roi = newRegion[polyIndex].roi.map((point, index) => ({
        ...point,
        orderIndex: index
      }))
      /////////////////
      setReSizedRegion(newRegion)
    },
    [reSizedRegion]
  )

  const pointDragMoveHandler = useCallback(
    (event: KonvaEventObject<DragEvent>, pointIndex: number, polyIndex: number) => {
      setOnPointDrag(true)
      if (!reSizedRegion) return
      const x = event.target.x()
      const y = event.target.y()
      let newRegion = [...reSizedRegion]
      newRegion[polyIndex].roi[pointIndex] = {
        x,
        y,
        orderIndex: newRegion[polyIndex].roi[pointIndex].orderIndex
      }
      setReSizedRegion(newRegion)
    },
    [reSizedRegion]
  )

  return {
    backgroundClickHandler,
    groupDragEndHandler,
    groupDoubleClickHandler,
    polygonClickHandler,
    lineSceneFunc,
    lineDoubleClickHandler,
    pointDoubleClickHandler,
    pointDragMoveHandler,
    layerRef,
    rectRef,
    groupRefs,
    circleRefs,
    reSizedRegion,
    setReSizedRegion,
    selectedPolyIndex,
    setSelectedPolyIndex,
    creatingPolyIndex,
    setCreatingPolyIndex
  }
}
