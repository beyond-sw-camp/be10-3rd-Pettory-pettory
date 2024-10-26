<template>
  <div class="question-item">
    <div class="question-category">{{ question.category }}</div>
    <div class="question-title">{{ question.title }}</div>
    <div class="question-created-at">{{ question.createdAt }}</div>
    <div class="question-author">{{ question.author }}</div>
    <div class="question-views">{{ question.views }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Question {
  id: number;
  category: string;
  title: string;
  createdAt: string;
  author: string;
  views: number;
  thumbnail: string;
}

export default defineComponent({
  props: {
    question: {
      type: Object as PropType<Question>,
      required: true,
    },
  },
});
</script>

<style scoped>
.question-item {
  border: 1px solid #66cccc;
  padding: 10px;
  margin: 10px auto; /* 컴포넌트를 중앙에 정렬 (자동 여백) */
  max-width: 1000px; /* 최대 너비 제한 */
  width: 100%; /* 부모 요소의 100% 너비를 채움 */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.question-category, .question-title, .question-created-at, .question-author, .question-views {
  margin-right: 15px;
}


.question-title {
  flex-basis: 40%; /* 제목은 더 넓게 */
}
</style>
