<template>
  <div class="category-item">
    <span class="category-name">{{ categoryName }}</span>
    <div class="category-actions">
      <button @click="$emit('edit')">카테고리 수정</button>
      <button @click="$emit('delete')">카테고리 삭제</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    categoryName: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped>
.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid #66cccc;
  border-radius: 8px;
}

.category-name {
  font-size: 1.5rem;
}

.category-actions button {
  margin-left: 10px;
  background-color: #66cccc;
  border: none;
  padding: 5px 10px;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.category-actions button:hover {
  background-color: #559999;
}
</style>
