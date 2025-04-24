<template>
  <div class="container h-100">
    <div class="row h-100 align-items-center justify-content-center">
      <div class="col-12 col-md-6 text-center">
        <Logo />

        <div class="auth-content animate__animated animate__fadeIn">
          <div v-if="!showRegistration && !showLogin" class="auth-buttons">
            <button @click="showLogin = true" class="auth-button">
              Войти
            </button>
            <div class="divider">
              <span>или</span>
            </div>
            <div class="register-section">
              <p class="register-text">У вас нет аккаунта?</p>
              <button @click="showRegistration = true" class="auth-button">
                Регистрация
              </button>
            </div>
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
            <button type="submit" class="auth-button w-100" :disabled="isLoading">
              {{ isLoading ? 'Загрузка...' : 'Войти' }}
            </button>
            <button @click="showLogin = false" class="back-button">
              Вернуться назад
            </button>
          </form>

          <form v-if="showRegistration" @submit.prevent="handleRegistration" class="animate__animated animate__fadeIn">
            <div class="form-group">
              <input
                type="text"
                v-model="form.name"
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
            <button type="submit" class="auth-button w-100" :disabled="isLoading">
              {{ isLoading ? 'Загрузка...' : 'Зарегистрироваться' }}
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
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'Auth',
  components: {
    Logo
  },
  setup() {
    console.log('Auth component setup started');
    const router = useRouter();
    const authStore = useAuthStore();
    const showRegistration = ref(false);
    const showLogin = ref(false);
    const loginError = ref('');
    const registrationError = ref('');
    const isLoading = ref(false);

    const form = ref({
      name: '',
      email: '',
      password: ''
    });
    console.log('Registration form ref created:', form);

    const loginForm = ref({
      email: '',
      password: ''
    });
    console.log('Login form ref created:', loginForm);

    const handleLogin = async () => {
      console.log('handleLogin function called');
      try {
        isLoading.value = true;
        loginError.value = '';
        console.log('isLoading set to true, loginError cleared');

        console.log('Calling authStore.login with:', loginForm.value.email, loginForm.value.password);
        const loginResult = await authStore.login(
          loginForm.value.email,
          loginForm.value.password
        );
        console.log('authStore.login finished with result:', loginResult);

        console.log('Attempting to push to /dashboard');
        router.push('/dashboard');
        console.log('router.push(/dashboard) called');
      } catch (error) {
        loginError.value = error.response?.data?.message || 'Ошибка при входе';
        console.error('Error during login:', error);
      } finally {
        isLoading.value = false;
        console.log('isLoading set to false');
      }
    };

    const handleRegistration = async () => {
      console.log('handleRegistration function called');
      try {
        isLoading.value = true;
        registrationError.value = '';
        console.log('isLoading set to true, registrationError cleared');

        console.log('Calling authStore.register with:', form.value.name, form.value.email, form.value.password);
        const registrationResult = await authStore.register(
          form.value.name,
          form.value.email,
          form.value.password
        );
        console.log('authStore.register finished with result:', registrationResult);

        // После успешной регистрации показываем сообщение и возвращаемся к форме входа
        showRegistration.value = false;
        showLogin.value = true;
        loginForm.value.email = form.value.email;
        form.value = { name: '', email: '', password: '' };
        console.log('Registration successful, showing login form');

        // Показываем сообщение об успешной регистрации
        loginError.value = 'Регистрация успешна! Теперь вы можете войти в систему.';
        console.log('Registration success message set:', loginError.value);
      } catch (error) {
        registrationError.value = error.response?.data?.message || 'Ошибка при регистрации';
        console.error('Error during registration:', error);
      } finally {
        isLoading.value = false;
        console.log('isLoading set to false');
      }
    };

    return {
      showRegistration,
      showLogin,
      form,
      loginForm,
      loginError,
      registrationError,
      isLoading,
      handleLogin,
      handleRegistration
    };
  }
}
</script>

<style scoped>
/* Анимации для переходов */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.auth-content {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  transition: all 0.3s ease;
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

.auth-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.form-group {
  position: relative;
  margin-bottom: 15px;
  transition: all 0.3s ease;
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
  transition: all 0.3s ease;
}

.auth-input:focus {
  outline: none;
  border-color: #7a8699;
  transform: translateY(-2px);
}

.error-message {
  color: #dc3545;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.back-button {
  background: none;
  border: none;
  color: #98a3b3;
  margin-top: 10px;
  cursor: pointer;
  text-decoration: underline;
  transition: all 0.3s ease;
}

.back-button:hover {
  color: #7a8699;
}

.register-section {
  margin-top: 1rem;
}

.register-text {
  color: #98a3b3;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
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
</style>