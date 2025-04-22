import { AxiosInstance } from 'axios'
import {
  READ_APC_CONFIG,
  READ_EVENT_CONFIG,
  UPDATE_APC_CONFIG,
  UPDATE_EVENT_CONFIG
} from '../../../constants/paths'
import { ResponseApcConfigDto } from '../dto/response/response-apc-config-dto'
import { RequestApcConfigDto } from '../dto/request/request-apc-config-dto'
import { RequestEventConfigDto } from '../dto/request/request-event-config-dto'

export const apcService = (apcClient: AxiosInstance) => {
  const readApcConfig = async (cctvId: number): Promise<ResponseApcConfigDto> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apcClient.get<ResponseApcConfigDto>(READ_APC_CONFIG, {
        params: {
          cctvId
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const readEventConfig = async (areaId: number): Promise<ResponseApcConfigDto> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apcClient.get<ResponseApcConfigDto>(READ_EVENT_CONFIG, {
        params: {
          areaId
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const updateRuleLine = async (
    cctvId: number,
    dto: RequestApcConfigDto
  ): Promise<ResponseApcConfigDto> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apcClient.post<ResponseApcConfigDto>(
        UPDATE_APC_CONFIG,
        dto,
        {
          params: { cctvId }
        }
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  const updateEventConfig = async (
    cctvId: number,
    dto: RequestEventConfigDto
  ): Promise<ResponseApcConfigDto> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apcClient.post<ResponseApcConfigDto>(
        UPDATE_EVENT_CONFIG,
        dto,
        {
          params: { cctvId }
        }
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  return {
    readApcConfig,
    readEventConfig,
    updateRuleLine,
    updateEventConfig
  }
}
