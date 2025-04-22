import { useRef } from 'react'
import { Circle, Layer, Line, Rect, Stage, Arrow } from 'react-konva'
import { cctvConfigStore } from '../../cctv-config-button/model/cctv-config-store'
import { cctvSelectStore } from '../../cctv-selecet-layer/model/cctv-selecet-store'
import styles from './rule-line-layer.module.css'
import { useResizeObserver } from 'usehooks-ts'
import { useRuleLine } from '../lib/use-rule-line'
import { ruleLineCallback } from '../lib/rule-line-callback'
import { ApcConfig } from '../../../shared/types/apc'
import Konva from 'konva'
import { ruleLineStore } from '../model/rule-line-store'

interface RuleLineLayerProps {
  apcConfig: ApcConfig
}

export const RuleLineLayer = ({ apcConfig }: RuleLineLayerProps) => {
  const layerRef = useRef<Konva.Layer | null>(null)
  const rectRef = useRef<Konva.Rect | null>(null)
  const lineRef = useRef<Konva.Line | null>(null)
  const circleRefs = useRef<(Konva.Circle | null)[]>([])

  const { cctvId, ruleLineList } = apcConfig;

  const { selectedCctvId } = cctvSelectStore()
  const { isRuleLineSetting } = cctvConfigStore()
  const { 
    reSizedLineList,
    isCreating,
    selectedLine
  } = ruleLineStore();

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
    arrowRef, // Arrow 참조 추가
  } = ruleLineCallback()

  useRuleLine({
    ruleLineList,
    cctvId,
    size: { width, height },
    refs: { layerRef, rectRef, lineRef, circleRefs },
  })

  const stroke = '#ffff00'
  // const strokeWidth = selectedCctvId === cctvId ? (selectedLine ? 4 : 2) : 1/

  const getArrowPoints = (line: any[]) => {
    if (line.length < 2) {
      return null
    }
    const [a, b] = line
    const midX = (a.x + b.x) / 2
    const midY = (a.y + b.y) / 2
    const abX = b.x - a.x
    const abY = b.y - a.y
    const arrowDX = abY
    const arrowDY = -abX
    const len = 40
    const mag = Math.sqrt(arrowDX ** 2 + arrowDY ** 2) || 1
    const ndx = (arrowDX / mag) * len
    const ndy = (arrowDY / mag) * len
    return [midX, midY, midX + ndx, midY + ndy]
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

          {reSizedLineList?.map((lineObj, lineIndex) => (
            <>
              <Line
                key={`line-${cctvId}-${lineIndex}`}
                points={lineObj.ruleLine.map((p) => [p.x, p.y]).flat()}
                stroke={stroke}
                strokeWidth={selectedLine === lineIndex ? 4 : 2}
                hitStrokeWidth={10}
                draggable={!isCreating}
                onClick={() => lineClickHandler(lineIndex)}
                onDragMove={(e) => lineDragMoveHandler(e, lineIndex)}
                onDragEnd={(e) => lineDragEndHandler(e, lineIndex)}
              />
              {(selectedLine === lineIndex || isCreating) &&
                lineObj.ruleLine.map((p, i) => (
                  <Circle
                    key={`circle-${cctvId}-${lineIndex}-${i}`}
                    x={p.x}
                    y={p.y}
                    radius={10}
                    stroke={stroke}
                    fill="#fff"
                    draggable
                    onDragMove={(e) => pointDragMoveHandler(e, i, lineIndex)}
                    onDragEnd={(e) => pointDragEndHandler(e, i, lineIndex)}
                    onDblClick={(e) => pointDoubleClickHandler(e, i, lineIndex)}
                  />
                ))}
              {getArrowPoints(lineObj.ruleLine) && (
                <Arrow
                  ref={arrowRef}
                  points={getArrowPoints(lineObj.ruleLine)!}
                  stroke={stroke}
                  strokeWidth={2}
                  pointerLength={10}
                  pointerWidth={10}
                  fill={stroke}
                />
              )}
            </>
          ))}
        </Layer>
      </Stage>
    </div>
  )
}
