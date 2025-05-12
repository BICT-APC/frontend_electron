import React from 'react'
import styles from './Modal.module.css'
import { ModalType } from '../model/types'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  header?: ModalType
  contentBox?: React.ReactNode
}

export const Modal = ({ isOpen, onClose, contentBox, header }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {header && <div className={styles.header}>{header}</div>}
        {contentBox && <div className={styles.content}>{contentBox}</div>}
      </div>
    </div>
  )
}
