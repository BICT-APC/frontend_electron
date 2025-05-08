import { useEffect, useState } from 'react'
import { readPods, readPodLogs, deletePod } from '../../../shared/api'
import { Deploy } from '../../../shared/types/app-manage'

export function useAppManage() {
  const [deployments, setDeployments] = useState<Deploy[]>([])
  const [selectedDeployment, setSelectedDeployment] = useState<string | null>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [reloadMessage, setReloadMessage] = useState<string | null>(null)

  // 모든 Pod 정보 로드
  const loadDeployments = async () => {
    setError(null)
    try {
      const data = await readPods()
      if (data && data.deployments) {
        setDeployments(data.deployments)
      } else {
        setError('배포 정보를 불러오는데 실패했습니다.')
      }
    } catch (err) {
      console.error('Error loading deployments:', err)
      setError('배포 정보를 불러오는데 오류가 발생했습니다.')
    } finally {
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
  }

  // 특정 배포의 로그 로드
  const loadLogs = async (deploymentName: string) => {
    setError(null)
    try {
      const logData = await readPodLogs(deploymentName)
      if (logData) {
        setLogs(logData)
        setSelectedDeployment(deploymentName)
      } else {
        setError(`${deploymentName}의 로그를 불러오는데 실패했습니다.`)
      }
    } catch (err) {
      console.error(`Error loading logs for ${deploymentName}:`, err)
      setError(`${deploymentName}의 로그를 불러오는데 오류가 발생했습니다.`)
    } finally {
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
  }

  // Pod 재시작
  const reloadPod = async (deploymentName: string) => {
    setError(null)
    setReloadMessage(null)
    try {
      const result = await deletePod(deploymentName)
      if (result) {
        setReloadMessage(`${deploymentName} 재시작 요청이 성공적으로 처리되었습니다.`)
        // 재시작 후 배포 목록 다시 로드
        setTimeout(() => {
          loadDeployments()
        }, 3000)
      } else {
        setError(`${deploymentName} 재시작에 실패했습니다.`)
      }
    } catch (err) {
      console.error(`Error reloading pod ${deploymentName}:`, err)
      setError(`${deploymentName} 재시작 중 오류가 발생했습니다.`)
    } finally {
      setTimeout(() => {
        setReloadMessage(null)
        setError(null)
      }, 2000)
    }
  }

  // 컴포넌트 마운트 시 배포 목록 로드
  useEffect(() => {
    loadDeployments()
  }, [])

  return {
    deployments,
    selectedDeployment,
    logs,
    error,
    reloadMessage,
    loadDeployments,
    loadLogs,
    reloadPod
  }
}
