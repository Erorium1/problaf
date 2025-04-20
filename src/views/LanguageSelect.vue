<template>
  <div class="container h-100">
    <div class="row h-100 align-items-center justify-content-center">
      <div class="col-12 col-md-6 text-center">
        <Logo />
        
        <div class="language-selection animate__animated animate__fadeInUp">
          <h2 class="mb-4">Выберите язык</h2>
          
          <div class="d-grid gap-3">
            <button @click="selectLanguage('kz')" class="btn btn-lg btn-secondary">
              Қазақ тілі
            </button>
            <button @click="selectLanguage('ru')" class="btn btn-lg btn-secondary">
              Русский
            </button>
            <button @click="selectLanguage('en')" class="btn btn-lg btn-secondary">
              English
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'LanguageSelect',
  components: {
    Logo
  },
  setup() {
    const router = useRouter()

    const selectLanguage = (lang) => {
      localStorage.setItem('language', lang)
      router.push('/welcome')
    }

    return {
      selectLanguage
    }
  }
}
</script>

<style scoped>
.h-100 {
  min-height: 100vh;
}
.btn-secondary {
  background-color: #6c757d;
  border: none;
  padding: 15px 30px;
  transition: all 0.3s ease;
}
.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style> 