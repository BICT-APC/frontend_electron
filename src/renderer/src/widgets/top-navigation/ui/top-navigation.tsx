import { CctvConfigButton } from '../../../features/cctv-config-button'
import { cctvSelectStore } from '../../../features/cctv-selecet-layer'
import { IconButton } from '../../../features/icon-button'
import { TextButton } from '../../../features/text-button'
import { headerLogo, serverIcon } from '../../../shared/assets/image'
import { topNavigationHandler } from '../lib/top-navigation-handler'
import styles from './top-navigation.module.css'
import { useModalState } from '../../../features/modal'
import { CctvDetectActivateButton } from '../../../features/cctv-detect-activate-button'

export const TopNavigation = () => {
  const { selectedCctvId } = cctvSelectStore()
  const { pomitDbSyncHandler } = topNavigationHandler()
  const { openAppManange } = useModalState()

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
        {selectedCctvId && <CctvDetectActivateButton />}

        <IconButton onClick={openAppManange} iconSrc={serverIcon} altText="serverIcon" />
      </div>
    </div>
  )
}
