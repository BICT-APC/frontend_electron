import { Circle, Group, Layer, Line, Rect, Stage } from 'react-konva'
import styles from './roi-layer.module.css'
import { cctvSelectStore } from '../../cctv-selecet-layer/model/cctv-selecet-store'
import { useResizeObserver } from 'usehooks-ts'
import { useRef } from 'react'
import { roiCallback } from '../lib/roi-callback'
import { cctvConfigStore } from '../../cctv-config-button/model/cctv-config-store'
import { HumanDetectConfig } from '../../../shared/types/human-detect'
import { useRoi } from '../lib/use-roi'

interface RoiLayerProps {
  humanDetectConfig: HumanDetectConfig
}
export const RoiLayer = ({ humanDetectConfig }: RoiLayerProps) => {
  const { cctvId } = humanDetectConfig

  const { selectedCctvId } = cctvSelectStore()
  const { isRoiSetting } = cctvConfigStore()

  const ref = useRef<HTMLDivElement>(null);
  
  const { width = 0, height = 0 } = useResizeObserver({ ref: ref as React.RefObject<HTMLElement> })

  const {
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
  } = roiCallback()

  useRoi({
    humanDetectConfig,
    size: {
      width,
      height
    },
    refs: {
      layerRef,
      rectRef,
      groupRefs,
      circleRefs
    },
    states: {
      reSizedRegion,
      setReSizedRegion,
      selectedPolyIndex,
      setSelectedPolyIndex,
      creatingPolyIndex,
      setCreatingPolyIndex
    }
  })

  const stroke = '#ff0000'
  const fill = 'rgba(255, 0, 0, 0.2)'
  const creatingFill = 'rgba(255, 0, 0, 0.4)'
  const strokeWidth = selectedCctvId ? 2 : 1

  return (
    <div
      className={styles.wrapper}
      key={`${cctvId}-roi-wrapper`}
      style={selectedCctvId === cctvId && isRoiSetting ? { zIndex: 100 } : undefined}
      ref={ref}
    >
      <Stage key={`${cctvId}-stage`} width={width} height={height}>
        <Layer ref={layerRef} key={`${cctvId}-Layer`}>
          <Rect
            ref={rectRef}
            width={window.innerWidth}
            height={window.innerHeight}
            fill="transparent"
            onClick={backgroundClickHandler}
          />
          {reSizedRegion &&
            reSizedRegion.map((polygon, polyIndex) => (
              <Group
                ref={(ref) => {
                  groupRefs.current[polyIndex] = ref
                }}
                key={`${cctvId}-${polyIndex}-Group`}
                draggable={polyIndex === selectedPolyIndex || polyIndex === creatingPolyIndex}
                onDragEnd={(event) => {
                  groupDragEndHandler(event, polyIndex)
                }}
                onDblClick={() => {
                  groupDoubleClickHandler(polyIndex)
                }}
              >
                <Line
                  key={`${cctvId}-${polyIndex}-filledLine`}
                  points={polygon?.roi.map((point) => [point.x, point.y]).flat()}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  fill={creatingPolyIndex === polyIndex ? creatingFill : fill}
                  closed={false}
                  sceneFunc={(context, shape) => lineSceneFunc(context, shape, polygon.roi)}
                  onClick={() => {
                    polygonClickHandler(polyIndex)
                  }}
                />
                {(selectedPolyIndex === polyIndex || creatingPolyIndex === polyIndex) && (
                  <>
                    <Line
                      key={`${cctvId}-${polyIndex}-Line`}
                      points={polygon?.roi.map((point) => [point.x, point.y]).flat()}
                      stroke={stroke}
                      strokeWidth={4}
                      hitStrokeWidth={6}
                      listening={true}
                      closed
                      sceneFunc={(context, shape) => lineSceneFunc(context, shape, polygon.roi)}
                      onDblClick={(event) => {
                        lineDoubleClickHandler(event, polyIndex)
                      }}
                    />
                    {polygon.roi.map((point, pointIndex) => (
                      <Circle
                        ref={(ref) => {
                          circleRefs.current[pointIndex] = ref
                        }}
                        key={`${cctvId}-${polyIndex}-${pointIndex}=Circle`}
                        x={point.x}
                        y={point.y}
                        radius={10}
                        stroke={stroke}
                        fill="#fff"
                        name={`${cctvId}-${polyIndex}-${pointIndex}=Circle`}
                        draggable
                        onDblClick={(event) => {
                          pointDoubleClickHandler(event, pointIndex, polyIndex)
                        }}
                        onDragMove={(event) => {
                          pointDragMoveHandler(event, pointIndex, polyIndex)
                        }}
                      />
                    ))}
                  </>
                )}
              </Group>
            ))}
        </Layer>
      </Stage>
    </div>
  )
}
