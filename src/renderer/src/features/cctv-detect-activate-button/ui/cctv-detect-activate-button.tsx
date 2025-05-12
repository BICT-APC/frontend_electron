import { cctvSelectStore } from '@renderer/features/cctv-selecet-layer'
import { cameraDetectOff, cameraDetectOn } from '@renderer/shared/assets/image'
import { IconButton } from '@renderer/features/icon-button'
import { useCctvDetectActivate } from '../lib/cctv-detect-activate-hook'

export const CctvDetectActivateButton = () => {
  const { selectedCctvId } = cctvSelectStore()

  const { isActivate, toggleDetectStatus } = useCctvDetectActivate({
    cctvId: selectedCctvId
  })

  const isDisabled = !selectedCctvId

  return (
    <>
      {!isActivate && (
        <IconButton
          onClick={toggleDetectStatus}
          iconSrc={cameraDetectOn}
          altText="cameraDetectOnIcon"
          disabled={!isDisabled}
        />
      )}
      {isActivate && (
        <IconButton
          onClick={toggleDetectStatus}
          iconSrc={cameraDetectOff}
          altText="cameraDetectOffIcon"
          disabled={isDisabled}
        />
      )}
    </>
  )
}
