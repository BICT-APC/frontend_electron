import { useModalState } from '../../../shared/modal'
import styles from './side-bar-area-box.module.css'
import { ApcData } from '../../../shared/types/apc'

interface SideBarAreaBoxProps {
  areaId: number
  areaName: string
  apcData: ApcData | undefined
}

export const SideBarAreaBox = ({ areaId, areaName, apcData }: SideBarAreaBoxProps) => {
  const { openApcConfig } = useModalState()

  return (
    <div
      className={styles.areaBox}
      onClick={(e) => {
        e.stopPropagation()
        openApcConfig(areaId)
      }}
    >
      <div className={styles.areaName}>{areaName}</div>
      <div className={styles.apcLabels}>
        <div className={styles.redText}>In</div>
        <div className={styles.blueText}>Out</div>
        <div className={styles.blackText}>Total</div>
      </div>
      <div className={styles.apcCount}>
        <div className={styles.blackText}>{apcData?.in || 0}</div>
        <div className={styles.divider}>/</div>
        <div className={styles.blackText}>{apcData?.out || 0}</div>
        <div className={styles.divider}>/</div>
        <div className={styles.blackText}>{apcData?.total || 0}</div>
      </div>
    </div>
  )
}
