<!-- 본 파일은 썸네일이 포함되지 않은 게시판 리스트 뷰임 사용하지 않울
 예정이기 때문에 삭제하려 했으나 만든게 아까워서 남겨둠-->

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
      category: ['IT', '생활', '여행'][index % 3], // 다양한 카테고리 적용
      title: `예시 제목 ${index + 1}`,
      createdAt: '2024-10-10 17:10',
      author: `작성자 ${index + 1}`,
      views: `조회수 : ${20 + index * 5}`
    })));

    const categories = ref(['전체', 'IT', '생활', '여행']);  // 카테고리 목록
    const selectedCategory = ref<string>('');  // 선택된 카테고리
    const isCategoryListVisible = ref(false);  // 카테고리 목록 보이기/숨기기

    // 카테고리에 따라 게시글 필터링
    const filteredPosts = computed(() => {
      if (!selectedCategory.value || selectedCategory.value === '전체') {
        return posts.value;
      }
      return posts.value.filter(post => post.category === selectedCategory.value);
    });

    // 페이지네이션
    const currentPage = ref<number>(1);
    const postsPerPage = ref<number>(10);
    const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage.value));
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
      return filteredPosts.value.slice(start, end);
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

    const filterByCategory = (category: string) => {
      selectedCategory.value = category;
      hideCategories();  // 카테고리 목록 숨기기
    };

    const showCategories = () => {
      isCategoryListVisible.value = true;
    };

    const hideCategories = () => {
      isCategoryListVisible.value = false;
    };

    const writePost = () => {
      alert('게시글 작성 페이지로 이동');
    };

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
