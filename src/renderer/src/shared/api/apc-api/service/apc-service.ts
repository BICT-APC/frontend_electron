import { AxiosInstance } from 'axios'
import {
  READ_APC,
  READ_APC_LOG,
  READ_APC_CONFIG,
  READ_EVENT_CONFIG,
  UPDATE_APC_CONFIG,
  UPDATE_EVENT_CONFIG,
  UPDATE_APC_SETTING_COUNT
} from '../../../constants/paths'
import { ResponseApcDto } from '../dto/response/response-apc-dto'
import { ResponseApcConfigDto } from '../dto/response/response-apc-config-dto'
import { RequestSettingApcDto } from '../dto/request/request-apc-setting-dto'
import { RequestApcConfigDto } from '../dto/request/request-apc-config-dto'
import { RequestEventConfigDto } from '../dto/request/request-event-config-dto'
import { ResponseApcLogDto } from '../dto/response/response-apc-log-dto'
import { Page } from '../../../types/pages'
import { ResponseEventConfigDto } from '../dto/response/response-event-config-dto'

export const apcService = (apcClient: AxiosInstance) => {
  const readApc = async (areaId: number): Promise<ResponseApcDto> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apcClient.get<ResponseApcDto>(READ_APC, {
        params: {
          areaId
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const readApcLog = async (
    cctvId: number,
    page: number = 0,
    size: number = 10
  ): Promise<Page<ResponseApcLogDto>> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apcClient.get<Page<ResponseApcLogDto>>(READ_APC_LOG, {
        params: {
          cctvId,
          page,
          size
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

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

  const readEventConfig = async (areaId: number): Promise<ResponseEventConfigDto> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apcClient.get<ResponseEventConfigDto>(READ_EVENT_CONFIG, {
        params: {
          areaId
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const updateSettingCount = async (dto: RequestSettingApcDto): Promise<RequestSettingApcDto> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apcClient.post<RequestSettingApcDto>(UPDATE_APC_SETTING_COUNT, dto)
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
      const response = await apcClient.post<ResponseApcConfigDto>(UPDATE_APC_CONFIG, dto, {
        params: { cctvId }
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const updateEventConfig = async (
    areaId: number,
    dto: RequestEventConfigDto
  ): Promise<ResponseEventConfigDto> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apcClient.post<ResponseEventConfigDto>(UPDATE_EVENT_CONFIG, dto, {
        params: { areaId }
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  return {
    readApc,
    readApcLog,
    readApcConfig,
    readEventConfig,
    updateRuleLine,
    updateEventConfig,
    updateSettingCount
  }
}
