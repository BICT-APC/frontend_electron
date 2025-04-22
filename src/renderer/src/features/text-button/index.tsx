import styles from './text-button.module.css'
interface TextButtonProps {
  children: React.ReactNode
  onClick: () => void
  isActive?: boolean
}
export const TextButton = ({ children, onClick, isActive = false }: TextButtonProps) => {
  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.textButton} ${isActive ? styles.active : ''}`} // isActive에 따라 클래스 동적 추가
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )
}
