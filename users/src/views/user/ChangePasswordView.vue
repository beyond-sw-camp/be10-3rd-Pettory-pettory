<script setup>
import ChangePasswordForm from "@/components/user/ChangePasswordForm.vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth.js";
import {ref} from "vue";

const router = useRouter();
// Pinia 스토어
const authStore = useAuthStore();

const errorMessage = ref('');
const handleChangePasswordSubmit = async ({curPwd, newPwd}) => {
  try {
    const token = authStore.accessToken;
    if(!token) return;

    const ChangePasswordRequest = {
      currentUserPassword: curPwd,
      newUserPassword: newPwd
    };

    const response = await axios.put('http://localhost:8080/users/passwords', ChangePasswordRequest, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      router.push('/login');
    }
  } catch (error) {
    // 서버에서 전송된 에러 메세지 추출
    if (error.response.data.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = '다시 시도해주세요';
      console.log('비밀번호 변경 실패', error);
    }
  }
};
</script>

<template>
  <div class="change-password-view">
    <ChangePasswordForm @submit="handleChangePasswordSubmit" :errorMessage="errorMessage" />
    <RouterView />
  </div>
</template>

<style scoped>
.change-password-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>