<template>
  <div class="category-item">
    <span class="category-name">{{ categoryName }}</span>
    <div class="category-actions">
      <CustomButton @click="$emit('edit')">카테고리 수정</CustomButton>
      <CustomButton @click="$emit('delete')">카테고리 삭제</CustomButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomButton from '@/components/CategoryButton.vue';  // 커스텀 버튼 컴포넌트 import

export default defineComponent({
  props: {
    categoryName: {
      type: String,
      required: true
    }
  },
  components: {
    CustomButton
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
