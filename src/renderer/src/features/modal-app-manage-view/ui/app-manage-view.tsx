import { useState } from 'react'
import { useAppManage } from '../lib/use-app-manage'
import styles from './app-manage-view.module.css'

export const AppManageView = () => {
  const {
    deployments,
    selectedDeployment,
    logs,
    error,
    reloadMessage,
    loadDeployments,
    loadLogs,
    reloadPod
  } = useAppManage()

  const [expandedDeployment, setExpandedDeployment] = useState<string | null>(null)

  const handleDeploymentClick = (deploymentName: string) => {
    if (expandedDeployment === deploymentName) {
      setExpandedDeployment(null)
    } else {
      setExpandedDeployment(deploymentName)
      loadLogs(deploymentName)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>애플리케이션 관리</h2>
        <button className={styles.refreshButton} onClick={() => loadDeployments()}>
          새로고침
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}
      {reloadMessage && <div className={styles.success}>{reloadMessage}</div>}

      <div className={styles.deploymentList}>
        {deployments.map((deployment) => (
          <div key={deployment.name} className={styles.deploymentItem}>
            <div
              className={`${styles.deploymentHeader} ${expandedDeployment === deployment.name ? styles.expanded : ''}`}
              onClick={() => handleDeploymentClick(deployment.name)}
            >
              <div className={styles.deploymentInfo}>
                <span className={styles.deploymentName}>{deployment.name}</span>
                <span
                  className={`${styles.statusBadge} ${deployment.health ? styles.healthy : styles.unhealthy}`}
                >
                  {deployment.health ? '정상' : '비정상'}
                </span>
              </div>
              <div className={styles.deploymentActions}>
                <button
                  className={styles.reloadButton}
                  onClick={(e) => {
                    e.stopPropagation() // 아코디언 토글 방지
                    reloadPod(deployment.name)
                  }}
                >
                  재시작
                </button>
                <span className={styles.expandIcon}>
                  {expandedDeployment === deployment.name ? '▼' : '▶'}
                </span>
              </div>
            </div>

            {expandedDeployment === deployment.name && (
              <div className={styles.deploymentContent}>
                <div className={styles.podInfo}>
                  <h3>Pod 정보</h3>
                  <table className={styles.podTable}>
                    <thead>
                      <tr>
                        <th>이름</th>
                        <th>상태</th>
                        <th>상태값</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deployment.pods.map((pod) => (
                        <tr key={pod.name}>
                          <td>{pod.name}</td>
                          <td>{pod.health ? '정상' : '비정상'}</td>
                          <td>{pod.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className={styles.logContainer}>
                  <h3>로그</h3>
                  {selectedDeployment === deployment.name ? (
                    logs ? (
                      <pre className={styles.logs}>{logs}</pre>
                    ) : (
                      <div className={styles.noLogs}>로그가 없습니다.</div>
                    )
                  ) : null}
                </div>
              </div>
            )}
          </div>
        ))}

        {deployments.length === 0 && (
          <div className={styles.noDeployments}>배포된 애플리케이션이 없습니다.</div>
        )}
      </div>
    </div>
  )
}
