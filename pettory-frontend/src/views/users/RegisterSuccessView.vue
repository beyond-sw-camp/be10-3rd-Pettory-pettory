<script setup>
import {useRouter} from 'vue-router';
import RegisterSuccessBox from "@/components/users/RegisterSuccessBox.vue";
import BackButton from "@/components/common/BackButton.vue";

const router = useRouter();

// 로그인 화면으로 이동
const handleHome = () => {
  router.push('/login');
};
</script>

<template>
  <div class="register-success-view">
    <BackButton />
    <RegisterSuccessBox @home="handleHome" />
  </div>

</template>

<style scoped>
.register-success-view {
  margin-top: 40px;  /* 폼 위쪽 여백 추가 */
  margin-bottom: 100px; /* 폼 아래쪽 여백 추가 */
  display: flex;
  justify-content: center; /* 화면 가운데에 폼을 정렬 */

}
</style>