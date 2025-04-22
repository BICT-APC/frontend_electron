import { AxiosInstance } from 'axios'
import { LOGIN, UPDATE_USER } from '../../../constants/paths'
import { RequestLoginDto, RequestUpdateUserDto } from '../dto/request-auth-dto'
import { ResponseLoginDto } from '../dto/response-auth-dto'

export const authService = (authClient: AxiosInstance, publicClient: AxiosInstance) => {
  const login = async (dto: RequestLoginDto): Promise<ResponseLoginDto> => {
    try {
      const res = await publicClient.post<ResponseLoginDto>(LOGIN, dto)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const updateUser = async (dto: RequestUpdateUserDto): Promise<string> => {
    try {
      const res = await authClient.patch<string>(UPDATE_USER, dto)
      return res.data
    } catch (error) {
      throw error
    }
  }

  return {
    login,
    updateUser
  }
}
