<script setup>
import RegisterForm from "@/components/user/RegisterForm.vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {useAuthStore} from "@/stores/auth.js";

const router = useRouter();
const LoadingState = ref(false);
const authStore = useAuthStore();

const handleRegisterSubmit = async (formData) => {
  // 백엔드 요청 보낼 때 로딩 시작
  LoadingState.value = true;
  try {
    // 백엔드 서버로 회원가입 데이터 전달
    const response = await axios.post('http://localhost:8080/users', {
      userEmail: formData.userEmail,
      userNickname: formData.userNickname,
      userName: formData.userName,
      userPassword: formData.userPassword,
      userBirth: formData.userBirth
    });

    if (response.status === 201) {
      console.log('회원가입 성공');
      // 회원가입 성공 시 Pinia 스토어에 해당 이메일 저장
      authStore.registerEmail(formData.userEmail);

      router.push('/users/emails/codes');
    } else {
      alert('회원가입 실패');
    }
  } catch(error) {
    console.log('에러: ', error);
    alert('오류');
  } finally {
    LoadingState.value = false;  // 로딩 종료
  }
};
</script>

<template>
  <div class="register-view">
    <div v-if="LoadingState" class="loading-spinner">잠시만 기다려 주세요...</div>
    <RegisterForm v-else @submit="handleRegisterSubmit" />
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

.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #666;
}

</style>