<script setup>
import { useRouter } from 'vue-router'; // Vue Router 훅을 불러옴

const router = useRouter(); // router 인스턴스 생성

// 뒤로가기 함수
const goBack = () => {
  router.back(); // 이전 페이지로 이동
};
</script>

<template>
  <div class="back-button-container">
    <!-- 뒤로가기 버튼 -->
    <button @click="goBack" class="back-button">
      <!-- 아이콘 -->
      <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.back-button-container {
  padding: 16px;
}

.back-button {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  color: #4a5568;
}

.back-button:hover .icon {
  color: #319795;
}

.back-button:hover {
  color: #319795;
}
</style>