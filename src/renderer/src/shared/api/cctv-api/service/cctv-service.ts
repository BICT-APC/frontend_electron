import { AxiosInstance } from 'axios'
import { GET_ALL_CCTV } from '../../../constants/paths'
import { ResponseCctvListDto } from '../dto/response-cctv-list-dto'

export const cctvService = (cctvClient: AxiosInstance) => {
  const getAllCctv = async (): Promise<ResponseCctvListDto> => {
    try {
      const response = await cctvClient.get<ResponseCctvListDto>(GET_ALL_CCTV)
      return response.data
    } catch (error) {
      throw error
    }
  }

  return {
    getAllCctv
  }
}
