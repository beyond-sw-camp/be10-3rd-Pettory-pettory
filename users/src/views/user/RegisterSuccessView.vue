<script setup>
import {useRouter} from 'vue-router';
import RegisterSuccessBox from "@/components/user/RegisterSuccessBox.vue";

const router = useRouter();

// 홈으로 이동
const handleHome = () => {
  router.push('/');
};
</script>

<template>
  <div class="register-success-view">
    <RegisterSuccessBox @home="handleHome" />
  </div>

</template>

<style scoped>

</style>