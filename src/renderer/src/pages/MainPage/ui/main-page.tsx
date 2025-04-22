import { TopNavigation } from '../../../widgets/top-navigation'
import { ViewerContainer } from '../../../widgets/viewer-container'
import styles from './main-page.module.css'

export const MainPage = () => {
  return (
    <div className={styles.wrapper}>
      <TopNavigation></TopNavigation>

      <ViewerContainer></ViewerContainer>
      

    </div>
  )
}
