import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { HumanDetectConfig } from '../../shared/types/human-detect'

interface HumanDetectConfigStore {
  humanDetectConfigList: HumanDetectConfig[]
  
  setHumanDetectConfigList: (humanDetectConfigList: HumanDetectConfig[]) => void
}

export const humanDetectConfigStore = create<HumanDetectConfigStore>()(
  devtools(
    (set) => ({
      humanDetectConfigList: [],
      setHumanDetectConfigList: (humanDetectConfigList: HumanDetectConfig[]) =>
        set({ humanDetectConfigList: humanDetectConfigList })
    }),
    { name: 'HumanDetectConfigStore' } // DevTools 설정
  )
)
