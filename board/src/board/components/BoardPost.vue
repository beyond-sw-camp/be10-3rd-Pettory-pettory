<template>
  <div class="post-item">
    <div class="post-category">{{ post.category }}</div>
    <div class="post-title">{{ post.title }}</div>
    <div class="post-created-at">{{ post.createdAt }}</div>
    <div class="post-author">{{ post.author }}</div>
    <div class="post-views">조회수: {{ post.views }}</div>
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
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-category, .post-title, .post-created-at, .post-author, .post-views {
  margin-right: 15px;
}
</style>
