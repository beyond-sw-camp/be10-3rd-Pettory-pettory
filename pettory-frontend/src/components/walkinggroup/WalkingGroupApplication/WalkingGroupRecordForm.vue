<script setup>
import {computed, ref} from 'vue';
import InputBoxLongGray from "@/components/common/InputBoxLongGray.vue";
import ButtonLongColor from "@/components/common/ButtonLongColor.vue";

const formData = ref({
  walkingGroupDate: "",
  walkingGroupRecordDuration: "",
  walkingGroupRouteStart: "",
  walkingGroupRouteEnd: "",
});
const errorMessage = ref('');

const emit = defineEmits(['submit']);

const handleRegisterClick = () => {
  const formDataToSend = {...formData.value};

  emit('submit', formDataToSend);
};

const isFormValid = computed(() => {
  return (
      formData.value.walkingGroupDate &&
      formData.value.walkingGroupRecordDuration &&
      formData.value.walkingGroupRouteStart &&
      formData.value.walkingGroupRouteEnd
  );
});
</script>

<template>
  <div class="register-form">

    <!-- 에러 메세지 표시 -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <div class="field-group">
      <p>*산책 날짜</p>
      <InputBoxLongGray
          v-model="formData.walkingGroupDate"
          placeholder="예) 2024-10-24"
          type="date"
      />
    </div>

    <div class="field-group">
      <p>*산책 걸린 시간</p>
      <InputBoxLongGray
          v-model="formData.walkingGroupRecordDuration"
          placeholder="예) 45"
          type="number"
      />
    </div>

    <div class="field-group">
      <p>*산책 시작 장소</p>
      <InputBoxLongGray
          v-model="formData.walkingGroupRouteStart"
          placeholder="예) 한강공원 입구"
          type="text"
      />
    </div>

    <div class="field-group">
      <p>*산책 끝 장소</p>
      <InputBoxLongGray
          v-model="formData.walkingGroupRouteEnd"
          placeholder="예) 잠실대교"
          type="text"
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
  border: 1px solid #53D9C1;
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