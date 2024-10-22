<template>

    <div class="board-page">
      <!-- 게시판 제목과 카테고리 버튼 -->
      <div class="board-header">
        <h1 class="board-title">{{ selectedCategory ? `${selectedCategory} 게시판` : "게시판" }}</h1>

        <!-- 카테고리 버튼 -->
        <div class="category-button" @mouseover="showCategories" @mouseleave="hideCategories">

          <BoardButton>카테고리</BoardButton>

          <!-- 카테고리 목록 -->
          <ul v-if="isCategoryListVisible" class="category-list">
            <li v-for="category in categories" :key="category" @click="filterByCategory(category)">
              {{ category }}
            </li>
          </ul>
        </div>
      </div>

      <!-- 게시글 목록 그리드 -->
    <div class="board-grid">
      <div v-for="(post, index) in paginatedPosts" :key="index" class="post-item">
        <div class="post-information">
          <span class="post-category">{{ post.category }}</span>
          <span class="post-views">조회수 : {{ post.views }}</span>
        </div>

        <div class="post-title">{{ post.title }}</div>
        <img :src="post.thumbnail" alt="썸네일" class="post-thumbnail" />
          <div class="post-meta">
            <span class="post-created-at">{{ post.createdAt }}</span>
            <span class="post-author">{{ post.author }}</span>
          </div>
      </div>
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
        <BoardButton :buttonStyle="{ padding: '3px 10px', fontSize: '1.1rem' }">게시글 작성</BoardButton>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import BoardPagingBar from "@/board/components/BoardPagingBar.vue";
import BoardButton from "@/board/components/BoardButton.vue";

interface Post {
  category: string;
  title: string;
  createdAt: string;
  author: string;
  views: number;
  thumbnail: string; // 썸네일 추가
}

export default defineComponent({
  components: {
    BoardButton,
    BoardPagingBar
  },
  setup() {
    const posts = ref<Post[]>(Array(120).fill().map((_, index) => ({
      category: ['IT', '생활', '여행'][index % 3], // 다양한 카테고리 적용
      title: `예시 제목 ${index + 1}`,
      createdAt: '2024-10-10 17:10',
      author: `작성자 ${index + 1}`,
      views: `${20 + index * 5}`,
      thumbnail: 'https://via.placeholder.com/150' // 예시 썸네일 이미지
    })));

    const categories = ref(['전체', 'IT', '생활', '여행']);  // 카테고리 목록
    const selectedCategory = ref<string>('전체');  // 기본 선택된 카테고리: '전체'
    const isCategoryListVisible = ref(false);  // 카테고리 목록 보이기/숨기기

    const currentPage = ref<number>(1);
    const postsPerPage = ref<number>(6); // 한 페이지당 6개의 게시글
    const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage.value));

    const startPage = ref<number>(1);

    const visiblePages = computed(() => {
      const pages = [];
      for (let i = startPage.value; i <= Math.min(startPage.value + 9, totalPages.value); i++) {
        pages.push(i);
      }
      return pages;
    });

    // 선택된 카테고리에 따라 게시글을 필터링
    const filteredPosts = computed(() => {
      if (selectedCategory.value === '전체') {
        return posts.value;
      }
      return posts.value.filter(post => post.category === selectedCategory.value);
    });

    // 필터링된 게시글을 페이지에 맞게 자르기
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

    const showCategories = () => {
      isCategoryListVisible.value = true;
    };

    const hideCategories = () => {
      isCategoryListVisible.value = false;
    };

    const filterByCategory = (category: string) => {
      selectedCategory.value = category;
      currentPage.value = 1;  // 카테고리를 변경할 때 첫 페이지로 이동
      hideCategories();  // 카테고리 목록 숨기기
    };

    return {
      posts,
      currentPage,
      postsPerPage,
      selectedCategory,
      showCategories,
      hideCategories,
      isCategoryListVisible,
      categories,
      filterByCategory,
      totalPages,
      startPage,
      visiblePages,
      paginatedPosts,
      goToPage,
      prevSet,
      nextSet,
    };
  }
});
</script>


<style scoped>
.board-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 한 줄에 3개의 게시글 */
  gap: 20px; /* 게시글 간 간격 */
  padding: 20px;
}

.post-item {
  border: 2px solid #66cccc;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  background-color: #fff;
  transition: transform 0.3s ease;
}

.post-item:hover {
  transform: scale(1.05); /* 마우스 호버 시 살짝 확대 */
}

.post-thumbnail {
  width: 100%;
  height: 150px; /* 썸네일 이미지 크기 */
  object-fit: cover;
  margin-bottom: 10px;
}

.post-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post-category, .post-title, .post-meta {
  margin: 5px 0;
}

.post-meta {
  font-size: 0.9rem;
  color: #666;
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

.post-information {
  display: flex;
  justify-content: space-between; /* 왼쪽과 오른쪽으로 요소 배치 */
  align-items: center; /* 세로축 가운데 정렬 */
}

.post-category {
  text-align: left; /* 카테고리 텍스트 왼쪽 정렬 */
}

.post-views {
  text-align: right; /* 조회수 텍스트 오른쪽 정렬 */
}

.post-meta {
  display: flex;
  justify-content: space-between; /* 왼쪽과 오른쪽으로 요소 배치 */
  align-items: center; /* 세로축 가운데 정렬 */
}

.post-created-at {
  text-align: left; /* 카테고리 텍스트 왼쪽 정렬 */
}

.post-author {
  text-align: right; /* 조회수 텍스트 오른쪽 정렬 */
}


</style>
