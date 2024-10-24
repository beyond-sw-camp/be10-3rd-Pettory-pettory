<script setup>
import axios from "axios";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import RegisterVerifyForm from "@/components/user/RegisterVerifyForm.vue";
import {useAuthStore} from "@/stores/auth.js";

const router = useRouter();
const authStore = useAuthStore();

const handleVerifySubmit = async (verifyCode) => {
  try {
    const sendVerifyCodeRequest = {
      // Pinia 스토어에 저장된 이메일(회원가입 시 작성)
      userEmail: authStore.userEmail,
    };
    const response = await axios.post('http://localhost:8080/users/emails/codes', sendVerifyCodeRequest, {
      params: {verifyCode: verifyCode}
    });

    console.log('응답 상태:', response.status);
    console.log('응답 데이터:', response.data);

    if (response.data && response.data.result === true) {
      router.push('/new-users');
    } else {
      alert('인증 실패');
    }
  } catch (error) {
    alert('오류');
    console.error('오류 발생:', error);
    console.error('오류 응답:', error.response?.data);
  }
};

// view 로그 확인용
onMounted(() => {
  console.log('RegisterVerifyView mount 됨');
});
</script>

<template>
  <div class="register-verify-view">
    <RegisterVerifyForm @submit="handleVerifySubmit" />
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