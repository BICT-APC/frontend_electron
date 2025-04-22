import { cctvConfigHook } from '../../cctv-config-button'
import { cctvSelectStore } from '../model/cctv-selecet-store'

export const cctvSelectHook = (cctvId: number) => {
  const { selectedCctvId, setSelectedCctvId, clearSelectedCctvId } = cctvSelectStore()

  const { hideExtraButtonHandler } = cctvConfigHook()

  const cctvSelectHandler = () => {
    if (selectedCctvId === null) {
      setSelectedCctvId(cctvId)
    } else if (selectedCctvId === cctvId) {
      clearSelectedCctvId()
      hideExtraButtonHandler()
    }
  }

  return {
    cctvSelectHandler
  }
}
