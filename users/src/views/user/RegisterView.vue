<script setup>
import RegisterForm from "@/components/user/RegisterForm.vue";
</script>

<template>
  <div class="register-view">
    <RegisterForm />
    <RouterView />
  </div>
</template>

<style scoped>
.register-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>