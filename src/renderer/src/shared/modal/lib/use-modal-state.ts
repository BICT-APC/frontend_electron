import { create } from 'zustand'
import { ModalType } from '../model/types'

type ModalState = {
  modalState: ModalType | null
  cctvId: number | null
  areaId: number | null
  openHumanConfig: (cctvId: number) => void
  openApcConfig: (areaId?: number, cctvId?: number) => void
  closeModal: () => void
}

const useModalState = create<ModalState>((set) => ({
  modalState: null,
  cctvId: null,
  areaId: null,

  openHumanConfig: (cctvId: number) => {
    set({ modalState: ModalType.HumanConfig, cctvId })
  },

  openApcConfig: (areaId?: number, cctvId?: number) => {
    set({
      modalState: ModalType.ApcConfig,
      cctvId: cctvId !== undefined ? cctvId : null,
      areaId: areaId !== undefined ? areaId : null
    })
  },

  closeModal: () => {
    set({ modalState: null, cctvId: null })
  }
}))

export { useModalState }
