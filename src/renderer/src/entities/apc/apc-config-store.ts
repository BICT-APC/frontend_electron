import { create } from 'zustand'
import { ApcConfig } from '../../shared/types/apc'

interface ApcConfigStore {
  apcConfigList: ApcConfig[]
  setApcConfigList: (apcConfigList: ApcConfig[]) => void
}

export const apcConfigStore = create<ApcConfigStore>((set) => ({
  apcConfigList: [],
  setApcConfigList: (apcConfigList: ApcConfig[]) => set({ apcConfigList: apcConfigList })
}))
