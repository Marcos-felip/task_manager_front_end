import axios from 'axios'
import { refreshAuthToken } from './authService'

let isRefreshing = false
let failedQueue: Array<{ resolve: (value: string) => void; reject: (reason?: unknown) => void }> =
  []

const processQueue = (error: unknown, token?: string) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else if (token) {
      resolve(token)
    } else {
      reject(new Error('Nenhum token fornecido'))
    }
  })
  failedQueue = []
}

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`
            return axios(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      const refreshToken = localStorage.getItem('refresh_token')
      if (!refreshToken) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/signin'
        return Promise.reject(error)
      }

      try {
        const response = await refreshAuthToken({ refresh: refreshToken })
        const newAccessToken = response.access
        localStorage.setItem('access_token', newAccessToken)
        localStorage.setItem('refresh_token', response.refresh)

        processQueue(null, newAccessToken)
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
        return axios(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/signin'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  },
)

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)
