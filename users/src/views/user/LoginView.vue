<script setup>
import LoginForm from "@/components/user/LoginForm.vue";
import {useRouter} from "vue-router";
import {ref} from "vue";
import axios from 'axios';
import {useAuthStore} from "@/stores/auth.js";

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
    console.error("로그인 실패:", error);
    errorMessage.value = '로그인 실패. 다시 시도해주세요.';
  }
};

</script>

<template>
  <div class="login-view">
    <LoginForm @submit="handleLoginSubmit" />
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