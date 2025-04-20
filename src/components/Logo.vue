<template>
  <div class="logo-container text-center mb-4 animate__animated animate__fadeIn">
    <img src="@/assets/logo.svg" alt="ProBlaf Logo" class="img-fluid" style="max-width: 200px;">
    <div class="logo-text">
      <span class="pro">PRO</span>
      <span class="blaf">BLAF</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style scoped>
.logo-container {
  padding: 20px;
}
.logo-text {
  font-size: 12px;
  letter-spacing: 2px;
  margin-top: 5px;
}
.pro, .blaf {
  color: #000;
  font-weight: 500;
}
</style> 