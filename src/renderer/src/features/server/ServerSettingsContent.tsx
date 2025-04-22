import React, { useState } from 'react'
import styles from './sever.module.css'

// 임시 서버 데이터
const mockServers = [
  { id: 1, name: 'CCTV (백엔드 서비스)' },
  { id: 2, name: 'AREA (백엔드 서비스)' },
  { id: 3, name: 'HUMAN (백엔드 서비스)' },
  { id: 4, name: 'BFF (백엔드 서비스)' },
  { id: 5, name: 'UI/UX (프론트 서비스)' }
]

export const Server: React.FC = () => {
  const [selectedServerId, setSelectedServerId] = useState<number>(1)

  // 구멍: 서버 재시작
  const handleRestartServer = () => {}

  // 구멍: 서버 상태 확인
  const handleCheckStatus = () => {}

  // 구멍: 서버 로그 보기
  const handleViewLogs = () => {}

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Server Settings</h2>
      <div className={styles.selectWrapper}>
        <label className={styles.label}>서버 선택:</label>
        <select
          value={selectedServerId}
          onChange={(e) => setSelectedServerId(Number(e.target.value))}
          className={styles.select}
        >
          {mockServers.map((server) => (
            <option key={server.id} value={server.id}>
              {server.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.actionButton} onClick={handleRestartServer}>
          서버 재시작
        </button>
        <button className={styles.actionButton} onClick={handleCheckStatus}>
          상태 확인
        </button>
        <button className={styles.actionButton} onClick={handleViewLogs}>
          로그 보기
        </button>
      </div>
    </div>
  )
}
