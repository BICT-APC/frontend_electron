import styles from './apc-config-view.module.css'
import { useApcConfig } from '../lib/apc-config-hook'

interface ApcConfigViewProps {
  areaId: number
}

export const ApcConfigView = ({ areaId }: ApcConfigViewProps) => {
  const { config } = useApcConfig({ areaId })

  return (
    <div className={styles.configContainer}>
      <div className={styles.configItem}>
        <span className={styles.configLabel}>Area ID:</span>
        <span className={styles.configValue}>{config?.areaId}</span>
      </div>
      <div className={styles.configItem}>
        <span className={styles.configLabel}>In:</span>
        <span className={styles.configValue}>{config?.in}</span>
      </div>
      <div className={styles.configItem}>
        <span className={styles.configLabel}>Out:</span>
        <span className={styles.configValue}>{config?.out}</span>
      </div>
      <div className={styles.configItem}>
        <span className={styles.configLabel}>Total:</span>
        <span className={styles.configValue}>{config?.total}</span>
      </div>
    </div>
  )
}
