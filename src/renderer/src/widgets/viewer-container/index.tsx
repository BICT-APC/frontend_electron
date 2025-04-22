import { cctvStore } from '../../entities/cctv/cctv-store'
import { cctvSelectStore } from '../../features/cctv-selecet-layer/model/cctv-selecet-store'
import { Viewer } from '../viewer'
import { useViewContainer } from './lib/use-viewer-container'
import styles from './viewer-container.module.css'

export const ViewerContainer = () => {
  const { selectedCctvId } = cctvSelectStore()
  const { cctvList } = cctvStore()
  useViewContainer()
  const selectedCctv = cctvList.find((cctv) => cctv.id === selectedCctvId)
  return (
    <div className={styles.wrapper}>
      {selectedCctv ? (
        <Viewer cctv={selectedCctv} />
      ) : (
        <div className={styles.directionRow}>
          <div className={styles.directionColumn}>
            <Viewer cctv={cctvList[0]} />
            <Viewer cctv={cctvList[1]} />
          </div>
          <div className={styles.directionColumn}>
            <Viewer cctv={cctvList[2]} />
            <Viewer cctv={cctvList[3]} />
          </div>
        </div>
      )}
    </div>
  )
}
