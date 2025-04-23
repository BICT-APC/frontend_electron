import styles from './side-bar.module.css'
import { cctvStore } from '../../../entities/cctv/cctv-store'
import { CctvMonitorBox } from '../../../features/cctv-monitor-box'
import { useApcData } from '../lib/use-apc-data'
import { useMemo } from 'react'

export const SideBar = () => {
  const { cctvList, areaList } = cctvStore()
  const areaIds = useMemo(() => areaList.map((area) => area.id), [areaList])
  const { apcData } = useApcData(areaIds)

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>APC 카운트</div>
      <div className={styles.content}>
        {areaList.map((area) => {
          const areaCctvs = area.cctvIdList
            .map((cctvId) => cctvList.find((cctv) => cctv.id === cctvId))
            .filter(Boolean)
          const apcForArea = apcData.find((data) => data.areaId === area.id)
          return (
            <div key={area.id} className={styles.areaGroup}>
              <div className={styles.areaName}>
                <div>{area.name}</div>
                <div className={styles.apcCount}>
                  <div className={styles.redText}>In</div>
                  <div className={styles.blueText}>Out</div>
                  <div className={styles.blackText}>Total</div>
                </div>
                <div className={styles.apcCount}>
                  <div className={styles.blackText}>{apcForArea?.in || 0}</div>
                  <span>/</span>
                  <div className={styles.blackText}>{apcForArea?.out || 0} </div>
                  <span>/</span>
                  <div className={styles.blackText}>{apcForArea?.total || 0}</div>
                </div>
                {/* <div className={styles.configButton}>리셋 시간 설정</div> */}
                {/* <div>human-config</div> */}
              </div>
              {areaCctvs.length === 0 && <div className={styles.noCctv}>CCTV 없음</div>}
              {areaCctvs.map((cctv, idx) => (
                <CctvMonitorBox cctvName={cctv!.name} key={`monitor-box-${idx}`}/>
              ))}
            </div>
          )
        })}
      </div>
    </aside>
  )
}
