import { AxiosInstance } from 'axios'
import {
  LOGIN,
  SIGNUP,
  DELETE_USER,
  UPDATE_USER,
  GET_USER,
  GET_USERS
} from '../../../constants/paths'
import { RequestLoginDto, RequestSignupDto, RequestUpdateUserDto } from '../dto/request-auth-dto'
import { ResponseLoginDto, ResponseUserDto } from '../dto/response-auth-dto'

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

  const signup = async (dto: RequestSignupDto): Promise<string> => {
    try {
      const res = await authClient.post<string>(SIGNUP, dto)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUser = async (username: string): Promise<string> => {
    try {
      const res = await authClient.delete<string>(`${DELETE_USER}/${username}`)
      return res.data
    } catch (error) {
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

  const getUser = async (): Promise<ResponseUserDto> => {
    try {
      const res = await authClient.get<ResponseUserDto>(GET_USER)
      return res.data
    } catch (error) {
      throw error
    }
  }

  const getUsers = async (): Promise<ResponseUserDto[]> => {
    try {
      const res = await authClient.get<ResponseUserDto[]>(GET_USERS)
      return res.data
    } catch (error) {
      throw error
    }
  }

  return {
    login,
    signup,
    deleteUser,
    updateUser,
    getUser,
    getUsers
  }
}
