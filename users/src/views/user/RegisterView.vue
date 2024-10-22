<script setup>
import RegisterForm from "@/components/user/RegisterForm.vue";
import axios from "axios";
import {useRouter} from "vue-router";

const router = useRouter();

const handleRegister = async (formData) => {
  try {
    // 백엔드 서버로 회원가입 데이터 전달
    const response = await axios.post('', formData);

    if (response.data.success()) {
      router.push('/users/emails/codes');
    } else {
      alert('회원가입 실패');
    }
  } catch(error) {
    alert('오류');
  }
};
</script>

<template>
  <div class="register-view">
    <RegisterForm @submit="handleRegister" />
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