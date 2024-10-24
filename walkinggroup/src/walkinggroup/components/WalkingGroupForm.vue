<script setup>
import {computed, ref} from 'vue';
import InputBoxLongGray from '@/common/InputBoxLongGray.vue';
import ButtonLongColor from "@/common/ButtonLongColor.vue";


const formData = ref({
  walkingGroupName: "",
  walkingGroupInfo: "",
  walkingGroupMaximumCount: "",
});
const errorMessage = ref('');

const emit = defineEmits(['submit']);

const handleRegisterClick = () => {
  const formDataToSend = {...formData.value};

  emit('submit', formDataToSend);
};

const isFormValid = computed(() => {
  return (
      formData.value.walkingGroupName &&
      formData.value.walkingGroupInfo &&
      formData.value.walkingGroupMaximumCount
  );
});
</script>

<template>
  <div class="register-form">

    <!-- 에러 메세지 표시 -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <div class="field-group">
      <p>*산책 모임 이름</p>
      <InputBoxLongGray
          v-model="formData.walkingGroupName"
          placeholder="산책 모임 이름을 입력하세요"
          type="text"
      />
    </div>

    <div class="field-group">
      <p>*산책 모임 설명</p>
      <InputBoxLongGray
          v-model="formData.walkingGroupInfo"
          placeholder="산책 모임 설명을 입력하세요"
          type="text"
      />
    </div>

    <div class="field-group">
      <p>*가입 최대 인원</p>
      <InputBoxLongGray
          v-model="formData.walkingGroupMaximumCount"
          placeholder="예) 5"
          type="number"
      />
    </div>

    <ButtonLongColor @click="handleRegisterClick" :disabled="!isFormValid">
      제출하기
    </ButtonLongColor>

  </div>
</template>

<style scoped>
.register-form {
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