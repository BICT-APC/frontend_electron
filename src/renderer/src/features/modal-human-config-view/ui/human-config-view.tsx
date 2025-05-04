import styles from './human-config-view.module.css'
import { useHumanConfig } from '../lib/human-config-hook'

interface HumanConfigViewProps {
  cctvId: number
}

export const HumanConfigView = ({ cctvId }: HumanConfigViewProps) => {
  const { config } = useHumanConfig({ cctvId })

  return (
    <div className={styles.configContainer}>
      <div className={styles.configGroup}>
        <div className={styles.configItem}>
          <span className={styles.configLabel}>CCTV ID:</span>
          <span className={styles.configValue}>{config?.cctvId}</span>
        </div>
        <div className={styles.configItem}>
          <span className={styles.configLabel}>Conf:</span>
          <span className={styles.configValue}>{config?.conf}</span>
        </div>
      </div>
      <div className={styles.configGroup}>
        <div className={styles.configItem}>
          <span className={styles.configLabel}>IoU:</span>
          <span className={styles.configValue}>{config?.iou}</span>
        </div>
        <div className={styles.configItem}>
          <span className={styles.configLabel}>ImgSz:</span>
          <span className={styles.configValue}>{config?.imgsz}</span>
        </div>
      </div>
    </div>
  )
}
