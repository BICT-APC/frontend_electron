import { create } from 'zustand'
import { RuleLinePoints } from '../../../shared/types/apc'

interface RuleLineStore {
  reSizedLine: RuleLinePoints[] | null // 점 두 개로 구성된 선분
  isCreating: boolean // 선 생성 중인지 여부
  selectedLine: boolean // 선이 선택되었는지 여부

  setReSizedLine: (reSizedLine: RuleLinePoints[] | null) => void
  setIsCreating: (isCreating: boolean) => void
  setSelectedLine: (selectedLine: boolean) => void
}

export const ruleLineStore = create<RuleLineStore>((set) => ({
  reSizedLine: null,
  isCreating: false,
  selectedLine: false,

  setReSizedLine: (reSizedLine) => set({ reSizedLine }),
  setIsCreating: (isCreating) => set({ isCreating }),
  setSelectedLine: (selectedLine) => set({ selectedLine })
}))
