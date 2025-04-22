import { AxiosInstance } from 'axios'
import {
  READ_APC_CONFIG_BY_CCTV_ID,
  READ_EVENT_CONFIG_BY_AREA_ID,
  UPDATE_APC_CONFIG_BY_CCTV_ID,
  UPDATE_EVENT_CONFIG_BY_AREA_ID
} from '../../../constants/paths'
import { ResponseApcConfigDto } from '../dto/response/response-apc-config-dto'
import { RequestApcConfigDto } from '../dto/request/request-apc-config-dto'
import { RequestEventConfigDto } from '../dto/request/request-event-config-dto'

export const apcService = (apcClient: AxiosInstance) => {
  const readApcConfigByCctvId = async (cctvId: number): Promise<ResponseApcConfigDto> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apcClient.get<ResponseApcConfigDto>(READ_APC_CONFIG_BY_CCTV_ID, {
        params: {
          cctvId
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const readEventConfigByCctvId = async (areaId: number): Promise<ResponseApcConfigDto> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apcClient.get<ResponseApcConfigDto>(READ_EVENT_CONFIG_BY_AREA_ID, {
        params: {
          areaId
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const updateRuleLineCctvId = async (
    cctvId: number,
    dto: RequestApcConfigDto
  ): Promise<ResponseApcConfigDto> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apcClient.post<ResponseApcConfigDto>(
        UPDATE_APC_CONFIG_BY_CCTV_ID,
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

  const updateEventConfigCctvId = async (
    cctvId: number,
    dto: RequestEventConfigDto
  ): Promise<ResponseApcConfigDto> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apcClient.post<ResponseApcConfigDto>(
        UPDATE_EVENT_CONFIG_BY_AREA_ID,
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
    readApcConfigByCctvId,
    readEventConfigByCctvId,
    updateRuleLineCctvId,
    updateEventConfigCctvId
  }
}
