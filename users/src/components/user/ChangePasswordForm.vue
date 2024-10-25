<script setup>
import ButtonLongColor from "@/components/common/ButtonLongColor.vue";
import InputBoxLongGray from "@/components/common/InputBoxLongGray.vue";
import {ref} from "vue";

const curPwd = ref('');
const newPwd = ref('');
const errorMessage = ref('');

const emit = defineEmits(['submit']);

// 부모에게 errorMessage 받기
const props = defineProps({
  errorMessage: {
    type: String,
    default: ''
  }
});

const handleChangeClick = () => {
  if (!curPwd.value || !newPwd.value) {
    errorMessage.value = '빠진 부분이 없는지 확인해주세요!';
  } else {
    emit('submit', { curPwd: curPwd.value, newPwd: newPwd.value});
  }
};

</script>

<template>
  <div class="change-password-form">

    <h2>펫토리 비밀번호 변경</h2>
    <p>가입하신 이메일로 임시 비밀번호를 전송해드릴게요.</p>

    <!-- 에러 메세지 표시 -->
    <p v-if="props.errorMessage" class="error">{{props.errorMessage}}</p>

    <!-- 현재 비밀번호 필드 -->
    <div class="field-group">
      <p>*현재 비밀번호</p>
      <InputBoxLongGray
          v-model="curPwd"
          placeholder="영문대소문자, 특수문자를 모두 포함하여 8자리 이상"
          type="password"
      />
    </div>

    <div class="field-group">
      <p>*새 비밀번호</p>
      <InputBoxLongGray
          v-model="newPwd"
          placeholder="영문대소문자, 특수문자를 모두 포함하여 8자리 이상"
          type="password"
      />
    </div>

    <!-- 인증 버튼 -->
    <ButtonLongColor @click="handleChangeClick">
      변경하기
    </ButtonLongColor>
  </div>
</template>

<style scoped>
.change-password-form {
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