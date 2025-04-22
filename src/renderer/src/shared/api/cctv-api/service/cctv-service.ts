import { AxiosInstance } from 'axios'
import { READ_ALL_AREA, READ_ALL_CCTV } from '../../../constants/paths'
import { ResponseCctvListDto } from '../dto/response-cctv-list-dto'
import { ResponseAreaListDto } from '../dto/reasponse-area-list-dto'

export const cctvService = (cctvClient: AxiosInstance) => {

  const readAllCctv = async (): Promise<ResponseCctvListDto> => {
    try {
      const response = await cctvClient.get<ResponseCctvListDto>(READ_ALL_CCTV)
      return response.data
    } catch (error) {
      throw error
    }
  }

  const readAllArea = async (): Promise<ResponseAreaListDto> => {

    try {
      const response = await cctvClient.get<ResponseAreaListDto>(READ_ALL_AREA)
      return response.data
    } catch (error) {
      throw error
    }
  }
  

  return {
    readAllArea,
    readAllCctv
  }
}
