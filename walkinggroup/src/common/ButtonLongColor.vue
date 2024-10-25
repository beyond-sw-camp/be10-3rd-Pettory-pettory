<script setup>
import {defineEmits} from 'vue';

const emit = defineEmits(['click']);
</script>

<template>
  <button class ="btn" @click="emit('click')">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  width: 200px;
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