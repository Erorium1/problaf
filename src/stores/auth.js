import { defineStore } from 'pinia'
import { authService } from '@/services/api'
import { db } from '@/firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

export const useAuthStore = defineStore('auth', {
  state: () => {
    const storedUser = localStorage.getItem('user')
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      token: localStorage.getItem('token') || null,
      isAuthenticated: !!localStorage.getItem('token'),
      testAnalysis: null
    }
  },

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
        // Создаём/обновляем документ пользователя в Firestore (коллекция создастся автоматически)
        await this.syncUserToFirestore(response.user)
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
          localStorage.setItem('user', JSON.stringify(response))
          // На всякий случай синхронизируем профиль с Firestore
          await this.syncUserToFirestore(response)
          return true
        } catch (error) {
          this.logout()
          return false
        }
      }
      return false
    },

    async syncUserToFirestore(user) {
      try {
        if (!user || (!user.id && !user._id)) {
          return
        }
        const userId = String(user.id || user._id)

        await setDoc(
          doc(db, 'users', userId),
          {
            name: user.name || '',
            email: user.email || '',
            role: user.role || 'user',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          },
          { merge: true }
        )
      } catch (error) {
        // Не ломаем регистрацию, если Firestore недоступен
        console.error('Failed to sync user to Firestore:', error)
      }
    },

    setTestAnalysis(analysis) {
      this.testAnalysis = analysis;
    },
    
    clearTestAnalysis() {
      this.testAnalysis = null;
    }
  }
}) 