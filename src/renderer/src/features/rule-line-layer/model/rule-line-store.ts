import { create } from 'zustand'
import { RuleLine } from '../../../shared/types/apc'

interface RuleLineStore {
  reSizedLineList: RuleLine[] | null // 점 두 개로 구성된 선분
  isCreating: boolean // 선 생성 중인지 여부
  selectedLine: number | null // 선이 선택되었는지 여부

  setReSizedLineList: (reSizedLineList: RuleLine[] | null) => void
  setIsCreating: (isCreating: boolean) => void
  setSelectedLine: (selectedLine: number | null) => void
}

export const ruleLineStore = create<RuleLineStore>((set) => ({
  reSizedLineList: null,
  isCreating: false,
  selectedLine: null,

  setReSizedLineList: (reSizedLineList) => set({ reSizedLineList }),
  setIsCreating: (isCreating) => set({ isCreating }),
  setSelectedLine: (selectedLine) => set({ selectedLine })
}))
