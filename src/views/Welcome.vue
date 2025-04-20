<template>
  <div class="container h-100">
    <div class="row h-100 align-items-center justify-content-center">
      <div class="col-12 col-md-8 text-center">
        <Logo />
        
        <div class="welcome-content animate__animated animate__fadeIn">
          <h1 class="mb-4">Добро пожаловать в ProBlaf!</h1>
          
          <div class="welcome-text mb-5">
            <p class="lead mb-4">Твоя карта к успешной карьере</p>
            <p>Ты только начинаешь свой путь или хочешь найти новое направление? ProBlaf поможет тебе сделать уверенный выбор!</p>
            
            <div class="features mt-4">
              <p>Искусственный интеллект составит твой персональный карьерный план.</p>
              <p>Узнай все о профессиях, необходимых навыках и зарплатах.</p>
              <p>Исследуй лучшие ВУЗы мира и их требования.</p>
              <p>Найди свое направление, изучи нужные предметы и попробуй себя в интерактивных тестах.</p>
              <p>Свяжись с профориентологами и профессионалами, которые поделятся своим опытом.</p>
              <p>Получай моральную поддержку, мотивацию и помощь в трудную минуту.</p>
            </div>
          </div>

          <button @click="$router.push('/auth')" class="btn btn-lg btn-primary animate__animated animate__pulse animate__infinite">
            Начни свой путь к мечте прямо сейчас!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue'

export default {
  name: 'Welcome',
  components: {
    Logo
  }
}
</script>

<style scoped>
.h-100 {
  min-height: 100vh;
}
.welcome-content {
  max-width: 800px;
  margin: 0 auto;
}
.welcome-text {
  line-height: 1.6;
}
.features p {
  margin-bottom: 1rem;
}
.btn-primary {
  background-color: #007bff;
  border: none;
  padding: 15px 30px;
  transition: all 0.3s ease;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style> 