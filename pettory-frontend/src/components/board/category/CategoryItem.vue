<template>
  <div class="category-item">
    <span class="category-name">{{ categoryTitle }}</span>
    <div class="category-actions">
      <CategoryButton @click="$emit('edit')">카테고리 수정</CategoryButton>
      <CategoryButton @click="$emit('delete')">카테고리 삭제</CategoryButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CategoryButton from "@/components/board/category/CategoryButton.vue";

export default defineComponent({
  props: {
    categoryTitle: {
      type: String,
      required: true
    }
  },
  components: {
    CategoryButton
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

.category-actions {
  display: flex;
}

.category-actions button {
  margin-left: 10px;
}
</style>
