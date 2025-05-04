import styles from './side-bar-box.module.css'
import React from 'react'

interface CctvMonitorBoxProps {
  cctvName: string
  onClick?: (event: React.MouseEvent) => void
}

export const CctvMonitorBox = ({ cctvName, onClick }: CctvMonitorBoxProps) => {
  return (
    <div className={styles.apcBox} onClick={onClick}>
      <div className={styles.cctvInfo}>
        <div>{cctvName}</div>
      </div>
    </div>
  )
}
