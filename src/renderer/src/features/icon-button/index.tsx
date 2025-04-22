import styles from './icon-button.module.css'

interface headerIconButtonProps {
  onClick: () => void
  iconSrc: string
  altText: string
  disabled?: boolean
}

export const IconButton = ({ onClick, iconSrc, altText }: headerIconButtonProps) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <img src={iconSrc} alt={altText} />
    </div>
  )
}
