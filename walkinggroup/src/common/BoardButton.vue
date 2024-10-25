<template>
  <!-- 부모 컴포넌트에서 전달받은 스타일을 적용 -->
  <button class="board-button" :style="buttonStyle" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// props와 emits 정의
const props = defineProps({
  buttonStyle: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['click']);
</script>

<style scoped>
.board-button {
  background-color: #66cccc;
  border: none;
  padding: 5px 10px; /* 기본 padding */
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.board-button:hover {
  background-color: #559999;
}
</style>