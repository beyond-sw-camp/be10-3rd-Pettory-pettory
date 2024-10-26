<template>
  <div class="pagination">
    <CounselingButton @click="prevSet" :disabled="currentPage === 1">이전</CounselingButton>
    <span v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="{ active: currentPage === page }">
      {{ page }}
    </span>
    <CounselingButton @click="nextSet" :disabled="currentPage === totalPages">다음</CounselingButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import CounselingButton from "@/components/common/CounselingButton.vue";

export default defineComponent({
  components: {
    CounselingButton,
  },
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    startPage: {
      type: Number,
      required: true
    },
    visiblePages: {
      type: Array as PropType<number[]>,
      required: true
    }
  },
  setup(props, { emit }) {
    const goToPage = (page: number) => {
      emit('goToPage', page);
    };

    const prevSet = () => {
      emit('prevSet');
    };

    const nextSet = () => {
      emit('nextSet');
    };

    return {
      goToPage,
      prevSet,
      nextSet,
    };
  }
});
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.pagination span {
  margin: 0 3px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.pagination span:hover {
  background-color: #66cccc;
  color: white;
  border-radius: 5px;
}

.pagination .active {
  font-weight: bold;
  color: #66cccc;
  background-color: #e0f7fa;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>
