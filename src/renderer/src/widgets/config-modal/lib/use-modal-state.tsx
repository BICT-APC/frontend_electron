import { useState, useCallback } from 'react'

export const useModalState = () => {
  const [modalState, setModalState] = useState('None')
  const [isOpen, setIsOpen] = useState(false)
  const [cctvId, setCctvId] = useState<number | null>(null)

  const openHumanConfig = useCallback((cctvId: number) => {
    setModalState('human')
    setIsOpen(true)
    setCctvId(cctvId)
  }, [])

  const openApcConfig = useCallback((cctvId: number) => {
    setModalState('apc')
    setIsOpen(true)
    setCctvId(cctvId)
  }, [])

  //   const openResetConfig = useCallback(() => {
  //     setModalState('reset')
  //     setIsOpen(true)
  //   }, [])

  const onClose = useCallback(() => {
    setModalState('None')
    setIsOpen(false)
  }, [])

  return {
    modalState,
    isOpen,
    cctvId,
    openHumanConfig,
    openApcConfig,
    setCctvId,
    onClose
  }
}
