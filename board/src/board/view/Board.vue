<template>
  <div class="board-page">
    <h1 class="board-title">게시판</h1>

    <!-- 게시글 목록 -->
    <div class="board-list">
      <BoardPost v-for="(post, index) in paginatedPosts" :key="index" :post="post" />
    </div>

    <!-- 페이지네이션 컴포넌트 -->
    <BoardPagingBar
        :currentPage="currentPage"
        :totalPages="totalPages"
        :startPage="startPage"
        :visiblePages="visiblePages"
        @goToPage="goToPage"
        @prevSet="prevSet"
        @nextSet="nextSet"
    />

    <!-- 카테고리 관리 및 게시글 작성 버튼 -->
    <div class="board-actions">
      <RouterLink to="/board/category" active-class="active" replace>
        <BoardButton>카테고리 관리</BoardButton>
      </RouterLink>
      <BoardButton @click="writePost">게시글 작성</BoardButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import BoardPost from "@/board/components/BoardPost.vue";
import BoardButton from "@/board/components/BoardButton.vue";
import BoardPagingBar from "@/board/components/BoardPagingBar.vue";
import { RouterLink } from 'vue-router';

interface Post {
  category: string;
  title: string;
  createdAt: string;
  author: string;
  views: number;
}

export default defineComponent({
  components: {
    RouterLink,
    BoardButton,
    BoardPost,
    BoardPagingBar
  },
  setup() {
    const posts = ref<Post[]>(Array(120).fill().map((_, index) => ({
      category: '실종',
      title: `예시 제목 ${index + 1}`,
      createdAt: '2024-10-10 17:10',
      author: `작성자 ${index + 1}`,
      views: `조회수 : ${20 + index * 5}`
    })));

    const currentPage = ref<number>(1);
    const postsPerPage = ref<number>(10);
    const totalPages = computed(() => Math.ceil(posts.value.length / postsPerPage.value));

    const startPage = ref<number>(1);

    const visiblePages = computed(() => {
      const pages = [];
      for (let i = startPage.value; i <= Math.min(startPage.value + 9, totalPages.value); i++) {
        pages.push(i);
      }
      return pages;
    });

    const paginatedPosts = computed(() => {
      const start = (currentPage.value - 1) * postsPerPage.value;
      const end = start + postsPerPage.value;
      return posts.value.slice(start, end);
    });

    const goToPage = (page: number) => {
      currentPage.value = page;
    };

    const prevSet = () => {
      if (startPage.value > 1) {
        startPage.value -= 10;
        currentPage.value = startPage.value;
      }
    };

    const nextSet = () => {
      if (startPage.value + 9 < totalPages.value) {
        startPage.value += 10;
        currentPage.value = startPage.value;
      } else {
        currentPage.value = totalPages.value;
      }
    };

    const writePost = () => {
      alert('게시글 작성 페이지로 이동');
    };

    return {
      posts,
      currentPage,
      postsPerPage,
      totalPages,
      startPage,
      visiblePages,
      paginatedPosts,
      goToPage,
      prevSet,
      nextSet,
      writePost,
    };
  },
});
</script>
