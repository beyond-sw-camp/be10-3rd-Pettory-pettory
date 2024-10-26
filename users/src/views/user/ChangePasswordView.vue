<script setup>
import ChangePasswordForm from "@/components/user/ChangePasswordForm.vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth.js";
import {ref} from "vue";
import BackButton from "@/components/common/BackButton.vue";

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
      authStore.logout();
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
  <BackButton />
  <div class="change-password-view">
    <ChangePasswordForm @submit="handleChangePasswordSubmit" :errorMessage="errorMessage" />
    <RouterView />
  </div>
</template>

<style scoped>
.change-password-view {
  margin-bottom: 100px; /* 폼 아래쪽 여백 추가 */
  display: flex;
  justify-content: center; /* 화면 가운데에 폼을 정렬 */
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