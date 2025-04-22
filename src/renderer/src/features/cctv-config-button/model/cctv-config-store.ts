import { create } from 'zustand'

interface CctvConfigStore {
  showExtraIcons: boolean
  isRoiSetting: boolean
  isRuleLineSetting: boolean
  roiSaveFlag: boolean
  ruleLineSaveFlag: boolean

  setShowExtraIcons: (showExtraIcons: boolean) => void
  setIsRoiSetting: (isRoiSetting: boolean) => void
  setIsRuleLineSetting: (isRuleLineSetting: boolean) => void
  setRoiSaveFlag: (roiSaveFlag: boolean) => void
  setRuleLineSaveFlag: (ruleLineSaveFlag: boolean) => void
}

export const cctvConfigStore = create<CctvConfigStore>((set) => ({
  showExtraIcons: false,
  isRoiSetting: false,
  isRuleLineSetting: false,
  roiSaveFlag: false,
  ruleLineSaveFlag: false,

  setShowExtraIcons: (showExtraIcons: boolean) => set({ showExtraIcons: showExtraIcons }),
  setIsRoiSetting: (isRoiSetting: boolean) => set({ isRoiSetting: isRoiSetting }),
  setIsRuleLineSetting: (isRuleLineSetting: boolean) =>
    set({ isRuleLineSetting: isRuleLineSetting }),
  setRoiSaveFlag: (roiSaveFlag: boolean) => set({ roiSaveFlag: roiSaveFlag }),
  setRuleLineSaveFlag: (ruleLineSaveFlag: boolean) => set({ ruleLineSaveFlag: ruleLineSaveFlag })
}))
