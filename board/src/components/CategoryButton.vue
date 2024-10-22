<template>
  <button class="custom-button" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['click']
});
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
