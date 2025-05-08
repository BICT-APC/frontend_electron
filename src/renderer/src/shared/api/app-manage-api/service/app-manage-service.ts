import { AxiosInstance } from 'axios'
import { POD_LOGS, POD_DETAIL, READ_DEPLOYMENTS } from '../../../constants/paths'
import type { Deploy, DeployList } from '../../../types/app-manage'

export const appManageService = (appManageClient: AxiosInstance) => {
  const readPods = async (): Promise<DeployList> => {
    try {
      const response = await appManageClient.get(READ_DEPLOYMENTS)
      return response.data
    } catch (error) {
      throw error
    }
  }

  const _readPodLogs = async (podName: string): Promise<string[]> => {
    try {
      const response = await appManageClient.get(POD_LOGS(podName))
      return response.data
    } catch (error) {
      throw error
    }
  }

  const _deletePod = async (podName: string): Promise<Map<string, Object>> => {
    try {
      const response = await appManageClient.get(POD_DETAIL(podName))
      return response.data
    } catch (error) {
      throw error
    }
  }

  const deletePod = async (deployName: string) => {
    try {
      const deploys = await readPods()
      console.log('API Response from readPods:', deploys)
      const deploy = deploys.deployments.find((deploy: Deploy) => deploy.name === deployName)

      if (!deploy) {
        console.log(`${deployName} deployment not found`)
        return null
      }

      if (!deploy.pods || deploy.pods.length === 0) {
        console.log(`No pods found for ${deployName}`)
        return null
      }

      const data: Map<string, Object> = await _deletePod(deploy.pods[0].name)
      return data
    } catch (error) {
      console.error(`Error reloading pod: ${deployName}`, error)
      return null
    }
  }

  const readPodLogs = async (deployName: string) => {
    try {
      const deploys = await readPods()
      console.log('API Response from readPods:', deploys)
      const deploy = deploys.deployments.find((deploy: Deploy) => deploy.name === deployName)

      if (!deploy) {
        console.log(`${deployName} deployment not found`)
        return null
      }

      if (!deploy.pods || deploy.pods.length === 0) {
        console.log(`No pods found for ${deployName}`)
        return null
      }

      const data: string[] = await _readPodLogs(deploy.pods[0].name)
      return data
    } catch (error) {
      console.error(`Error reading pod logs: ${deployName}`, error)
      return null
    }
  }

  return {
    readPods,
    readPodLogs,
    deletePod
  }
}
