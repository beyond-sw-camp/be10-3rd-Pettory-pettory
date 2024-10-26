<script setup>
import ButtonLongColor from "@/components/common/ButtonLongColor.vue";
import InputBoxLongGray from "@/components/common/InputBoxLongGray.vue";
import {ref} from "vue";

const email = ref('');
const errorMessage = ref('');
const emit = defineEmits(['submit']);

// 부모에게 errorMessage 받기
const props = defineProps({
  errorMessage: {
    type: String,
    default: ''
  }
});

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

    <!-- 에러 메세지 표시 -->
    <p v-if="props.errorMessage" class="error">{{props.errorMessage}}</p>

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
    <ButtonLongColor class="btn" @click="handleSendClick">
      이메일 전송하기
    </ButtonLongColor>

  </div>
</template>

<style scoped>
.find-password-form {
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