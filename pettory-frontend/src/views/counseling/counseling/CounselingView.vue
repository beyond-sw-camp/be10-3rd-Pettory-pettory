<template>
  <div class="counseling-page">
    <!-- 상담 제목과 카테고리 버튼 -->
    <div class="counseling-header">
      <h1 class="counseling-title">상담</h1>

      <!-- 카테고리 버튼과 검색창 -->
      <div class="header-actions">
        <!-- 카테고리 버튼 -->
        <div class="category-button" @mouseover="showCategories" @mouseleave="hideCategories">
          <CounselingButton>카테고리</CounselingButton>

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
            <CounselingButton @click="search" class="search-button">검색</CounselingButton>
          </div>


      </div>
    </div>

    <!-- 질문 목록 그리드 -->
    <div class="counseling-grid">
      <div
          v-for="(question, index) in paginatedQuestions"
          :key="index"
          class="question-item"
          @click="goToQuestion(question.id)"
      >
        <div class="question-information">
          <span class="question-category">{{ question.category }}</span>
          <span class="question-views">조회 수 : {{ question.views }}</span>
        </div>

        <div class="question-title">{{ question.title }}</div>
        <img :src="question.thumbnail" alt="썸네일" class="question-thumbnail" />
          <div class="question-meta">
            <span class="question-created-at">{{ question.createdAt }}</span>
            <span class="question-author">{{ question.author }}</span>
          </div>
      </div>
    </div>

    <!-- 페이지네이션 컴포넌트 -->
    <CounselingPagingBar
        :currentPage="currentPage"
        :totalPages="totalPages"
        :startPage="startPage"
        :visiblePages="visiblePages"
        @goToPage="goToPage"
        @prevSet="prevSet"
        @nextSet="nextSet"
    />
      <!-- 질문 작성 버튼 -->
      <div class="counseling-actions">
        <RouterLink to="/counseling/question/new" active-class="active" replace>
          <CounselingButton :buttonStyle="{ padding: '3px 10px', fontSize: '1.1rem' }">질문 작성</CounselingButton>
        </RouterLink>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import CounselingButton from "@/components/counseling/counseling/CounselingButton.vue";
import CounselingPagingBar from "@/components/counseling/counseling/CounselingPagingBar.vue";


interface Question {
  id: number;
  category: string;
  title: string;
  createdAt: string;
  author: string;
  views: number;
  thumbnail: string; // 썸네일 추가
}

interface Category {
  categoryNum: number;
  categoryTitle: string;
}

export default defineComponent({
  components: {
    CounselingButton,
    CounselingPagingBar
  },
  setup() {
    const questions = ref<Question[]>([]);
    const categories = ref<Category[]>([]);  // 데이터베이스에서 가져올 카테고리 목록
    const selectedCategory = ref<string>('전체');  // 기본 선택된 카테고리
    const isCategoryListVisible = ref(false);
    const router = useRouter();
    const currentPage = ref<number>(1);
    const questionsPerPage = ref<number>(9);
    const searchQuery = ref<string>('');
    const startPage = ref<number>(1);


    const totalPages = computed(() =>
        Math.ceil(filteredQuestions.value.length / questionsPerPage.value)
    );

    const visiblePages = computed(() => {
      const pages = [];
      for (let i = startPage.value; i <= Math.min(startPage.value + 9, totalPages.value); i++) {
        pages.push(i);
      }
      return pages;
    });

    // 선택된 카테고리에 따라 질문을 필터링
    const filteredQuestions = computed(() => {
      if (selectedCategory.value === '전체') {
        return questions.value;
      }
      return questions.value.filter(question => question.category === selectedCategory.value);
    });

    // 필터링된 질문을 페이지에 맞게 자르기
    const paginatedQuestions = computed(() => {
      const start = (currentPage.value - 1) * questionsPerPage.value;
      const end = start + questionsPerPage.value;
      return filteredQuestions.value.slice(start, end);
    });

    // 카테고리 API에서 데이터 가져오기
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/board/categorys', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJta0BuYXZlci5jb20iLCJhdXRoIjpbIlJPTEVfVVNFUiJdLCJleHAiOjE3MzA1MjcwNzB9.zapMvpxgmz29epMtyrQZlsnCf91Hv796pcGLK353e8oEC5NoGpaEyoyil3kDXgUc24Zc98r7BLHfrIzxF0hdpw',
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

    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/question/v1/questions', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJta0BuYXZlci5jb20iLCJhdXRoIjpbIlJPTEVfVVNFUiJdLCJleHAiOjE3MzA1MjcwNzB9.zapMvpxgmz29epMtyrQZlsnCf91Hv796pcGLK353e8oEC5NoGpaEyoyil3kDXgUc24Zc98r7BLHfrIzxF0hdpw',
          },
        });

        console.log(response.data); // 응답 데이터 형식 확인용

        if (Array.isArray(response.data.questions)) {
          questions.value = response.data.questions.map((question: any) => ({
            id: question.counselingQuestionNum,
            category: question.counselingQuestionState,
            title: question.counselingQuestionTitle,
            createdAt: question.counselingQuestionInsertDatetime,
            author: question.user.userNickname,
            views: question.counselingQuestionHits,
            thumbnail: question.counselingQuestionFileUrl,
        }));
        } else {
          console.error("예상하지 못한 응답 형식입니다. 배열이 아닙니다.");
        }
      } catch (error) {
        console.error('질문 목록을 불러오는 중 오류 발생:', error);
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

    const goToQuestion = (questionId: number) => {
      router.push({ name: 'CounselingQuestion', params: { id: questionId } });
    };

    // 컴포넌트가 마운트될 때 카테고리 데이터 가져오기
    onMounted(() => {
      fetchCategories();
      fetchQuestions();
    });


    return {
      questions,
      currentPage,
      questionsPerPage,
      selectedCategory,
      showCategories,
      hideCategories,
      isCategoryListVisible,
      categories,
      filterByCategory,
      totalPages,
      startPage,
      visiblePages,
      paginatedQuestions,
      goToPage,
      prevSet,
      nextSet,
      search,
      searchQuery,
      goToQuestion,
      router
    };
  }
});
</script>


<style scoped>
.counseling-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 한 줄에 3개의 질문 */
  gap: 20px; /* 질문 간 간격 */
  padding: 20px;
}

.question-item {
  border: 2px solid #66cccc;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  background-color: #fff;
  transition: transform 0.3s ease;
}

.question-item:hover {
  transform: scale(1.05); /* 마우스 호버 시 살짝 확대 */
}

.question-thumbnail {
  width: 100%;
  height: 150px; /* 썸네일 이미지 크기 */
  object-fit: cover;
  margin-bottom: 10px;
}

.question-category, .question-title, .question-meta {
  margin: 5px 0;
}

.question-meta {
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

.counseling-actions {
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽에 정렬 */
  gap: 10px; /* 버튼 사이에 간격 */
}

.question-information {
  display: flex;
  justify-content: space-between; /* 왼쪽과 오른쪽으로 요소 배치 */
  align-items: center; /* 세로축 가운데 정렬 */
}

.question-category {
  text-align: left; /* 카테고리 텍스트 왼쪽 정렬 */
}

.question-views {
  text-align: right; /* 조회수 텍스트 오른쪽 정렬 */
}

.question-meta {
  display: flex;
  justify-content: space-between; /* 왼쪽과 오른쪽으로 요소 배치 */
  align-items: center; /* 세로축 가운데 정렬 */
}

.question-created-at {
  text-align: left; /* 카테고리 텍스트 왼쪽 정렬 */
}

.question-author {
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
