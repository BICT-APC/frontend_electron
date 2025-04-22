import { TopNavigation } from '../../../widgets/top-navigation'
import { ViewerContainer } from '../../../widgets/viewer-container'
// import { ConfigModal } from '../../../widgets/config-modal'
import { SideBar } from '../../../widgets/side-bar'
import styles from './main-page.module.css'

export const MainPage = () => {
  return (
    <div className={styles.wrapper}>
      <TopNavigation></TopNavigation>

      <div className={styles.contentWrapper}>
        <SideBar></SideBar>
        <ViewerContainer></ViewerContainer>
      </div>
    </div>
  )
}
