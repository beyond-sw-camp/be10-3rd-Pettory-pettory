<script setup>
import { reactive } from 'vue';
import ButtonSmallColor from "@/components/common/ButtonSmallColor.vue";

// 검색 상태 관리
const state = reactive({
  searchData: ''
});

const emit = defineEmits(['search']);

// 부모 컴포넌트로 검색 이벤트 전달
const emitSearch = () => {
  emit('search', {
    searchData: state.searchData || null     // 입력 안되면 null
  });
};
</script>

<template>
  <div class="search-bar">
    <input
        type="text"
        v-model="state.searchData"
        placeholder="상품명을 입력하세요"
    />

    <ButtonSmallColor @click="emitSearch">검색</ButtonSmallColor>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: end;
}

input {
  padding: 5px;
}

</style>
