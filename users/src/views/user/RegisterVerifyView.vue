<script setup>
import RegisterVerifyForm from "@/components/user/RegisterVerifyForm.vue";
</script>

<template>
  <div class="register-verify-view">
    <RegisterVerifyForm />
    <RouterView />
  </div>
</template>

<style scoped>
.register-verify-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>