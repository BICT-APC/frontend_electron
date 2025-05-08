import axios from 'axios'
import { APP_MANAGE_API } from '../../constants/paths'
import { appManageService } from './service/app-manage-service'

const appManageClient = axios.create({
  baseURL: APP_MANAGE_API,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const { readPods, readPodLogs, deletePod } = appManageService(appManageClient)
