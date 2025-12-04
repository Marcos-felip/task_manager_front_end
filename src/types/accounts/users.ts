export interface User {
  full_name: string
  email: string
  role: string
  password: string
  organization_key: string
}

export interface UserResponse {
  id: number
  first_name: string
  last_name: string
  email: string
  role: string
  status: boolean
}
