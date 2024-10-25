<script setup>
import {ref} from 'vue';
import InputBoxLongGray from '@/components/common/InputBoxLongGray.vue';
import ButtonLongColor from "@/components/common/ButtonLongColor.vue";

const verifyCode = ref('');
const errorMessage = ref('');

const emit = defineEmits(['verify']);

// 부모에게 errorMessage 받기
const props = defineProps({
  errorMessage: {
    type: String,
    default: ''
  }
});

const handleVerifyClick = () => {
  if (!verifyCode.value) {
    errorMessage.value = '인증코드를 입력해주세요.';
  } else {
    errorMessage.value = '';
    emit('submit', verifyCode.value);
  }
};

</script>
<template>
  <div class="register-verify-form">

    <h2>이메일 인증코드 입력</h2>

    <!-- 에러 메세지 표시 -->
    <p v-if="props.errorMessage" class="error">{{props.errorMessage}}</p>

    <!-- 인증코드 필드 -->
    <div class="field-group">
      <p>*인증코드</p>
      <InputBoxLongGray
          v-model="verifyCode"
          placeholder="예) AAAA1234"
          type="text"
      />
    </div>

    <!-- 인증 버튼 -->
    <ButtonLongColor @click="handleVerifyClick">
      인증하기
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

.field-group {
  width: 70%;
  margin-bottom: 15px;
}

.form-group p {
  text-align: left;
  font-weight: bold;
  font-size: 14px;
}

.error {
  color: #53D9C1;
  font-weight: bold;
}
</style>