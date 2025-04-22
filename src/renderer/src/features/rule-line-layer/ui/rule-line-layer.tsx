import { useRef } from 'react'
import { Circle, Layer, Line, Rect, Stage, Arrow } from 'react-konva'
import { cctvConfigStore } from '../../cctv-config-button/model/cctv-config-store'
import { cctvSelectStore } from '../../cctv-selecet-layer/model/cctv-selecet-store'
import styles from './rule-line-layer.module.css'
import { useResizeObserver } from 'usehooks-ts'
import { useRuleLine } from '../lib/use-rule-line'
import { ruleLineCallback } from '../lib/rule-line-callback'
import { ApcConfig } from '../../../shared/types/apc'

interface RuleLineLayerProps {
  apcConfig: ApcConfig
}

export const RuleLineLayer = ({ apcConfig }: RuleLineLayerProps) => {
  const ruleLine = apcConfig.ruleLine
  const cctvId = apcConfig.cctvId

  const { selectedCctvId } = cctvSelectStore()
  const { isRuleLineSetting } = cctvConfigStore()

  const ref = useRef<HTMLDivElement | null>(null)

  const { width = 0, height = 0 } = useResizeObserver({ ref: ref as React.RefObject<HTMLElement> })

  const {
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
  } = ruleLineCallback()

  useRuleLine({
    ruleLine,
    cctvId,
    size: { width, height },
    refs: { layerRef, rectRef, lineRef, circleRefs },
    states: {
      reSizedLine,
      setReSizedLine,
      isCreating,
      setIsCreating,
      selectedLine,
      setSelectedLine
    }
  })

  const stroke = '#ffff00'
  const strokeWidth = selectedCctvId === cctvId ? (selectedLine ? 4 : 2) : 1

  const getArrowPoints = (dx = 0, dy = 0) => {
    if (!reSizedLine || reSizedLine.length < 2) return null

    const pointA = reSizedLine[0]
    const pointB = reSizedLine[1]
    const midX = (pointA.x + dx + pointB.x + dx) / 2
    const midY = (pointA.y + dy + pointB.y + dy) / 2

    const abX = pointB.x - pointA.x
    const abY = pointB.y - pointA.y

    const arrowDX = abY // 시계 방향 90도 회전
    const arrowDY = -abX

    const arrowLength = 40
    const magnitude = Math.sqrt(arrowDX ** 2 + arrowDY ** 2) || 1
    const normalizedDX = (arrowDX / magnitude) * arrowLength
    const normalizedDY = (arrowDY / magnitude) * arrowLength

    const arrowEndX = midX + normalizedDX
    const arrowEndY = midY + normalizedDY

    return [midX, midY, arrowEndX, arrowEndY]
  }

  return (
    <div
      className={styles.wrapper}
      key={`${cctvId}-ruleLine-wrapper`}
      style={selectedCctvId === cctvId && isRuleLineSetting ? { zIndex: 100 } : undefined}
      ref={ref}
    >
      <Stage key={`${cctvId}-stage`} width={width} height={height}>
        <Layer ref={layerRef} key={`${cctvId}-layer`}>
          <Rect
            ref={rectRef}
            width={width}
            height={height}
            fill="transparent"
            onClick={backgroundClickHandler}
          />
          {reSizedLine && reSizedLine.length > 0 && (
            <>
              <Line
                ref={lineRef}
                points={reSizedLine.map((point) => [point.x, point.y]).flat()}
                stroke={stroke}
                strokeWidth={strokeWidth}
                hitStrokeWidth={10}
                draggable={!isCreating}
                onClick={lineClickHandler}
                onDragMove={lineDragMoveHandler} // Circle과 Arrow 실시간 업데이트
                onDragEnd={lineDragEndHandler}
              />
              {(selectedLine || isCreating) &&
                reSizedLine.map((point, index) => (
                  <Circle
                    ref={(ref) => {
                      circleRefs.current[index] = ref
                    }}
                    key={`${cctvId}-${index}-circle`}
                    x={point.x}
                    y={point.y}
                    radius={10}
                    stroke={stroke}
                    fill="#fff"
                    draggable
                    onDragMove={(event) => pointDragMoveHandler(event, index)}
                    onDragEnd={pointDragEndHandler}
                    onDblClick={(event) => pointDoubleClickHandler(event, index)}
                  />
                ))}
              {getArrowPoints() && (
                <Arrow
                  ref={arrowRef} // Arrow 참조 추가
                  points={getArrowPoints()!}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  pointerLength={10}
                  pointerWidth={10}
                  fill={stroke}
                />
              )}
            </>
          )}
        </Layer>
      </Stage>
    </div>
  )
}
