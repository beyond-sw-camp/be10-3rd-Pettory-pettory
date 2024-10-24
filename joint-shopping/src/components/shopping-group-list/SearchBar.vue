<script setup>
import {reactive, ref} from 'vue';
import ButtonSmallColor from "@/components/common/ButtonSmallColor.vue";

// 검색어 관리
const searchData = ref('');

const emit = defineEmits(['search']);

// 부모 컴포넌트로 검색 이벤트 전달
const emitSearch = () => {
  emit('search', searchData.value);
};
</script>

<template>
  <div class="search-bar">
    <input
        type="text"
        v-model="searchData"
        placeholder="검색어을 입력하세요"
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
