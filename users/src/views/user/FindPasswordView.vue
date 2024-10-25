<script setup>
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import FindPasswordForm from "@/components/user/FindPasswordForm.vue";

const router = useRouter();
const userEmail = ref('');
const errorMessage = ref('');


const handleFindPasswordSubmit = async (email) => {
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
  }
};

</script>

<template>
  <div class="find-password-view">
    <FindPasswordForm @submit="handleFindPasswordSubmit" :errorMessage="errorMessage" />
    <RouterView />
  </div>
</template>

<style scoped>
.find-password-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>