<script setup>
import {ref, watch, computed, defineEmits} from "vue";

import ButtonLongColor from "@/components/common/ButtonLongColor.vue";
import InputBoxLongGray from "@/components/common/InputBoxLongGray.vue";

const props = defineProps({
  initialData: Object,
});

const formData = ref({
  jointShoppingGroupName: "",
  jointShoppingProducts: "",
  jointShoppingInfo: "",
  jointShoppingCost: null,
  jointShoppingGroupMaximumCount: null,
  jointShoppingParticipationMaximumCount: null,
  jointShoppingCategory: "",
});

watch(() => props.initialData, (newData) => {
  if (newData) {
    Object.assign(formData.value, {
      jointShoppingGroupName: newData.jointShoppingGroupName,
      jointShoppingProducts: newData.jointShoppingProducts,
      jointShoppingInfo: newData.jointShoppingInfo,
      jointShoppingCost: newData.jointShoppingCost,
      jointShoppingGroupMaximumCount: newData.jointShoppingGroupMaximumCount,
      jointShoppingParticipationMaximumCount: newData.jointShoppingParticipationMaximumCount,
      jointShoppingCategory: newData.jointShoppingCategory,
    });
  }
});

// emit 정의
const emit = defineEmits(['submit']);

const submitForm = () => {
  emit('submit', formData.value);
};

const isFormValid = computed(() => {
  return (
      formData.value.jointShoppingGroupName &&
      formData.value.jointShoppingProducts &&
      formData.value.jointShoppingCost &&
      formData.value.jointShoppingGroupMaximumCount &&
      formData.value.jointShoppingParticipationMaximumCount &&
      formData.value.jointShoppingCategory
  );
});
</script>

<template>
  <form class = "register-form" @submit.prevent="submitForm">

    <div class="field-group form-group">
      <label for="jointShoppingGroupName">*모임방 제목</label>
      <br>
      <InputBoxLongGray
          type="text"
          id="jointShoppingGroupName"
          v-model="formData.jointShoppingGroupName"
          placeholder="ex) 제목"
      />
    </div>

    <div class="field-group form-group">
      <label for="jointShoppingCategory">*물품 카테고리</label>
      <br>
      <InputBoxLongGray
          type="text"
          id="jointShoppingCategory"
          v-model="formData.jointShoppingCategory"
          placeholder="ex) 사료"
      />
    </div>

    <div class="field-group form-group">
      <label for="jointShoppingProducts">*물품명</label>
      <br>
      <InputBoxLongGray
          type="text"
          id="jointShoppingProducts"
          v-model="formData.jointShoppingProducts"
          placeholder="ex) 강아지용사료"
      />
    </div>

    <div class="field-group form-group">
      <label for="jointShoppingCost">*구매비용</label>
      <br>
      <InputBoxLongGray
          type="text"
          id="jointShoppingCost"
          v-model="formData.jointShoppingCost"
          placeholder="ex) 10000"
      />
    </div>

    <div class="field-group form-group">
      <label for="jointShoppingGroupMaximumCount">*모임방 최대인원</label>
      <br>
      <InputBoxLongGray
          type="text"
          id="jointShoppingGroupMaximumCount"
          v-model="formData.jointShoppingGroupMaximumCount"
          placeholder="ex) 50"
      />
    </div>

    <div class="field-group form-group">
      <label for="jointShoppingParticipationMaximumCount">*공동구매 최대인원</label>
      <br>
      <InputBoxLongGray
          type="text"
          id="jointShoppingParticipationMaximumCount"
          v-model="formData.jointShoppingParticipationMaximumCount"
          placeholder="ex) 10"
      />
    </div>

    <div class="field-group form-group">
      <label for="jointShoppingInfo">상세 내용</label>
      <br>
      <InputBoxLongGray
          type="text"
          id="jointShoppingInfo"
          v-model="formData.jointShoppingInfo"
          placeholder="ex) 아무내용"
      />
    </div>


    <ButtonLongColor type="submit" :disabled="!isFormValid">
      입력완료
    </ButtonLongColor>

  </form>
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

.form-group label {
  text-align: left;
  font-weight: bold;
  font-size: 14px;
}

</style>
