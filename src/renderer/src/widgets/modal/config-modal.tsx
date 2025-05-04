// import styles from './config-modal.module.css'
import { ModalLogView } from '../../features/modal-log-view'
import { HumanConfigView } from '../../features/modal-human-config-view'
import { Modal } from '../../features/modal'
import { useModalState, ModalType } from '../../shared/modal'
import { ApcConfigView } from '../../features/modal-apc-config-view'

export const ConfigModal = () => {
  const { modalState, cctvId, closeModal, areaId } = useModalState()
  return (
    <Modal
      isOpen={modalState !== null}
      onClose={closeModal}
      header={modalState || undefined}
      logBox={modalState === ModalType.HumanConfig && <ModalLogView cctvId={cctvId!} />}
      contentBox={
        modalState === ModalType.HumanConfig ? (
          <HumanConfigView cctvId={cctvId!} />
        ) : modalState === ModalType.ApcConfig ? (
          <ApcConfigView areaId={areaId!} />
        ) : null
      }
    />
  )
}
