<script setup>
import { reactive } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faSearch);

// 상태 정의
const state = reactive({
  searchQuery: '',
});

const emit = defineEmits(['search']);

// 검색 버튼 클릭 시 이벤트 발행
const emitSearch = () => {
  emit('search', {
    walkingGroupName: state.searchQuery || null,
    walkingGroupInfo: state.searchQuery || null
  });
};
</script>

<template>
  <div class="search-bar">
    <input
        type="text"
        v-model="state.searchQuery"
        placeholder="검색어를 입력하세요"
        class="search-input"
    />
    <button @click="emitSearch" class="search-button">
      <font-awesome-icon :icon="['fas', 'search']" />
    </button>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  border: 1px solid #53D9C1; /* 테두리 색상 #53D9C1 */
  border-radius: 10px; /* 둥근 모서리 */
  padding: 5px 10px;
  width: 100%;
  max-width: 800px; /* 최대 너비 500px */
}

.search-input {
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 14px;
  border-radius: 24px;
  background-color: white;
}

.search-input::placeholder {
  color: #d9d9d9; /* 연한 회색 플레이스홀더 */
}

.search-button {
  background-color: white;
  border: none;
  cursor: pointer;
}

.search-button i {
  color: black;
}

.search-button:hover i {
  color: #555;
}
</style>