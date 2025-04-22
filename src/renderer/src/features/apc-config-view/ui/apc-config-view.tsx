import styles from './apc-config-view.module.css'
import type { RuleLine } from '../../../shared/types/apc'
import { useApcConfig } from '../lib/apc-config-hook'

interface ApcConfigViewProps {
  cctvId: number
}

export const ApcConfigView = ({ cctvId }: ApcConfigViewProps) => {
  const { config, readConfig } = useApcConfig()

  if (cctvId) {
    readConfig(cctvId)
  }

  return (
    <div className={styles.configContainer}>
      <h2 className={styles.configHeader}>APC 설정</h2>
      <div className={styles.configItem}>
        <span className={styles.configLabel}>CCTV ID:</span>
        <span className={styles.configValue}>{config?.cctvId}</span>
      </div>
      <div className={styles.configItem}>
        <span className={styles.configLabel}>Area ID:</span>
        <span className={styles.configValue}>{config?.areaId}</span>
      </div>
      <div className={styles.configItem}>
        <span className={styles.configLabel}>Event Config ID:</span>
        <span className={styles.configValue}>{config?.eventConfigId}</span>
      </div>
      <div className={styles.configItem}>
        <span className={styles.configLabel}>Rule Line List:</span>
        <div className={styles.configValue}>
          <ul className={styles.ruleLineList}>
            {config?.ruleLineList.map((ruleLine: RuleLine, idx) => (
              <li key={idx} className={styles.ruleLineItem}>
                Rule Line #{idx + 1}:
                <div className={styles.coordsContainer}>
                  {ruleLine.ruleLine
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
