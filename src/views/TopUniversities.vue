<template>
    <div class="top-universities">
      <!-- Navigation bar -->
      <nav class="navbar navbar-light">
        <div class="container-fluid">
          <div class="d-flex align-items-center">
            <button @click="$router.go(-1)" class="btn btn-link p-0 me-3">
              <i class="fas fa-arrow-left"></i>
            </button>
            <h1 class="navbar-brand mb-0">{{ countryName }} - Топ ВУЗы</h1>
          </div>
          <div class="dropdown">
            <button class="btn btn-link p-0" type="button" data-bs-toggle="dropdown">
              <i class="fas fa-ellipsis-v"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#">Настройки</a></li>
              <li><a class="dropdown-item" href="#">Помощь</a></li>
            </ul>
          </div>
        </div>
      </nav>
  
      <!-- Main content -->
      <div class="container py-4">
        <div class="home-button mb-4">
          <router-link to="/dashboard" class="btn btn-home">
            <i class="fas fa-home"></i>
          </router-link>
        </div>
  
        <div class="university-list">
          <button 
            v-for="(university, index) in universities" 
            :key="university.id"
            class="university-button"
            @click="viewUniversity(university.id)"
          >
            <span class="university-number">{{ index + 1 }}</span>
            {{ university.name }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TopUniversities',
    data() {
      return {
        countries: [
          { code: 'US', name: 'США' },
          { code: 'CA', name: 'Канада' },
          { code: 'KR', name: 'Южная Корея' },
          { code: 'CN', name: 'Китай' },
          { code: 'HK', name: 'Гонконг' },
          { code: 'JP', name: 'Япония' },
          { code: 'DE', name: 'Германия' },
          { code: 'FR', name: 'Франция' },
          { code: 'MY', name: 'Малайзия' },
          { code: 'SG', name: 'Сингапур' }
        ],
        universityData: {
          US: [
            { id: 'US1', name: 'Harvard University', description: 'A prestigious Ivy League university known for its academic excellence and research.' },
            { id: 'US2', name: 'MIT', description: 'Massachusetts Institute of Technology, renowned for innovation in science and technology.' }
          ],
          CN: [
            { id: 'CN1', name: 'Tsinghua University', description: 'One of China\'s top universities, known for engineering and technology programs.' },
            { id: 'CN2', name: 'Peking University', description: 'A leading university in China, famous for its humanities and social sciences.' },
            { id: 'CN3', name: 'Fudan University', description: 'Located in Shanghai, Fudan is renowned for its research and global partnerships.' }
          ],
          KR: [
            { id: 'KR1', name: 'Seoul National University (SNU)', description: 'South Korea\'s top university, known for its comprehensive academic programs.' },
            { id: 'KR2', name: 'Korea University', description: 'A prestigious private university in Seoul, part of the SKY universities.' },
            { id: 'KR3', name: 'Yonsei University', description: 'One of South Korea\'s oldest universities, renowned for its medical school and global outreach.' }
          ]
        }
      }
    },
    computed: {
      countryName() {
        const code = this.$route.params.code;
        const country = this.countries.find(c => c.code === code);
        return country ? country.name : 'Страна';
      },
      universities() {
        const code = this.$route.params.code;
        return this.universityData[code] || [];
      }
    },
    methods: {
      viewUniversity(universityId) {
        this.$router.push(`/universities/${this.$route.params.code}/top/${universityId}`);
      }
    }
  }
  </script>
  
  <style scoped>
  .top-universities {
    min-height: 100vh;
    background-color: #ffffff;
  }
  
  .navbar {
    padding: 1rem;
    background-color: #fff;
  }
  
  .navbar-brand {
    font-size: 1.25rem;
    margin-bottom: 0;
  }
  
  .btn-home {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #98a3b3;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    transition: all 0.3s ease;
  }
  
  .btn-home:hover {
    background-color: #7a8699;
    transform: translateY(-2px);
  }
  
  .university-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .university-button {
    background-color: #98a3b3;
    border: none;
    border-radius: 15px;
    padding: 1rem;
    color: white;
    text-align: left;
    font-size: 1rem;
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  
  .university-button:hover {
    background-color: #7a8699;
    transform: translateY(-2px);
  }
  
  .university-number {
    background-color: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.5rem;
    border-radius: 50%;
    margin-right: 1rem;
    font-size: 0.9rem;
    min-width: 30px;
    text-align: center;
  }
  
  .btn-link {
    color: #333;
    text-decoration: none;
  }
  
  .dropdown-menu {
    border: none;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .dropdown-item {
    padding: 0.5rem 1.5rem;
  }
  
  @media (max-width: 576px) {
    .container {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }
  </style>