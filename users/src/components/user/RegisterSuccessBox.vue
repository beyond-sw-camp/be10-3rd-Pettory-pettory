<script setup>
import ButtonLongColor from "@/components/common/ButtonLongColor.vue";

const emit = defineEmits(['home']);

// 홈으로 돌아가기 버튼 클릭 이벤트
const handleHomeClick = () => {
  emit('home');
};

</script>

<template>

  <div class="register-verify-form">
    <h2>회원가입 완료</h2>
      <p>*환영합니다!</p>
      <br>
      <p>펫토리에서 반려동물과 재미있게 놀아보아요!</p>
    <!-- 홈 버튼-->
    <ButtonLongColor @click="handleHomeClick">
      홈으로 돌아가기
    </ButtonLongColor>
  </div>
</template>

<style scoped>

</style>