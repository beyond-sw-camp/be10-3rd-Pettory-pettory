<script setup>
import {defineEmits} from 'vue';

// 부모 컴포넌트로 클릭 이벤트 전달
const emit = defineEmits(['click']);
</script>

<template>
  <!-- 버튼 클릭 시 부모에게 클릭 이벤트 전달 -->
  <button class ="btn" @click="emit('click')">
    <slot></slot> <!-- 부모 컴포넌트에서 버튼 안에 넣을 텍스트 전달 -->
  </button>
</template>

<style scoped>
.btn {
  width: 100px;
  height: 40px;
  background-color: #53D9C1;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
}

</style>