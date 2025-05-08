import styles from './modal-log-view.module.css'
import { useApcLog } from '../lib/apc-log-hook'
import { Pagination } from '../../../features/pagination'
import { useState } from 'react'

interface ModalLogViewProps {
  cctvId?: number
}

export const ModalLogView = ({ cctvId }: ModalLogViewProps) => {
  const { apcLogs, currentPage, pageSize, handlePageChange, handlePageSizeChange } = useApcLog({
    cctvId: cctvId!
  })
  const [selectedLogIndex, setSelectedLogIndex] = useState<number | null>(null)

  const processImageUrl = (url: string | undefined) => {
    if (!url) return ''

    const modulePathIndex = url.indexOf('/human-detect-module/')
    if (modulePathIndex !== -1) {
      return url.substring(modulePathIndex)
    }
    return url
  }

  const handleLogItemClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedLogIndex === index) {
      setSelectedLogIndex(null)
    } else {
      setSelectedLogIndex(index)
    }
  }

  return (
    <div
      className={styles.logContainer}
      onClick={(e) => {
        setSelectedLogIndex(null)
        e.stopPropagation()
      }}
    >
      <div className={styles.logHeader}>
        <h3>APC 로그</h3>
        {cctvId && <span className={styles.cctvId}>CCTV ID: {cctvId}</span>}
      </div>

      <div className={styles.logContent}>
        {apcLogs?.content && apcLogs.content.length > 0 ? (
          <>
            {apcLogs.content.map((log, index) => (
              <div
                key={index}
                className={`${styles.logItem} ${selectedLogIndex === index ? styles.selectedLogItem : ''}`}
                onClick={(e) => handleLogItemClick(index, e)}
              >
                <div>{log.isIn ? 'IN' : 'OUT'}</div>
                <span>/</span>
                <div>{new Date(log.eventedDateTime).toLocaleString()}</div>
              </div>
            ))}
          </>
        ) : (
          <div className={styles.noData}>데이터가 없습니다.</div>
        )}
      </div>
      {selectedLogIndex !== null && apcLogs?.content && apcLogs.content[selectedLogIndex] && (
        <div className={styles.frameContainer}>
          <img
            src={processImageUrl(apcLogs.content[selectedLogIndex].savedFrame)}
            alt="Frame"
            className={styles.frameImage}
          />
        </div>
      )}

      {apcLogs && (
        <Pagination
          currentPage={currentPage}
          totalPages={apcLogs.totalPages}
          pageSize={pageSize}
          totalItems={apcLogs.totalElements}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  )
}
