<script setup>

// 부모 컴포넌트로부터 전달받는 props
import {computed} from "vue";
import BoardButton from "@/components/common/BoardButton.vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  },
});

// 페이지 변경 시 부모 컴포넌트로 이벤트를 전달
const emit = defineEmits(['pageChanged']);

// 페이지 변경 함수
const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('pageChanged', page); // 부모에게 페이지 변경 이벤트 전달
  }
};

// 현재 페이지 주변의 페이지 번호를 계산
/*
computed 속성은 의존하는 반응형 데이터가 변경될 때 자동으로 다시 계산된다. 이를 통해 상태가 변할 때마다 관련 데이터를 동기화할 수 있다.
또한 한 번 계산된 값을 캐싱하여, 의존하는 데이터가 변경되지 않는 한 동일한 결과를 반복적으로 계산하지 않는다. 이는 성능을 향상시키는 데 도움이 된다.
*/
const visiblePages = computed(() => {
  const pages = [];
  const range = 10; // 현재 페이지를 기준으로 몇 개의 페이지를 표시할지 결정
  const start = Math.max(1, props.currentPage - range);
  const end = Math.min(props.totalPages, props.currentPage + range);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

</script>

<template>
  <div class="paging-bar">
    <BoardButton
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)">
      이전
    </BoardButton>

    <span v-for="page in visiblePages" :key="page">
      <button
          :class="{ active: page === currentPage }"
          @click="changePage(page)">
        {{ page }}
      </button>
    </span>

    <button
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)">
      다음
    </button>
  </div>
</template>

<style scoped>
.paging-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 20px;
}

button {
  margin: 0 3px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

button:hover {
  background-color: #66cccc;
  color: white;
  border-radius: 5px;
}

button.active {
  font-weight: bold;
  color: #66cccc;
  background-color: #e0f7fa;
  padding: 5px 10px;
  border-radius: 5px;
}


</style>