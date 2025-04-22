import { apcSettingIcon } from '../../../shared/assets/image'
import styles from './cctv-config-button.module.css'
import { IconButton } from '../../icon-button'
import { TextButton } from '../../text-button'
import { cctvConfigStore } from '../model/cctv-config-store'
import { cctvConfigHook } from '..'

export const CctvConfigButton = () => {
  const { showExtraIcons, isRoiSetting, isRuleLineSetting } = cctvConfigStore()
  const {
    showExtraButtonHandler,
    hideExtraButtonHandler,
    roiSettingButtonHandler,
    ruleLineSettingButtonHandler,
    saveSettingButtonHandler
  } = cctvConfigHook()

  return (
    <>
      {!showExtraIcons && (
        <IconButton
          onClick={showExtraButtonHandler}
          iconSrc={apcSettingIcon}
          altText="apcSettingIcon"
        />
      )}

      {showExtraIcons && (
        <div className={styles.setApcWrapper}>
          <div className={styles.setApcIcon}>
            <div className={styles.iconWithBorder}>
              <IconButton
                onClick={hideExtraButtonHandler}
                iconSrc={apcSettingIcon}
                altText="ExtraIcon2"
              />
            </div>

            <TextButton onClick={roiSettingButtonHandler} isActive={isRoiSetting}>
              Roi 설정
            </TextButton>

            <TextButton onClick={ruleLineSettingButtonHandler} isActive={isRuleLineSetting}>
              규칙 선 설정
            </TextButton>

            <TextButton onClick={saveSettingButtonHandler}>설정 저장</TextButton>
          </div>
        </div>
      )}
    </>
  )
}
