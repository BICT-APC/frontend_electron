import { create } from 'zustand'
import { ApcConfig } from '../../shared/types/apc'
import { devtools } from 'zustand/middleware'

interface ApcConfigStore {
  apcConfigList: ApcConfig[]
  setApcConfigList: (apcConfigList: ApcConfig[]) => void
}

export const apcConfigStore = create<ApcConfigStore>()(
  devtools((set) => ({
    apcConfigList: [],
    setApcConfigList: (apcConfigList: ApcConfig[]) => set({ apcConfigList: apcConfigList })
  }), {name: 'ApcConfigStore'})
)
