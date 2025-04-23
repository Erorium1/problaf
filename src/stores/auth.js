import { defineStore } from 'pinia'
import { authService } from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token')
  }),

  actions: {
    async login(email, password) {
      try {
        const response = await authService.login(email, password)
        this.setAuth(response)
        return response
      } catch (error) {
        throw error
      }
    },

    async register(name, email, password) {
      try {
        const response = await authService.register(name, email, password)
        this.setAuth(response)
        return response
      } catch (error) {
        throw error
      }
    },

    setAuth(response) {
      this.user = response.user
      this.token = response.token
      this.isAuthenticated = true
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
    },

    async logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      authService.logout()
    },

    async checkAuth() {
      if (this.token) {
        try {
          const response = await authService.getMe()
          this.user = response
          return true
        } catch (error) {
          this.logout()
          return false
        }
      }
      return false
    }
  }
}) 