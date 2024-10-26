<script setup>
import LoginForm from "@/components/user/LoginForm.vue";
import {useRouter} from "vue-router";
import {ref} from "vue";
import axios from 'axios';
import {useAuthStore} from "@/stores/auth.js";
import BackButton from "@/components/common/BackButton.vue";

const router = useRouter();
const errorMessage = ref('');

const authStore = useAuthStore();

const handleLoginSubmit = async (formData) => {
  try {
    console.log('handleLoginSubmit 실행');

    const response = await axios.post('http://localhost:8080/login', {
      userEmail: formData.email,
      userPwd: formData.password
    },{
      withCredentials: true
    });

    if (response.status === 200) {
      // 헤더에서 토큰 추출
      authStore.login(response.headers.token);
      console.log('response.headers.token:', response.headers.token);

      console.log('authStore.login 실행');

      router.push('/'); // 로그인 성공 시 홈 화면으로 이동

    }
  } catch (error) {
    // 서버에서 전송된 에러 메세지 추출
    if (error.response.data.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = '다시 시도해주세요';
      console.log('회원가입 실패: ', error);
    }
  }
};

</script>

<template>
  <div class="login-view">
    <BackButton />
    <LoginForm @submit="handleLoginSubmit" :errorMessage="errorMessage"/>
    <RouterView />
  </div>
</template>

<style scoped>

</style>