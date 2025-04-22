import { AxiosInstance } from 'axios'
import { GET_APC_CONFIG_BY_CCTV_ID, PUT_APC_RULE_LINE_BY_CCTV_ID } from '../../../constants/paths'
import { RequestPutRuleLineDto } from '../dto/request-put-rule-line-dto'
import { ResponseApcConfigDto } from '../dto/response-apc-config-dto'

export const apcService = (apcClient: AxiosInstance) => {
  const getApcConfigByCctvId = async (cctvId: number): Promise<ResponseApcConfigDto> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apcClient.get<ResponseApcConfigDto>(GET_APC_CONFIG_BY_CCTV_ID, {
        params: {
          cctvId
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const putRuleLineCctvId = async (
    cctvId: number,
    configData: RequestPutRuleLineDto
  ): Promise<ResponseApcConfigDto> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apcClient.put<ResponseApcConfigDto>(
        PUT_APC_RULE_LINE_BY_CCTV_ID,
        configData,
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
    putRuleLineCctvId,
    getApcConfigByCctvId
  }
}
