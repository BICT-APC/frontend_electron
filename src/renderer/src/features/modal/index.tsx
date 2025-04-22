import React from 'react'
import styles from './Modal.module.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
