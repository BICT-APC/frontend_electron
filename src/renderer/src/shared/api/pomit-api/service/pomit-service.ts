import { AxiosInstance } from 'axios'
import { GET_REFRESH } from '../../../constants/paths'
import { ResponseRefreshDto } from '../dto/response-refresh-dto'

export const pomitService = (pomitClient: AxiosInstance) => {
  const getRefresh = async (): Promise<ResponseRefreshDto> => {
    try {
      const response = await pomitClient.get(GET_REFRESH)
      return response.data
    } catch (error) {
      throw error
    }
  }

  return {
    getRefresh
  }
}
