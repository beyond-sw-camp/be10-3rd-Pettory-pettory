<template>
  <div class="board-page">
    <!-- 게시판 제목과 카테고리 버튼 -->
    <div class="board-header">
      <h1 class="board-title">{{ selectedCategory ? `${selectedCategory} 게시판` : "게시판" }}</h1>

      <!-- 카테고리 버튼과 검색창 -->
      <div class="header-actions">
        <!-- 카테고리 버튼 -->
        <div class="category-button" @mouseover="showCategories" @mouseleave="hideCategories">
          <BoardButton>카테고리</BoardButton>

        </div>
        <!-- 카테고리 목록 -->
        <ul v-if="isCategoryListVisible" class="category-list">
          <li v-for="category in categories"
              :key="category.categoryNum"
              @click="filterByCategory(category.categoryTitle)">
            {{ category.categoryTitle }}
          </li>
        </ul>
        <!-- 검색창과 검색 버튼 -->
        <div class="search-container">
          <input
              type="text"
              v-model="searchQuery"
              placeholder="검색어를 입력하세요"
              class="search-input"
          />
          <BoardButton @click="search" class="search-button">검색</BoardButton>
        </div>
      </div>
    </div>

    <!-- 게시글 목록 그리드 -->
    <div class="board-grid">
      <div
          v-for="(post, index) in paginatedPosts"
          :key="index"
          class="post-item"
          @click="goToPost(post.postNum)"
      >
        <div class="post-information">
          <span class="post-category">{{ post.postCategoryTitle }}</span>
          <span class="post-views">조회수 : {{ post.postHits }}</span>
        </div>

        <div class="post-title">{{ post.postTitle }}</div>
        <img :src="post.thumbnail" alt="썸네일" class="post-thumbnail" />
        <div class="post-meta">
          <span class="post-created-at">{{ post.postInsertDatetime }}</span>
          <span class="post-author">{{ post.postWriterNum }}</span>
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
      <RouterLink to="/board/post/new" active-class="active" replace>
        <BoardButton :buttonStyle="{ padding: '3px 10px', fontSize: '1.1rem' }">게시글 작성</BoardButton>
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import BoardButton from "@/components/board/board/BoardButton.vue";
import BoardPagingBar from "@/components/board/board/BoardPagingBar.vue";


interface Post {
  postNum: number;
  postHits: number;
  postTitle: string;
  postInsertDatetime: string;
  postWriterNum: number;
  postCategoryNum: number;
  postCategoryTitle: string;
  thumbnail: string; // 썸네일 추가
}

interface Category {
  categoryNum: number;
  categoryTitle: string;
}

export default defineComponent({
  components: {
    BoardButton,
    BoardPagingBar
  },
  setup() {
    const posts = ref<Post[]>([]);
    const categories = ref<Category[]>([]);  // 데이터베이스에서 가져올 카테고리 목록
    const selectedCategory = ref<string>('전체');  // 기본 선택된 카테고리
    const isCategoryListVisible = ref(false);
    const router = useRouter();
    const currentPage = ref<number>(1);
    const postsPerPage = ref<number>(6);
    const searchQuery = ref<string>('');
    const startPage = ref<number>(1);

    const totalPages = computed(() =>
        Math.ceil(filteredPosts.value.length / postsPerPage.value)
    );

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
      return posts.value.filter(post => getCategoryTitle(post.postCategoryNum) === selectedCategory.value);
    });

    // categoryNum과 일치하는 categoryTitle을 반환하는 함수
    const getCategoryTitle = (categoryNum: number): string => {
      const category = categories.value.find(cat => cat.categoryNum === categoryNum);
      return category ? category.categoryTitle : "알 수 없는 카테고리"; // 카테고리를 찾지 못했을 때 기본 값
    };

    // 필터링된 게시글을 페이지에 맞게 자르기
    const paginatedPosts = computed(() => {
      const start = (currentPage.value - 1) * postsPerPage.value;
      const end = start + postsPerPage.value;
      return filteredPosts.value.slice(start, end);
    });

    // 카테고리 API에서 데이터 가져오기
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/board/categorys', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJta0BuYXZlci5jb20iLCJhdXRoIjpbIlJPTEVfVVNFUiJdLCJleHAiOjE3MzAzMzU2MzR9.rY_B7TQAfq_4Ti0XcFN5gUC3BQPHFux57Id8pJ2qF2lTlr4pekMVyYcgDQ5IJNu8K-QlFdhWEGICPPB2bUOCoA',
          },
        });
        categories.value = response.data.map((category: any) => ({
          categoryNum: category.categoryNum,
          categoryTitle: category.categoryTitle,
        }));
      } catch (error) {
        console.error('카테고리 목록을 불러오는 중 오류 발생:', error);
      }
    };

    // 게시글 API에서 데이터 가져오기
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/board/posts',{
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJta0BuYXZlci5jb20iLCJhdXRoIjpbIlJPTEVfVVNFUiJdLCJleHAiOjE3MzAzMzU2MzR9.rY_B7TQAfq_4Ti0XcFN5gUC3BQPHFux57Id8pJ2qF2lTlr4pekMVyYcgDQ5IJNu8K-QlFdhWEGICPPB2bUOCoA',
          },
        });
        console.log(response.data); // 응답 데이터 구조를 확인하기 위해 추가
        posts.value = response.data.postList.map((post: any) => ({
          postNum: post.postNum,
          postCategoryNum: post.postCategoryNum,
          postCategoryTitle: getCategoryTitle(post.CategoryNum),
          postTitle: post.postTitle,
          postInsertDatetime: post.postInsertDatetime,
          postWriterNum: post.postWriterNum,
          postHits: post.postHits,
          thumbnail: '/펫토리아이콘.png'  // 고정 이미지 경로
        }));
      } catch (error) {
        console.error('게시글 목록을 불러오는 중 오류 발생:', error);
      }
    };

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

    const search = () => {
      console.log('검색어:', searchQuery.value); // 실제 검색 로직을 여기에 추가
    };

    const goToPost = (postId: number) => {
      router.push({ name: 'BoardPost', params: { id: postId } });
    };

    // 컴포넌트가 마운트될 때 카테고리와 게시글 데이터 가져오기
    onMounted(() => {
      fetchCategories();
      fetchPosts();
    });

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
      search,
      searchQuery,
      goToPost,
      router,
      fetchCategories
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

.header-actions {
  display: flex;
  align-items: center;
  width: 100%;
}

.search-container {
  display: flex;
  align-items: center;
  margin-left: auto; /* 검색창과 버튼을 오른쪽 끝으로 밀기 */
}
.search-input {
  padding: 5px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px 0 0 5px; /* 왼쪽 둥근 모서리 */
  width: 200px;
}

.search-button {
  margin-left: -1px; /* 버튼과 검색창 사이의 경계선 없애기 */
  padding: 5px 10px;
  font-size: 1rem;
  background-color: #66cccc;
  border: 1px solid #ddd;
  border-radius: 0 5px 5px 0; /* 오른쪽 둥근 모서리 */
  cursor: pointer;
  color: white;
  transition: background-color 0.3s ease;
}
</style>
