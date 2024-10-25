<script setup>
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faCaretLeft);
library.add(faCaretRight);

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
  }
});

const emit = defineEmits(['page-changed']);

const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-changed', page);
  }
};

const visiblePage = computed(() => {
  const pages = [];
  const range = 5;
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
    <button
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)">
      <font-awesome-icon :icon="['fas', 'caret-left']" />
    </button>

    <span v-for="page in visiblePage" :key="page">
      <button
        :class="{ active: page === currentPage }"
        @click="changePage(page)">
        {{ page }}
      </button>
    </span>

    <button
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)">
      <font-awesome-icon :icon="['fas', 'caret-right']" />
    </button>
  </div>
</template>

<style scoped>
.paging-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 20px
}

button {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
}

button.active {
  background-color: white;
  color: black;
  font-weight: bold;
}

button:disabled {
  background-color: #d9d9d9;
  cursor: not-allowed;
}
</style>