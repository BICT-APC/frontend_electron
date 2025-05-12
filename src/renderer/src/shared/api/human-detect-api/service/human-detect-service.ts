import { AxiosInstance } from 'axios'
import {
  ACTIVATE_HUMAN_DETECT,
  DEACTIVATE_HUMAN_DETECT,
  READ_HUMAN_DETECT_CONFIG,
  UPDATE_HUMAN_DETECT_CONFIG
} from '../../../constants/paths'
import { ResponseHumanDetectConfigDto } from '../dto/response-human-detect-config-dto'
import { RequestPutHumanDetectConfigDto } from '../dto/request-put-human-detect-config-dto'

export const humanDetectService = (humanDetectClient: AxiosInstance) => {
  const readHumanDetectConfig = async (cctvId: number): Promise<ResponseHumanDetectConfigDto> => {
    try {
      const response = await humanDetectClient.get<ResponseHumanDetectConfigDto>(
        READ_HUMAN_DETECT_CONFIG,
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

  const updateHumanDetectConfig = async (
    cctvId: number,
    configData: RequestPutHumanDetectConfigDto
  ): Promise<ResponseHumanDetectConfigDto> => {
    try {
      const response = await humanDetectClient.post<ResponseHumanDetectConfigDto>(
        UPDATE_HUMAN_DETECT_CONFIG,
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

  const activateHumanDetect = async (cctvId: number): Promise<ResponseHumanDetectConfigDto> => {
    try {
      const response = await humanDetectClient.get<ResponseHumanDetectConfigDto>(
        ACTIVATE_HUMAN_DETECT,
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

  const deactivateHumanDetect = async (cctvId: number): Promise<ResponseHumanDetectConfigDto> => {
    try {
      const response = await humanDetectClient.get<ResponseHumanDetectConfigDto>(
        DEACTIVATE_HUMAN_DETECT,
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

  return {
    readHumanDetectConfig,
    updateHumanDetectConfig,
    activateHumanDetect,
    deactivateHumanDetect
  }
}
