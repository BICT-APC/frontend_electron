import styles from './side-bar.module.css'
import { useMemo } from 'react'
import { cctvStore } from '../../../entities/cctv/cctv-store'
import { SideBarCctvBox } from '../../../features/side-bar-cctv-box/ui/side-bar-cctv-box'
import { SideBarAreaBox } from '../../../features/side-bar-area-box'
import { useApcData } from '../lib/use-apc-data'
import { useModalState } from '../../../shared/modal'

export const SideBar = () => {
  const { cctvList, areaList } = cctvStore()
  const areaIds = useMemo(() => areaList.map((area) => area.id), [areaList])
  const { apcData } = useApcData(areaIds)
  const { openHumanConfig } = useModalState()

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>APC 카운트</div>
      <div className={styles.content}>
        {areaList.map((area) => {
          const areaCctvs = area.cctvIdList
            .map((cctvId) => cctvList.find((cctv) => cctv.id === cctvId))
            .filter(Boolean)
          const apcAreaData = apcData.find((data) => data.areaId === area.id)
          return (
            <div key={area.id} className={styles.areaGroup}>
              <SideBarAreaBox areaId={area.id} areaName={area.name} apcData={apcAreaData} />
              {areaCctvs.length === 0 && <div className={styles.noCctv}>CCTV 없음</div>}
              {areaCctvs.map((cctv, idx) => (
                <SideBarCctvBox
                  cctvName={cctv!.name}
                  onClick={(e) => {
                    e.stopPropagation() // 이벤트 전파 방지
                    openHumanConfig(cctv!.id)
                  }}
                  key={`monitor-box-${idx}`}
                />
              ))}
            </div>
          )
        })}
      </div>
    </aside>
  )
}
