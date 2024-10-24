<script setup>
import ButtonLongColor from "@/components/common/ButtonLongColor.vue";
import InputBoxLongGray from "@/components/common/InputBoxLongGray.vue";
import {ref} from "vue";

const email = ref('');
const errorMessage = ref('');
const emit = defineEmits(['submit']);

const handleSendClick = () => {
  if (!email.value) {
    errorMessage.value = '이메일을 입력해주세요';
  } else {
    emit('submit', email.value);
  }
};

</script>

<template>
  <div class="find-password-form">

    <h2>펫토리 비밀번호 찾기</h2>
    <p>가입하신 이메일로 임시 비밀번호를 전송해드릴게요.</p>

    <!-- 이메일 필드 -->
    <div class="field-group">
      <p>*이메일</p>
      <InputBoxLongGray
          v-model="email"
          placeholder="example.gmail.com"
          type="email"
      />
    </div>

    <!-- 전송 버튼 -->
    <ButtonLongColor @click="handleSendClick">
      이메일 전송하기
    </ButtonLongColor>

  </div>
</template>

<style scoped>
.find-password-form {
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

.field-group {
  width: 70%;
  margin-bottom: 15px;
}

.form-group p {
  text-align: left;
  font-weight: bold;
  font-size: 14px;
}

</style>