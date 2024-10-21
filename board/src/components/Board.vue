<template>
  <div class="board-page">
    <h1 class="board-title">게시판</h1>

    <!-- 카테고리 및 게시글 목록 테이블 -->
    <div class="board-table">
      <table>
        <thead>
        <tr>
          <th>카테고리</th>
          <th>글 제목</th>
          <th>게시 시간</th>
          <th>작성자</th>
          <th>조회수</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(post, index) in posts" :key="index">
          <td>{{ post.category }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.createdAt }}</td>
          <td>{{ post.author }}</td>
          <td>{{ post.views }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- 페이지네이션 -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">이전</button>
      <span v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="{ active: currentPage === page }">{{ page }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">다음</button>
    </div>

    <!-- 관리 및 글 작성 버튼 -->
    <div class="board-actions">
      <button @click="manageCategories">카테고리 관리</button>
      <button @click="writePost">게시글 작성</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        // 게시글 샘플 데이터
        { category: '상품', title: '예시 제목 1', createdAt: '2024-10-10 17:10', author: '작성자1', views: 15 },
        // 필요에 따라 데이터 추가
      ],
      currentPage: 1,
      totalPages: 10, // 총 페이지 수는 서버에서 받아온 데이터에 따라 결정됨
    };
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
    manageCategories() {
      // 카테고리 관리 페이지로 이동
    },
    writePost() {
      // 게시글 작성 페이지로 이동
    }
  }
};
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

.board-table {
  width: 100%;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}

.pagination {
  display: flex;
  justify-content: center;
  margin: 20px 0;
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
  justify-content: flex-end;
}

.board-actions button {
  margin-left: 10px;
}
</style>
