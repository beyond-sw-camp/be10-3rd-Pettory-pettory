<script setup>
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import FindPasswordForm from "@/components/users/FindPasswordForm.vue";
import BackButton from "@/components/common/BackButton.vue";

const router = useRouter();
const errorMessage = ref('');

const LoadingState = ref(false);

const handleFindPasswordSubmit = async (email) => {
  // 백엔드 요청 보낼 때 로딩 시작
  LoadingState.value = true;
  try {

    const findPasswordRequest = {
      userEmail: email
    };

    const response = await axios.post('http://localhost:8080/users/passwords', findPasswordRequest);

    if (response.status === 200) {
      router.push('/login');
    }

  } catch (error) {
    // 서버에서 전송된 에러 메세지 추출
    if (error.response.data.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = '다시 시도해주세요';
      console.log('이메일 전송 실패', error);
    }
  } finally {
    LoadingState.value = false;  // 로딩 종료

  }
};

</script>

<template>
  <BackButton v-if="!LoadingState" />
  <div class="find-password-view">
    <div v-if="LoadingState" class="loading-spinner">잠시만 기다려 주세요...</div>
    <FindPasswordForm v-else @submit="handleFindPasswordSubmit" :errorMessage="errorMessage" />
    <RouterView />
  </div>
</template>

<style scoped>
.find-password-view {
  margin-top: 40px;  /* 폼 위쪽 여백 추가 */
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