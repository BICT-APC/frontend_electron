import { create } from 'zustand'

interface CctvSelectStore {
  selectedCctvId: number | null
  setSelectedCctvId: (selectedCctvId: number) => void
  clearSelectedCctvId: () => void
}

export const cctvSelectStore = create<CctvSelectStore>((set) => ({
  selectedCctvId: null,

  setSelectedCctvId: (selectedCctvId: number) => set({ selectedCctvId: selectedCctvId }),
  clearSelectedCctvId: () => set({ selectedCctvId: null })
}))
