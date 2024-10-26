<script setup>
import {defineProps, defineEmits, ref, watch, computed} from "vue";
import ButtonLongColor from "@/components/common/ButtonLongColor.vue";
import InputBoxLongGray from "@/components/common/InputBoxLongGray.vue";
import BackButton from "@/components/common/BackButton.vue";

// props 정의
const props = defineProps({

  confirmText: {
    type: String,
    default: '확인',
  },
  cancelText: {
    type: String,
    default: '취소'
  },
  isVisible: Boolean, // 모달 표시 여부
  isClosable:{
    type: Boolean,
    default: true,  // 모달을 닫을 수 있는지 여부
  },
  initialData: Object,
});

const formData = ref({
  courierCode: "",
  invoiceNum: "",
});

watch(() => props.initialData, (newData) => {
  if (newData) {
    Object.assign(formData.value, {
      courierCode: newData.courierCode,
      invoiceNum: newData.invoiceNum,
    });
  }
});

// emit 정의
const emit = defineEmits(['close', 'submit']);

const closeModal = () => {
  if (props.isClosable) {
    emit('close');
  }
};

const submitForm = () => {
  emit('submit', formData.value);
};

const isFormValid = computed(() => {
  return (
      formData.value.courierCode &&
      formData.value.invoiceNum
  );
});

</script>

<template>
  <!-- 모달이 보일 때만 렌더링 -->
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">

    <form class = "register-form" @submit.prevent="submitForm">

      <div class="modal-header">
        <back-button class="close-button"  :isModal=true @click="closeModal" />
        <h2>배송정보 입력</h2>
      </div>

      <div class="field-group form-group">
        <label for="courierCode">*택배사</label>
        <br>
        <InputBoxLongGray
            type="text"
            id="courierCode"
            v-model="formData.courierCode"
            placeholder="ex) 경동택배"
        />
      </div>

      <div class="field-group form-group">
        <label for="invoiceNum">*운송장 번호</label>
        <br>
        <InputBoxLongGray
            type="text"
            id="invoiceNum"
            v-model="formData.invoiceNum"
            placeholder="ex) 5757348437"
        />
      </div>

      <ButtonLongColor type="submit" :disabled="!isFormValid">
        제출
      </ButtonLongColor>

    </form>

  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

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




.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

</style>