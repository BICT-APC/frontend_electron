import styles from './side-bar-cctv-box.module.css'
import React from 'react'

interface SideBarCctvBoxProps {
  cctvName: string
  onClick?: (event: React.MouseEvent) => void
}

export const SideBarCctvBox = ({ cctvName, onClick }: SideBarCctvBoxProps) => {
  return (
    <div className={styles.apcBox} onClick={onClick}>
      <div className={styles.cctvInfo}>
        <div>{cctvName}</div>
      </div>
    </div>
  )
}
