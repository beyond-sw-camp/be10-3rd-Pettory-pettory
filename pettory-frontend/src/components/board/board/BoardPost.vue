<template>
  <div class="post-item">
    <div class="post-category">{{ post.category }}</div>
    <div class="post-title">{{ post.title }}</div>
    <div class="post-created-at">{{ post.createdAt }}</div>
    <div class="post-author">{{ post.author }}</div>
    <div class="post-views">{{ post.views }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Post {
  category: string;
  title: string;
  createdAt: string;
  author: string;
  views: number;
}

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },
});
</script>

<style scoped>
.post-item {
  border: 1px solid #66cccc;
  padding: 10px;
  margin: 10px auto; /* 컴포넌트를 중앙에 정렬 (자동 여백) */
  max-width: 1000px; /* 최대 너비 제한 */
  width: 100%; /* 부모 요소의 100% 너비를 채움 */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-category, .post-title, .post-created-at, .post-author, .post-views {
  margin-right: 15px;
}


.post-title {
  flex-basis: 40%; /* 제목은 더 넓게 */
}
</style>
