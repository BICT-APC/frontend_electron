import React, { useState } from 'react'
import styles from './camera-setting.module.css'

// CCTV 목업 데이터
const mockCameras = [
  { id: 1, name: 'GT 입구 감시 CCTV' },
  { id: 2, name: '안전 CCTV' },
  { id: 3, name: 'CCTV 3' },
  { id: 4, name: 'CCTV 4' }
]

// CCTV 설정값 타입
interface CameraSettings {
  iou: number
  conf: number
  imgsz: number
  frame: number
}

export const CameraSetting: React.FC = () => {
  const [settings, setSettings] = useState<Record<number, CameraSettings>>({
    1: { iou: 50, conf: 50, imgsz: 640, frame: 1 },
    2: { iou: 50, conf: 50, imgsz: 640, frame: 1 },
    3: { iou: 50, conf: 50, imgsz: 640, frame: 1 },
    4: { iou: 50, conf: 50, imgsz: 640, frame: 1 }
  })
  const [selectedCameraId, setSelectedCameraId] = useState<number>(1)

  const currentSettings = settings[selectedCameraId]

  // 구멍
  const handleSettingsChange = (_type: 'iou' | 'conf' | 'imgsz' | 'frame', _value: number) => {}

  // 구멍
  const handleSaveSettings = () => {}

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Camera Settings</h2>
      <div className={styles.selectWrapper}>
        <label className={styles.label}>CCTV 선택:</label>
        <select
          value={selectedCameraId}
          onChange={(e) => setSelectedCameraId(Number(e.target.value))}
          className={styles.select}
        >
          {mockCameras.map((camera) => (
            <option key={camera.id} value={camera.id}>
              {camera.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.sliderWrapper}>
        <label className={styles.label}>객체 검출 정확도: {currentSettings.iou}%</label>
        <input
          type="range"
          min="0"
          max="100"
          value={currentSettings.iou}
          onChange={(e) => {
            const newValue = Number(e.target.value)
            setSettings((prev) => ({
              ...prev,
              [selectedCameraId]: { ...prev[selectedCameraId], iou: newValue }
            }))
            handleSettingsChange('iou', newValue)
          }}
          className={styles.slider}
        />
      </div>
      <div className={styles.sliderWrapper}>
        <label className={styles.label}>감지 기준값: {currentSettings.conf}%</label>
        <input
          type="range"
          min="0"
          max="100"
          value={currentSettings.conf}
          onChange={(e) => {
            const newValue = Number(e.target.value)
            setSettings((prev) => ({
              ...prev,
              [selectedCameraId]: { ...prev[selectedCameraId], conf: newValue }
            }))
            handleSettingsChange('conf', newValue)
          }}
          className={styles.slider}
        />
      </div>
      <div className={styles.sliderWrapper}>
        <label className={styles.label}>이미지 크기: {currentSettings.imgsz}px</label>
        <input
          type="range"
          min="320"
          max="1280"
          step="32"
          value={currentSettings.imgsz}
          onChange={(e) => {
            const newValue = Number(e.target.value)
            setSettings((prev) => ({
              ...prev,
              [selectedCameraId]: { ...prev[selectedCameraId], imgsz: newValue }
            }))
            handleSettingsChange('imgsz', newValue)
          }}
          className={styles.slider}
        />
      </div>
      <div className={styles.sliderWrapper}>
        <label className={styles.label}>프레임 조절: {currentSettings.frame}</label>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={currentSettings.frame}
          onChange={(e) => {
            const newValue = Number(e.target.value)
            setSettings((prev) => ({
              ...prev,
              [selectedCameraId]: { ...prev[selectedCameraId], frame: newValue }
            }))
            handleSettingsChange('frame', newValue)
          }}
          className={styles.slider}
        />
      </div>
      <button className={styles.saveButton} onClick={handleSaveSettings}>
        저장
      </button>
    </div>
  )
}
