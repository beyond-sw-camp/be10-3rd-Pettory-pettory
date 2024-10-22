<template>
  <div class="board-page">
    <h1 class="board-title">게시판</h1>

    <!-- 게시글 목록 -->
    <div class="board-list">
      <BoardPost v-for="(post, index) in paginatedPosts" :key="index" :post="post" />
    </div>

    <!-- 페이지네이션 -->
    <div class="pagination">
      <button @click="prevSet" :disabled="startPage === 1">이전</button>
      <span v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="{ active: currentPage === page }">{{ page }}</span>
      <button @click="nextSet" :disabled="startPage + 9 >= totalPages">다음</button>
    </div>

    <!-- 카테고리 관리 및 게시글 작성 버튼 -->
    <div class="board-actions">
      <button @click="manageCategories">카테고리 관리</button>
      <button @click="writePost">게시글 작성</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import PostItem from '@/board/components/BoardPost.vue';
import BoardPost from "@/board/components/BoardPost.vue"; // 게시글 컴포넌트 불러오기

interface Post {
  category: string;
  title: string;
  createdAt: string;
  author: string;
  views: number;
}

export default defineComponent({
  components: {
    BoardPost,
    PostItem, // 컴포넌트 등록
  },
  setup() {
    const posts = ref<Post[]>([
      // 게시글 예시 데이터
      { category: '실종', title: '예시 제목 1', createdAt: '2024-10-10 17:10', author: '작성자1', views: 15 },
      { category: '실종', title: '예시 제목 2', createdAt: '2024-10-10 17:10', author: '작성자2', views: 20 },
      { category: '실종', title: '예시 제목 2', createdAt: '2024-10-10 17:10', author: '작성자2', views: 20 },
      { category: '실종', title: '예시 제목 2', createdAt: '2024-10-10 17:10', author: '작성자2', views: 20 },
      { category: '실종', title: '예시 제목 2', createdAt: '2024-10-10 17:10', author: '작성자2', views: 20 },
      { category: '실종', title: '예시 제목 2', createdAt: '2024-10-10 17:10', author: '작성자2', views: 20 },
      { category: '실종', title: '예시 제목 2', createdAt: '2024-10-10 17:10', author: '작성자2', views: 20 },
      { category: '실종', title: '예시 제목 2', createdAt: '2024-10-10 17:10', author: '작성자2', views: 20 },
      { category: '실종', title: '예시 제목 2', createdAt: '2024-10-10 17:10', author: '작성자2', views: 20 },
      { category: '실종', title: '예시 제목 2', createdAt: '2024-10-10 17:10', author: '작성자2', views: 20 },
      { category: '실종', title: '예시 제목 2', createdAt: '2024-10-10 17:10', author: '작성자2', views: 20 },
      { category: '실종', title: '예시 제목 2', createdAt: '2024-10-10 17:10', author: '작성자2', views: 20 },
      // 추가 게시글 데이터
    ]);

    const currentPage = ref<number>(1);
    const postsPerPage = ref<number>(10);
    const totalPages = computed(() => Math.ceil(posts.value.length / postsPerPage.value));

    const startPage = ref<number>(1); // 현재 페이지 그룹의 첫 번째 페이지 (10개 단위로 관리)

    // 현재 페이지 그룹의 10개 페이지 표시
    const visiblePages = computed(() => {
      const pages = [];
      for (let i = startPage.value; i <= Math.min(startPage.value + 9, totalPages.value); i++) {
        pages.push(i);
      }
      return pages;
    });

    // 현재 페이지의 게시글 계산
    const paginatedPosts = computed(() => {
      const start = (currentPage.value - 1) * postsPerPage.value;
      const end = start + postsPerPage.value;
      return posts.value.slice(start, end);
    });

    // 특정 페이지로 이동
    const goToPage = (page: number) => {
      currentPage.value = page;
    };

    // 페이지 그룹의 이전 세트로 이동
    const prevSet = () => {
      if (startPage.value > 1) {
        startPage.value -= 10;
        currentPage.value = startPage.value;
      }
    };

    // 페이지 그룹의 다음 세트로 이동
    const nextSet = () => {
      if (startPage.value + 9 < totalPages.value) {
        startPage.value += 10;
        currentPage.value = startPage.value;
      } else {
        currentPage.value = totalPages.value; // 마지막 페이지로 이동
      }
    };

    const manageCategories = () => {
      alert('카테고리 관리 페이지로 이동');
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
      manageCategories,
      writePost,
    };
  },
});
</script>

<style scoped>
.board-page {
  width: 100%;
  padding: 20px;
}

.board-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.board-list {
  margin-bottom: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}


.pagination button {
  padding: 8px 12px;
  margin: 0 10px; /* 버튼 간의 간격을 넓힘 */
  border: 1px solid #ddd;
  background-color: #f0f0f0;
  cursor: pointer;
  border-radius: 5px; /* 둥근 모서리 추가 */
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.pagination button:hover {
  background-color: #66cccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 추가 */
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination span {
  margin: 0 12px; /* 페이지 번호 간격을 넓힘 */
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.pagination span:hover {
  background-color: #66cccc;
  color: white;
  border-radius: 5px;
}

.pagination .active {
  font-weight: bold;
  color: blue;
  background-color: #e0f7fa;
  padding: 5px 10px;
  border-radius: 5px; /* 활성화된 페이지에 디자인 추가 */
}

button {
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.active {
  font-weight: bold;
  color: blue;
}

.board-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
