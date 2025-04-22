import styles from './cctv-selecet-layer.module.css'
import { cctvSelectHook } from '../lib/cctv-select-hook'
import { Cctv } from '../../../shared/types/cctv'

interface CctvSelectLayerProps {
  cctv: Cctv
}

export const CctvSelectLayer = ({ cctv }: CctvSelectLayerProps) => {
  const { cctvSelectHandler } = cctvSelectHook(cctv.id)

  return (
    <div className={styles.wrapper} onDoubleClick={cctvSelectHandler} style={{ zIndex: 90 }}></div>
  )
}
