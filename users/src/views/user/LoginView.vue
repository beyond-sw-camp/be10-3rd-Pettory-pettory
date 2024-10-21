<script setup>
import LoginForm from "@/components/common/LoginForm.vue";
</script>

<template>
  <div class="login-view">
    <LoginForm />
    <RouterView />
  </div>
</template>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>