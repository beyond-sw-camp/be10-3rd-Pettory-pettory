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
      <p>환영합니다!</p>
      <br>
      <p>펫토리에서 반려동물과 재미있게 놀아보아요!</p>
    <!-- 홈 버튼-->
    <ButtonLongColor @click="handleHomeClick">
      로그인하기
    </ButtonLongColor>
  </div>
</template>

<style scoped>
.register-verify-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.form-group p {
  text-align: left;
  font-weight: bold;
  font-size: 14px;
}
</style>