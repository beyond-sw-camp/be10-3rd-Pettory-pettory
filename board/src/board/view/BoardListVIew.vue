<template>
  <div class="board-page">
    <!-- 게시판 제목과 카테고리 버튼 -->
    <div class="board-header">
      <h1 class="board-title">{{ selectedCategory ? `${selectedCategory} 게시판` : "게시판" }}</h1>

      <!-- 카테고리 버튼 -->
      <div class="category-button" @mouseover="showCategories" @mouseleave="hideCategories">
        <button>카테고리</button>

        <!-- 카테고리 목록 -->
        <ul v-if="isCategoryListVisible" class="category-list">
          <li v-for="category in categories" :key="category" @click="filterByCategory(category)">
            {{ category }}
          </li>
        </ul>
      </div>
    </div>

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
        <BoardButton :buttonStyle="{ padding: '3px 10px', fontSize: '1.1rem' }">카테고리 관리</BoardButton>
      </RouterLink>
      <BoardButton @click="writePost" :buttonStyle="{ padding: '3px 10px', fontSize: '1.1rem' }">게시글 작성</BoardButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useBoardPostList } from '@/board/composables/useBoardPostList'; // Composable 사용
import BoardPost from "@/board/components/BoardPost.vue";
import BoardButton from "@/board/components/BoardButton.vue";
import BoardPagingBar from "@/board/components/BoardPagingBar.vue";
import { RouterLink } from 'vue-router';

export default defineComponent({
  components: {
    RouterLink,
    BoardButton,
    BoardPost,
    BoardPagingBar
  },
  setup() {
    const {
      posts,
      categories,
      selectedCategory,
      filteredPosts,
      isCategoryListVisible,
      currentPage,
      postsPerPage,
      totalPages,
      startPage,
      visiblePages,
      paginatedPosts,
      goToPage,
      prevSet,
      nextSet,
      filterByCategory,
      showCategories,
      hideCategories,
      writePost,
    } = useBoardPostList();  // 분리된 Composable 호출

    return {
      posts,
      categories,
      selectedCategory,
      filteredPosts,
      isCategoryListVisible,
      currentPage,
      postsPerPage,
      totalPages,
      startPage,
      visiblePages,
      paginatedPosts,
      goToPage,
      prevSet,
      nextSet,
      filterByCategory,
      showCategories,
      hideCategories,
      writePost,
    };
  },
});
</script>

<style scoped>
.board-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.board-title {
  font-size: 30px;
  font-weight: bold;
  padding-left: 380px; /* 왼쪽으로부터 380px 이동 */
}

.category-button {
  position: relative;
}

.category-list {
  position: absolute;
  top: 30px;
  left: 0;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.category-list li {
  padding: 10px 20px;
  cursor: pointer;
}

.category-list li:hover {
  background-color: #f2f2f2;
}

.board-actions {
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽에 정렬 */
  gap: 10px; /* 버튼 사이에 간격 */
}
</style>
