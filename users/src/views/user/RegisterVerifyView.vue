<script setup>
import RegisterForm from "@/components/user/RegisterForm.vue";
import axios from "axios";
import {useRouter} from "vue-router";

const router = useRouter();

const handleVerify = async (verifyCode) => {
  try {
    // TODO: 백엔드 서버로 인증 코드 전달
    const response = await axios.post('');

    if (response.data.success()) {
      router.push('/users/emails/codes/home');
    } else {
      alert('인증 실패');
    }
  } catch (error) {
    alert('오류');
  }
};
</script>

<template>
  <div class="register-verify-view">
    <RegisterForm @click="handleVerify" />
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