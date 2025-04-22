import { AxiosInstance } from 'axios'
import {
  GET_HUMAN_DETECT_CONFIG_BY_CCTV,
  PUT_HUMAN_DETECT_CONFIG_BY_CCTV
} from '../../../constants/paths'
import { ResponseHumanDetectConfigDto } from '../dto/response-human-detect-config-dto'
import { RequestPutHumanDetectConfigDto } from '../dto/request-put-human-detect-config-dto'

export const humanDetectService = (humanDetectClient: AxiosInstance) => {
  const getHumanDetectConfigByCctvId = async (
    cctvId: number
  ): Promise<ResponseHumanDetectConfigDto> => {
    try {
      const response = await humanDetectClient.get<ResponseHumanDetectConfigDto>(
        GET_HUMAN_DETECT_CONFIG_BY_CCTV,
        {
          params: {
            cctvId
          }
        }
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  const putHumanDetectRoiByCctvId = async (
    cctvId: number,
    configData: RequestPutHumanDetectConfigDto
  ): Promise<ResponseHumanDetectConfigDto> => {
    try {
      console.log(configData)
      const response = await humanDetectClient.put<ResponseHumanDetectConfigDto>(
        PUT_HUMAN_DETECT_CONFIG_BY_CCTV,
        configData,
        {
          params: {
            cctvId
          }
        }
      )
      console.log(response.data)
      return response.data
    } catch (error) {
      throw error
    }
  }

  return {
    getHumanDetectConfigByCctvId,
    putHumanDetectRoiByCctvId
  }
}
