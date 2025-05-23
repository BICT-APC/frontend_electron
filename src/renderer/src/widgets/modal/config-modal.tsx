import { HumanConfigView } from '../../features/modal-human-config-view'
import { Modal } from '../../features/modal'
import { useModalState, ModalType } from '../../features/modal'
import { ApcConfigView } from '../../features/modal-apc-config-view'
import { AppManageView } from '../../features/modal-app-manage-view'

export const ConfigModal = () => {
  const { modalState, cctvId, closeModal, areaId } = useModalState()
  return (
    <Modal
      isOpen={modalState !== null}
      onClose={closeModal}
      header={modalState || undefined}
      contentBox={
        modalState === ModalType.HumanConfig ? (
          <HumanConfigView cctvId={cctvId!} />
        ) : modalState === ModalType.ApcConfig ? (
          <ApcConfigView areaId={areaId!} />
        ) : modalState === ModalType.AppManage ? (
          <AppManageView />
        ) : null
      }
    />
  )
}
