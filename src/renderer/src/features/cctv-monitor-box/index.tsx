import styles from './side-bar-box.module.css'
// import { useModalState } from '../../widgets/config-modal/lib/use-modal-state'

interface CctvMonitorBoxProps {
  cctvName: string
  // cctvId: number
}

export const CctvMonitorBox = ({ cctvName }: CctvMonitorBoxProps) => {
  // const { openHumanConfig, openApcConfig } = useModalState()
  return (
    <div className={styles.apcBox}>
      <div className={styles.cctvInfo}>
        <div>{cctvName}</div>
        {/* <div className={styles.configButton} onClick={() => openHumanConfig(cctvId)}>
          human-config
        </div>
        <div className={styles.configButton} onClick={() => openApcConfig(cctvId)}>
          apc-config
        </div> */}
      </div>
    </div>
  )
}
