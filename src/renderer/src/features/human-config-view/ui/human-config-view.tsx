import styles from './human-config-view.module.css'
import type { Roi } from '../../../shared/types/human-detect'
import { useHumanConfig } from '../lib/human-config-hook'

interface HumanConfigViewProps {
  cctvId: number
}

export const HumanConfigView = ({ cctvId }: HumanConfigViewProps) => {
  const { config, readConfig } = useHumanConfig()

  if (cctvId) {
    readConfig(cctvId)
  }

  return (
    <div className={styles.configContainer}>
      <h2 className={styles.configHeader}>인간 감지 설정</h2>
      <div className={styles.configItem}>
        <span className={styles.configLabel}>CCTV ID:</span>
        <span className={styles.configValue}>{config?.cctvId}</span>
      </div>
      <div className={styles.configItem}>
        <span className={styles.configLabel}>Conf:</span>
        <span className={styles.configValue}>{config?.conf}</span>
      </div>
      <div className={styles.configItem}>
        <span className={styles.configLabel}>IoU:</span>
        <span className={styles.configValue}>{config?.iou}</span>
      </div>
      <div className={styles.configItem}>
        <span className={styles.configLabel}>ImgSz:</span>
        <span className={styles.configValue}>{config?.imgsz}</span>
      </div>
      <div className={styles.configItem}>
        <span className={styles.configLabel}>ROI List:</span>
        <div className={styles.configValue}>
          <ul className={styles.roiList}>
            {config?.roiList.map((roi: Roi, idx) => (
              <li key={idx} className={styles.roiItem}>
                ROI #{idx + 1}:
                <div className={styles.coordsContainer}>
                  {roi.roi
                    .sort((a, b) => a.orderIndex - b.orderIndex)
                    .map((pt, i) => (
                      <span key={i} className={styles.coordPoint}>
                        ({pt.x},{pt.y})
                      </span>
                    ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
