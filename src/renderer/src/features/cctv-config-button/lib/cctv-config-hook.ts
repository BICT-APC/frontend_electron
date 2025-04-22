import { useCallback } from 'react'
import { cctvConfigStore } from '../model/cctv-config-store'

export const cctvConfigHook = () => {
  const {
    isRoiSetting,
    isRuleLineSetting,
    setShowExtraIcons,
    setIsRoiSetting,
    setIsRuleLineSetting,
    setRoiSaveFlag,
    setRuleLineSaveFlag
  } = cctvConfigStore()

  const showExtraButtonHandler = () => {
    setShowExtraIcons(true)
  }
  const hideExtraButtonHandler = () => {
    setShowExtraIcons(false)
    setIsRoiSetting(false)
    setIsRuleLineSetting(false)
  }
  const roiSettingButtonHandler = useCallback(() => {
    if (isRoiSetting) {
      setIsRoiSetting(false)
    } else {
      setIsRuleLineSetting(false)
      setIsRoiSetting(true)
    }
  }, [isRoiSetting])

  const ruleLineSettingButtonHandler = useCallback(() => {
    if (isRuleLineSetting) {
      setIsRuleLineSetting(false)
    } else {
      setIsRuleLineSetting(true)
      setIsRoiSetting(false)
    }
  }, [isRuleLineSetting])

  const saveSettingButtonHandler = () => {
    if (isRoiSetting) {
      setRoiSaveFlag(true)
    }
    if (isRuleLineSetting) {
      setRuleLineSaveFlag(true)
    }
    setIsRoiSetting(false)
    setIsRuleLineSetting(false)
  }

  return {
    showExtraButtonHandler,
    hideExtraButtonHandler,
    roiSettingButtonHandler,
    ruleLineSettingButtonHandler,
    saveSettingButtonHandler
  }
}
