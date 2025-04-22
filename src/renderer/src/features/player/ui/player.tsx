import { useRef } from 'react'
import styles from './player.module.css'
import { Cctv } from '../../../shared/types/cctv'
import { useWebRTC } from '../lib/use-webrtc'

interface PlayerProps {
  cctv: Cctv
}

export const Player = ({ cctv }: PlayerProps) => {
  const cctvId = cctv.id
  const ref = useRef<HTMLDivElement | null>(null)
  const { videoRef } = useWebRTC(cctvId)

  return (
    <div className={styles.wrapper} ref={ref}>
      <video
        ref={videoRef}
        className={styles.video}
        autoPlay
        playsInline
        disablePictureInPicture
        preload="none"
        muted
      />
    </div>
  )
}
