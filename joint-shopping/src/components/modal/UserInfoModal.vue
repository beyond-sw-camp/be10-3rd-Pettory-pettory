<script setup>
import {defineProps, defineEmits} from "vue";

import BackButton from "@/components/common/BackButton.vue";

// props 정의
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  isVisible: Boolean, // 모달 표시 여부

  isClosable: {
    type: Boolean,
    default: true,  // 모달을 닫을 수 있는지 여부
  },
});

// emit 정의
const emit = defineEmits(['close']);

const closeModal = () => {
  if (props.isClosable) {
    emit('close');
  }
};
</script>

<template>
  <!-- 모달이 보일 때만 렌더링 -->
  <div v-if="isVisible" class="modal-overlay" >

    <back-button @click="closeModal" />

<!-- 한명의 유저의 정보를 자세히 보는 컴포넌트 필요  -->
    <div>
      <p>여기에는 유저 정보 컴포넌트가 있을거에요</p>
    </div>

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

</style>