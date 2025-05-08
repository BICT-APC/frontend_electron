import styles from './human-config-view.module.css'
import { useHumanConfigForm } from '../lib/use-human-config-form'
import { useEffect, useState } from 'react'
import { ModalLogView } from '../../modal-log-view'
import { ModalType, useModalState } from '../../../shared/modal'

interface HumanConfigViewProps {
  cctvId: number
}

// 이미지 크기 옵션
const imgSizeOptions = [416, 640, 960, 1280]

export const HumanConfigView = ({ cctvId }: HumanConfigViewProps) => {
  const {
    config,
    saveMessage,
    handleConfChange,
    handleIouChange,
    handleConfInputChange,
    handleIouInputChange,
    handleImgszChange,
    handleSaveConfig
  } = useHumanConfigForm({ cctvId })

  const modalState = useModalState()

  const [confValue, setConfValue] = useState<number>(0.5)
  const [iouValue, setIouValue] = useState<number>(0.5)
  const [imgszValue, setImgszValue] = useState<number>(640)

  useEffect(() => {
    if (config) {
      setConfValue(config.conf)
      setIouValue(config.iou)
      setImgszValue(config.imgsz)
    }
  }, [config])

  return (
    <div className={styles.configContainer}>
      <div>
        {modalState.modalState === ModalType.HumanConfig && <ModalLogView cctvId={cctvId!} />}
      </div>
      <div className={styles.configHeader}>지능형 카메라 설정</div>
      <div className={styles.configGroup}>
        <div className={styles.configItem}>
          <span className={styles.configLabel}>CCTV ID:</span>
          <span className={styles.configValue}>{config?.cctvId}</span>
        </div>

        <div className={`${styles.configItem} ${styles.wideConfigItem}`}>
          <span className={styles.configLabel}>Conf:</span>
          <div className={styles.sliderContainer}>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={confValue}
              onChange={(e) => handleConfChange(e, setConfValue)}
              className={styles.slider}
            />
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={confValue.toFixed(2)}
              onChange={(e) => handleConfInputChange(e, setConfValue)}
              className={styles.sliderValueInput}
            />
          </div>
        </div>
      </div>

      <div className={styles.configGroup}>
        <div className={styles.configItem}>
          <span className={styles.configLabel}>ImgSz:</span>
          <div className={styles.selectContainer}>
            <select
              value={imgszValue}
              onChange={(e) => handleImgszChange(e, setImgszValue)}
              className={styles.select}
            >
              {imgSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={`${styles.configItem} ${styles.wideConfigItem}`}>
          <span className={styles.configLabel}>IoU:</span>
          <div className={styles.sliderContainer}>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={iouValue}
              onChange={(e) => handleIouChange(e, setIouValue)}
              className={styles.slider}
            />
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={iouValue.toFixed(2)}
              onChange={(e) => handleIouInputChange(e, setIouValue)}
              className={styles.sliderValueInput}
            />
          </div>
        </div>
      </div>
      {saveMessage && <div className={styles.saveMessage}>{saveMessage}</div>}

      <button
        className={styles.saveButton}
        onClick={() => handleSaveConfig(confValue, iouValue, imgszValue)}
      >
        설정 저장
      </button>
    </div>
  )
}
