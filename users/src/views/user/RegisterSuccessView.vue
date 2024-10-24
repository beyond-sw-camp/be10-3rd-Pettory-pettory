<script setup>
import {useRouter} from 'vue-router';
import RegisterSuccessBox from "@/components/user/RegisterSuccessBox.vue";

const router = useRouter();

// 로그인 화면으로 이동
const handleHome = () => {
  router.push('/login');
};
</script>

<template>
  <div class="register-success-view">
    <RegisterSuccessBox @home="handleHome" />
  </div>

</template>

<style scoped>
.register-success-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>