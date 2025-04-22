import { create } from 'zustand'
import { ApcConfig, EventConfig } from '../../shared/types/apc'
import { devtools } from 'zustand/middleware'

interface ApcConfigStore {
  apcConfigList: ApcConfig[]
  eventConfigList: EventConfig[]

  setApcConfigList: (apcConfigList: ApcConfig[]) => void
  setEventConfigList: (eventConfigList: EventConfig[]) => void
}

export const apcConfigStore = create<ApcConfigStore>()(
  devtools(
    (set) => ({
      apcConfigList: [],
      eventConfigList: [],

      setApcConfigList: (apcConfigList: ApcConfig[]) => set({ apcConfigList: apcConfigList }),
      setEventConfigList: (eventConfigList: EventConfig[]) => set({ eventConfigList: eventConfigList })
    }),
    { name: 'ApcConfigStore' }
  )
)
