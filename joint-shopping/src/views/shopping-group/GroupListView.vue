<script setup>
import {reactive, ref} from 'vue';
import SearchBar from "@/components/shopping-group/SearchBar.vue";
import BackButton from "@/components/common/BackButton.vue";
import {useRouter} from "vue-router";
import GroupList from "@/components/shopping-group/GroupList.vue";

// 상태 관리를 위한 반응형 객체 생성
const state = reactive({
  groups: [
    {
      title: '강아지 사료 공동구매 하실분 구해요!',
      item: '몽이있는 사료',
      participants: 10,
      price: 10000,
      maxParticipants: 100,
      date: '2000-01-01'
    },
    {
      title: '사료 공동구매 하실분 구해요!',
      item: '몽이있는 사료',
      participants: 10,
      price: 10000,
      maxParticipants: 100,
      date: '2000-01-01'
    }
  ],
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  categoryCode: null,
  productName: ''
});

// 검색 조건이 변경될 때마다 API 호출
const onSearch = (searchParams) => {
  state.groups.title = searchParams.searchData;
  // fetchProducts(1);  // 페이지를 1로 초기화하고 다시 호출 // 검색 기능 라우터 이후에 구현 악시오스 이용
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
    <GroupList :groups="state.groups" />
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
