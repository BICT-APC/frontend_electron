import { CctvConfigButton } from '../../../features/cctv-config-button'
import { cctvSelectStore } from '../../../features/cctv-selecet-layer'
import { IconButton } from '../../../features/icon-button'
import { TextButton } from '../../../features/text-button'
import { cameraSettingIcon, graphIcon, headerLogo, serverIcon } from '../../../shared/assets/image'
import { topNavigationHandler } from '../lib/top-navigation-handler'
import styles from './top-navigation.module.css'

export const TopNavigation = () => {
  const { selectedCctvId } = cctvSelectStore()
  const { pomitDbSyncHandler } = topNavigationHandler()

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftAlignWrapper}>
        <TextButton onClick={pomitDbSyncHandler}>IPOS DB 동기화</TextButton>
      </div>

      <div className={styles.centerAlignWrapper}>
        <div className={styles.logo}>
          <img src={headerLogo} alt="HeaderLogo" />
        </div>
      </div>

      <div className={styles.rightAlignWrapper}>
        {selectedCctvId && <CctvConfigButton />}

        <IconButton onClick={() => {}} iconSrc={cameraSettingIcon} altText="cameraSettingIcon" />

        <IconButton onClick={() => {}} iconSrc={graphIcon} altText="graphIcon" />

        <IconButton onClick={() => {}} iconSrc={serverIcon} altText="serverIcon" />
      </div>
    </div>
  )
}
