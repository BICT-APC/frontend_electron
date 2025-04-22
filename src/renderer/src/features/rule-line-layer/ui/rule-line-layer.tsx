// ✅ rule-line-layer.tsx ROI 구조 반영하여 Group 단위로 수정
import { useRef, useState } from 'react'
import { Circle, Group, Layer, Line, Rect, Stage, Arrow } from 'react-konva'
import { cctvConfigStore } from '../../cctv-config-button/model/cctv-config-store'
import { cctvSelectStore } from '../../cctv-selecet-layer/model/cctv-selecet-store'
import styles from './rule-line-layer.module.css'
import { useResizeObserver } from 'usehooks-ts'
import { useRuleLine } from '../lib/use-rule-line'
import { ruleLineCallback } from '../lib/rule-line-callback'
import { ApcConfig, RuleLine } from '../../../shared/types/apc'
import Konva from 'konva'

interface RuleLineLayerProps {
  apcConfig: ApcConfig
}

export const RuleLineLayer = ({ apcConfig }: RuleLineLayerProps) => {
  const layerRef = useRef<Konva.Layer | null>(null)
  const rectRef = useRef<Konva.Rect | null>(null)
  const groupRefs = useRef<(Konva.Group | null)[]>([])
  const circleRefs = useRef<(Konva.Circle | null)[]>([])

  const [reSizedLineList, setReSizedLineList] = useState<RuleLine[] | null>(null)
  const [isCreating, setIsCreating] = useState<number | null>(null)
  const [selectedLine, setSelectedLine] = useState<number | null>(null)
  const [onPointDrag, setOnPointDrag] = useState<boolean>(false)
  
  const { cctvId, ruleLineList } = apcConfig
  const { selectedCctvId } = cctvSelectStore()
  const { isRuleLineSetting } = cctvConfigStore()
  
  const ref = useRef<HTMLDivElement | null>(null)
  const { width = 0, height = 0 } = useResizeObserver({ ref: ref as React.RefObject<HTMLElement> })

  
  const {
    backgroundClickHandler,
    lineClickHandler,
    pointDragMoveHandler,
    pointDoubleClickHandler,
    onDragEndHandler,
    arrowRef
  } = ruleLineCallback({
    states: {
      reSizedLineList,
      setReSizedLineList,
      isCreating,
      setIsCreating,
      selectedLine,
      setSelectedLine,
      onPointDrag,
      setOnPointDrag
    }
  })

  useRuleLine({
    ruleLineList,
    cctvId,
    size: { width, height },
    refs: { layerRef, rectRef, groupRefs, circleRefs },
    states: {
      reSizedLineList,
      setReSizedLineList,
      isCreating,
      setIsCreating,
      selectedLine,
      setSelectedLine
    }
  })

  const stroke = '#ffff00'

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
            <Group
              ref={(ref) => {groupRefs.current[lineIndex] = ref}}
              key={`${cctvId}-group-${lineIndex}`}
              draggable={!isCreating && selectedLine === lineIndex}
              onClick={() => lineClickHandler(lineIndex)}
              onDragEnd={(e) => onDragEndHandler(e, lineIndex)}
            >
              <Line
                points={lineObj.ruleLine.map((p) => [p.x, p.y]).flat()}
                stroke={stroke}
                strokeWidth={selectedLine === lineIndex ? 4 : 2}
                hitStrokeWidth={10}
                onClick={() => lineClickHandler(lineIndex)}
                onDblClick={() => {
                  const updated = [...reSizedLineList]
                  updated.splice(lineIndex, 1)
                  setReSizedLineList(updated)
                  setSelectedLine(null)
                  setIsCreating(null)
                }}
              />
              {(isCreating === lineIndex || selectedLine === lineIndex ) &&
                lineObj.ruleLine.map((p, i) => (
                  <Circle
                    ref={(ref) => {
                      circleRefs.current[i] = ref
                    }}
                    key={`circle-${cctvId}-${lineIndex}-${i}`}
                    x={p.x}
                    y={p.y}
                    radius={10}
                    stroke={stroke}
                    fill="#fff"
                    draggable
                    onDragMove={(e) => pointDragMoveHandler(e, i, lineIndex)}
                    // onDragEnd={(e) => pointDragEndHandler(e, i, lineIndex)}
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
            </Group>
          ))}
        </Layer>
      </Stage>
    </div>
  )
}
