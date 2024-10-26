<script setup>
import {ref} from 'vue';
import InputBoxLongGray from '@/components/common/InputBoxLongGray.vue';
import ButtonLongColor from "@/components/common/ButtonLongColor.vue";

const userEmail = ref('');
const userNickname = ref('');
const userName = ref('');
const userPassword = ref('');
const userBirth = ref('');

const errorMessage = ref('');

const emit = defineEmits(['submit']);

// 부모에게 errorMessage 받기
const props = defineProps({
  errorMessage: {
    type: String,
    default: ''
  }
});

const handleRegister = () => {
  if (!userEmail.value || !userNickname.value || !userName.value || !userPassword.value || !userBirth.value) {
    errorMessage.value = '빠진 부분이 없는지 확인해주세요!';
  } else {
    errorMessage.value = '';
    emit('submit', {
      userEmail: userEmail.value,
      userNickname: userNickname.value,
      userName: userName.value,
      userPassword: userPassword.value,
      userBirth: userBirth.value
    })
  }
};

</script>

<template>
  <div class = "register-form">
    <h2>펫토리 회원가입</h2>

    <!-- 에러 메세지 표시 -->
    <p v-if="props.errorMessage" class="error">{{props.errorMessage}}</p>

    <!-- 이메일 필드 -->
    <div class="field-group">
      <p>*이메일</p>
      <InputBoxLongGray
          v-model="userEmail"
          placeholder="example@gmail.com"
          type="email"
      />
    </div>

    <div class="field-group">
      <!-- 닉네임-->
      <p>*닉네임</p>
      <InputBoxLongGray
          v-model="userNickname"
          placeholder="예) 길똥"
          type="text"
      />
    </div>

    <!-- 이름-->
    <div class="field-group">
      <p>*이름</p>
      <InputBoxLongGray
          v-model="userName"
          placeholder="예) 홍길동"
          type="text"
      />
    </div>

    <div class="field-group">
      <!-- 비밀번호 필드 -->
      <p>*비밀번호</p>
      <InputBoxLongGray
          v-model="userPassword"
          placeholder="영문대소문자, 특수문자를 모두 포함하여 8자리 이상"
          type="password"
      />
    </div>


    <div class="field-group">
      <!-- 생년월일 필드 -->
      <p>*생년월일</p>
      <InputBoxLongGray
          v-model="userBirth"
          placeholder="2000-01-01"
          type="date"
      />
    </div>

    <!-- 회원가입 버튼 -->
    <ButtonLongColor class="btn" @click="handleRegister">
      가입하기
    </ButtonLongColor>

  </div>
</template>

<style scoped>
.register-form {
  align-items: center;
  width: 500px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.field-group {
  width: 80%;
}

.field-group > * {
  margin-bottom: 3px;
}

.btn {
  margin-top: 20px;
}

.error {
  color: #53D9C1;
  font-weight: bold;
}

</style>