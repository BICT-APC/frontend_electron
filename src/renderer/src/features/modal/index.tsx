import React from 'react'
import styles from './Modal.module.css'
import { ModalType } from '../../shared/modal'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  header?: ModalType
  logBox?: React.ReactNode
  contentBox?: React.ReactNode
}

export const Modal = ({ isOpen, onClose, logBox, contentBox, header }: ModalProps) => {
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
        {logBox && <div className={styles.logBox}>{logBox}</div>}
        {contentBox && <div className={styles.content}>{contentBox}</div>}
      </div>
    </div>
  )
}
