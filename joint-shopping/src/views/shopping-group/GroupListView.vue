<script setup>
import { ref } from 'vue';
import SearchBar from "@/components/shopping-group/SearchBar.vue";
import BackButton from "@/components/common/BackButton.vue";
import {useRouter} from "vue-router";


// 검색 조건이 변경될 때마다 API 호출
const onSearch = (searchParams) => {
  state.productName = searchParams.productName;
  // fetchProducts(1);  // 페이지를 1로 초기화하고 다시 호출
};

const router = useRouter();

</script>

<template>
  <main class="shopping-group">
    <div class="text-center">
      <BackButton/>
      <h2>모임방 목록</h2>
    </div>
    <SearchBar @search="onSearch"/>
  </main>
</template>

<style scoped>
.shopping-group {
  display: flex;
  flex-direction: column;
  margin-left: 200px;
  margin-right: 200px;
}
.text-center {
  margin-top: 50px;
  margin-bottom: 50px;
  text-align: center;
}
</style>
