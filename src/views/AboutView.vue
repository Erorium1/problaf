<template>
  <div class="about-us-view">
    <div class="back-button">
      <router-link to="/" class="btn-back">
        <i class="fas fa-home"></i>
      </router-link>
    </div>
    <div class="about-us-container">
      <div class="about-us-content">
        <div class="block-header">
          <h2>О НАС</h2>
        </div>

        <section class="our-mission">
          <h3>Наша Миссия</h3>
          <p>
            Привет! Мы создатели Problaf. Наша миссия - поддерживать реальное планирование карьеры, выходящее за рамки стереотипов, фокусируясь на мечтах каждого человека. Problaf, что означает Professional Path Beyond Learning, Aspiration, and Future, — это умное приложение для карьерного руководства на основе ИИ, которое помогает пользователям проектировать свое будущее за пределами образования.
          </p>
        </section>

        <section class="our-story">
          <h3>Наша История</h3>
          <p>
            Идея создания этого сервиса родилась из желания сделать процесс профориентации более доступным и информативным. Мы верим, что правильный выбор профессии - ключ к счастливой и успешной жизни. Наша команда состоит из опытных дизайнеров, разработчиков и аналитиков, которые объединили свои знания и навыки, чтобы создать этот уникальный инструмент.
          </p>
        </section>

        <section class="our-team">
          <h3>Наша Команда</h3>
          <ul class="team-members">
            <li class="team-member">
              <h4>Амалия</h4>
                <p class="team-role">Мобильный разработчик</p>
                <p class="team-bio">
                  Разрабатывает мобильное приложение Problaf, обеспечивая удобство и функциональность для пользователей на iOS и Android.
                </p>
            </li>
            <li class="team-member">
              <h4>Аружан</h4>
              <p class="team-role">Дизайнер</p>
              <p class="team-bio">
                Создает визуальный стиль и пользовательский интерфейс Problaf, делая приложение интуитивно понятным и привлекательным.
              </p>
            </li>
            <li class="team-member">
              <h4>Ляйля</h4>
              <p class="team-role">Бэкенд-разработчик</p>
              <p class="team-bio">
                Отвечает за серверную часть приложения, обеспечивая надежность и производительность Problaf.
              </p>
            </li>
            <li class="team-member">
              <h4>Балауса</h4>
              <p class="team-role">Фронтенд-разработчик</p>
              <p class="team-bio">
                Разрабатывает интерактивный интерфейс, обеспечивая плавное взаимодействие пользователей с приложением.
              </p>
            </li>
          </ul>
        </section>

        <section class="contact-us">
          <h3>Свяжитесь с нами</h3>
          <p>
            У вас есть вопросы или предложения? Свяжитесь с нами по электронной почте:
            <a href="mailto:info@example.com">info@example.com</a>
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'AboutUs',
  setup() {
    return {};
  },
};
</script>

<style scoped>
@import '@/assets/styles/survey.css';

.about-us-view {
min-height: 100vh;
background-color: #f5f7fa;
padding: 2rem 0;
}

.back-button {
position: fixed;
top: 20px;
left: 20px;
z-index: 1000;
}

.btn-back {
display: flex;
align-items: center;
justify-content: center;
width: 40px;
height: 40px;
background-color: #98a3b3;
color: white;
border-radius: 50%;
text-decoration: none;
transition: background-color 0.3s ease;
}

.btn-back:hover {
background-color: #7a8699;
}

.about-us-container {
max-width: 800px;
margin: 0 auto;
padding: 0 1rem;
}

.about-us-content {
background-color: white;
border-radius: 20px;
padding: 2rem;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.block-header {
text-align: center;
margin-bottom: 2rem;
}

.block-header h2 {
color: #333;
font-size: 1.5rem;
font-weight: bold;
}

.our-mission,
.our-story,
.our-team,
.contact-us {
margin-bottom: 2rem;
padding-bottom: 1rem;
border-bottom: 1px solid #eee;
}

.our-mission:last-child,
.our-story:last-child,
.our-team:last-child,
.contact-us:last-child {
border-bottom: none;
}

.our-mission h3,
.our-story h3,
.our-team h3,
.contact-us h3 {
color: #333;
margin-bottom: 1rem;
font-size: 1.2rem;
}

.team-members {
list-style-type: none;
padding: 0;
}

.team-member {
margin-bottom: 1.5rem;
padding: 1rem;
border-radius: 15px;
background-color: #f8f9fa;
}

.team-member h4 {
color: #333;
font-weight: bold;
margin-bottom: 0.5rem;
font-size: 1rem;
}

.team-role {
color: #777;
font-size: 0.9rem;
margin-bottom: 0.3rem;
}

.team-bio {
color: #555;
line-height: 1.6;
}

.contact-us p {
line-height: 1.6;
}

.contact-us a {
color: #98a3b3;
text-decoration: none;
}

.contact-us a:hover {
text-decoration: underline;
}
</style>