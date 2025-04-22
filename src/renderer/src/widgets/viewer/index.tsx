import { apcConfigStore } from '../../entities/apc/apc-config-store'
import { humanDetectConfigStore } from '../../entities/human-detect/human-detect-config-stroe'
import { CctvSelectLayer } from '../../features/cctv-selecet-layer'
import { Player } from '../../features/player'
import { RoiLayer } from '../../features/roi-layer'
import { RuleLineLayer } from '../../features/rule-line-layer'
import { Cctv } from '../../shared/types/cctv'
import styles from './viewer.module.css'

interface ViewerProps {
  cctv?: Cctv
}

export const Viewer = ({ cctv }: ViewerProps) => {
  const { apcConfigList } = apcConfigStore()
  const { humanDetectConfigList } = humanDetectConfigStore()
  const apcConfig = cctv && apcConfigList.find((apcConfig) => apcConfig.cctvId === cctv.id)
  const humanDetectConfig =
    cctv && humanDetectConfigList.find((humanDetectConfig) => humanDetectConfig.cctvId === cctv.id)

  return (
    cctv && (
      <div className={styles.wrapper}>
        <Player cctv={cctv} />
        {apcConfig && <RuleLineLayer apcConfig={apcConfig} />}
        {humanDetectConfig && <RoiLayer humanDetectConfig={humanDetectConfig} />}
        <CctvSelectLayer cctv={cctv} />
      </div>
    )
  )
}
