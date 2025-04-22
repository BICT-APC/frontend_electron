import styles from './config-modal.module.css'
import { useModalState } from '../lib/use-modal-state'
import { HumanConfigView } from '../../../features/human-config-view/ui/human-config-view'
import { ApcConfigView } from '../../../features/apc-config-view'

export const ConfigModal = () => {
  const { modalState, cctvId, onClose } = useModalState()
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {modalState === 'human' && cctvId !== null && <HumanConfigView cctvId={cctvId} />}
        {modalState === 'apc' && cctvId !== null && <ApcConfigView cctvId={cctvId} />}
        {/* {modalState === 'reset' && <ResetConfigView />} */}
      </div>
    </div>
  )
}
