<template>
  <button class="custom-button" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script setup>
defineEmits(["click"]);
</script>

<style scoped>
.custom-button {
  background-color: #66cccc;
  border: none;
  padding: 5px 10px;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.custom-button:hover {
  background-color: #559999;
}
</style>
