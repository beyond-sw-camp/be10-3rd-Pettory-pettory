<script setup>
import {ref} from 'vue';
import InputBoxLongGray from '@/components/common/InputBoxLongGray.vue';
import ButtonLongColor from "@/components/common/ButtonLongColor.vue";

const email = ref('');
const pwd = ref('');
const errorMessage = ref('');

const emit = defineEmits(['submit']);

// 부모에게 errorMessage 받기
const props = defineProps({
  errorMessage: {
    type: String,
    default: ''
  }
});

const handleLogin = () => {
  if (!email.value || !pwd.value) {
    errorMessage.value = '이메일과 비밀번호를 입력하세요.';
  } else {
    errorMessage.value = '';
    emit('submit', {email: email.value, password: pwd.value})
  }
};


</script>

<template>
  <div class="login-container">

    <div class="login-form">

      <h2>펫토리 로그인</h2>

      <!-- 에러 메세지 표시 -->
      <p v-if="props.errorMessage" class="error">{{props.errorMessage}}</p>

      <div class="field-group">
        <!-- 이메일 필드 -->
        <p>*이메일</p>
        <InputBoxLongGray
            v-model="email"
            placeholder="example.gmail.com"
            type="email"
        />
      </div>

      <!-- 비밀번호 필드 -->
      <div class="field-group">
        <p>*비밀번호</p>
        <InputBoxLongGray
            v-model="pwd"
            placeholder="영문대소문자, 특수문자를 모두 포함하여 8자리 이상"
            type="password"
        />
      </div>


      <!-- 로그인 버튼 -->
      <ButtonLongColor class="btn" @click="handleLogin">
        로그인하기
      </ButtonLongColor>


    </div>

    <div class="actions">
      <RouterLink to="/users/passwords/emails">비밀번호 찾기</RouterLink>
      <RouterLink to="/users">회원가입</RouterLink>
    </div>

  </div>
</template>

<style scoped>
.login-container {
  align-items: center;
  width: 300px;
  margin: 0 auto;
  padding: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
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

.form-group p {
  text-align: left;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 0px;
}

.btn {
  margin-top: 20px;
}

h2 {
  margin-bottom: 20px;
}

.actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.error {
  color: #53D9C1;
  font-weight: bold;
}
</style>