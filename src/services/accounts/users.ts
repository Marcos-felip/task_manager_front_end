import axios from 'axios'
import { type User, type UserResponse } from '../../types/accounts/users'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getUsers = async (): Promise<UserResponse[]> => {
  const response = await axios.get<UserResponse[]>(`${API_BASE_URL}accounts/members/`)
  return response.data
}

export const getUserById = async (id: number): Promise<UserResponse> => {
  const response = await axios.get<UserResponse>(`${API_BASE_URL}accounts/members/${id}/`)
  return response.data
}

export const createUser = async (data: User): Promise<UserResponse> => {
  const response = await axios.post(`${API_BASE_URL}accounts/members/`, data)
  return response.data
}

export const updateUser = async (id: number, data: Partial<User>): Promise<UserResponse> => {
  const response = await axios.put(`${API_BASE_URL}accounts/members/${id}/`, data)
  return response.data
}
