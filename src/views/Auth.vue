<template>
  <div class="container h-100">
    <div class="row h-100 align-items-center justify-content-center">
      <div class="col-12 col-md-6 text-center">
        <Logo />
        
        <div class="auth-content animate__animated animate__fadeIn">
          <div v-if="!showRegistration && !showLogin" class="auth-buttons">
            <button @click="showRegistration = true" class="auth-button">
              Регистрация
            </button>
            <button @click="loginWithGoogle" class="auth-button google-button">
              <img src="@/assets/google-icon.svg" alt="Google" class="me-2" style="width: 20px;">
              Войти через <span class="google-text">G</span><span class="google-text" style="color: #EA4335;">o</span><span class="google-text" style="color: #FBBC05;">o</span><span class="google-text" style="color: #34A853;">g</span><span class="google-text" style="color: #EA4335;">l</span><span class="google-text">e</span>
            </button>
            <div class="divider">
              <span>или</span>
            </div>
            <button @click="showLogin = true" class="auth-button">
              Войти
            </button>
          </div>

          <form v-if="showLogin" @submit.prevent="handleLogin" class="animate__animated animate__fadeIn">
            <div class="form-group">
              <input 
                type="email" 
                v-model="loginForm.email" 
                class="auth-input" 
                placeholder="Email адрес"
                required
              >
            </div>
            <div class="form-group">
              <input 
                type="password" 
                v-model="loginForm.password" 
                class="auth-input" 
                placeholder="Пароль"
                required
              >
            </div>
            <div v-if="loginError" class="error-message mb-3">
              {{ loginError }}
            </div>
            <button type="submit" class="auth-button w-100">
              Войти
            </button>
            <button @click="showLogin = false" class="back-button">
              Вернуться назад
            </button>
          </form>

          <form v-if="showRegistration" @submit.prevent="handleRegistration" class="animate__animated animate__fadeIn">
            <div class="form-group">
              <input 
                type="text" 
                v-model="form.fullName" 
                class="auth-input" 
                placeholder="Полное имя"
                required
              >
            </div>
            <div class="form-group">
              <input 
                type="email" 
                v-model="form.email" 
                class="auth-input" 
                placeholder="Email адрес"
                required
              >
            </div>
            <div class="form-group">
              <input 
                type="password" 
                v-model="form.password" 
                class="auth-input" 
                placeholder="Пароль"
                required
              >
            </div>
            <div v-if="registrationError" class="error-message mb-3">
              {{ registrationError }}
            </div>
            <button type="submit" class="auth-button w-100">
              Зарегистрироваться
            </button>
            <button @click="showRegistration = false" class="back-button">
              Вернуться назад
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Logo from '@/components/Logo.vue'
import usersData from '@/data/users.json'

export default {
  name: 'Auth',
  components: {
    Logo
  },
  setup() {
    const router = useRouter()
    const showRegistration = ref(false)
    const showLogin = ref(false)
    const loginError = ref('')
    const registrationError = ref('')

    const form = ref({
      fullName: '',
      email: '',
      password: ''
    })

    const loginForm = ref({
      email: '',
      password: ''
    })

    const loginWithGoogle = () => {
      // Implement Google OAuth login
      localStorage.setItem('isAuthenticated', 'true')
      router.push('/dashboard')
    }

    const handleLogin = () => {
      const user = usersData.users.find(u => 
        u.email === loginForm.value.email && 
        u.password === loginForm.value.password
      )

      if (user) {
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('currentUser', JSON.stringify(user))
        loginError.value = ''
        router.push('/dashboard')
      } else {
        loginError.value = 'Неверный email или пароль'
      }
    }

    const handleRegistration = () => {
      const userExists = usersData.users.some(u => u.email === form.value.email)
      
      if (userExists) {
        registrationError.value = 'Пользователь с таким email уже существует'
        return
      }

      // В реальном приложении здесь был бы API запрос для регистрации
      const newUser = {
        id: usersData.users.length + 1,
        ...form.value
      }
      
      usersData.users.push(newUser)
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('currentUser', JSON.stringify(newUser))
      registrationError.value = ''
      router.push('/dashboard')
    }

    return {
      showRegistration,
      showLogin,
      form,
      loginForm,
      loginError,
      registrationError,
      loginWithGoogle,
      handleLogin,
      handleRegistration
    }
  }
}
</script>

<style scoped>
.auth-content {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.auth-button {
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  border: none;
  border-radius: 25px;
  background-color: #98a3b3;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.auth-button:hover {
  background-color: #7a8699;
  transform: translateY(-2px);
}

.google-button {
  background-color: white;
  border: 2px solid #98a3b3;
  color: #333;
}

.google-text {
  font-weight: bold;
  color: #4285F4;
}

.auth-input {
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  border: 2px solid #98a3b3;
  border-radius: 25px;
  background-color: #98a3b3;
  color: white;
  font-size: 16px;
}

.auth-input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}

.auth-input:focus {
  outline: none;
  border-color: #7a8699;
}

.divider {
  text-align: center;
  margin: 20px 0;
  position: relative;
}

.divider::before,
.divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background-color: #98a3b3;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  background-color: white;
  padding: 0 10px;
  color: #98a3b3;
  font-size: 14px;
}

.back-button {
  background: none;
  border: none;
  color: #98a3b3;
  margin-top: 10px;
  cursor: pointer;
  text-decoration: underline;
}

.error-message {
  color: #dc3545;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 15px;
}

.form-group {
  position: relative;
  margin-bottom: 15px;
}
</style> 