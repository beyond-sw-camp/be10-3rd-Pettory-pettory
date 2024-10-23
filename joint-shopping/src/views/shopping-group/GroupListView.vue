<script setup>
import {reactive, ref} from 'vue';
import SearchBar from "@/components/shopping-group-list/SearchBar.vue";
import BackButton from "@/components/common/BackButton.vue";
import {useRouter} from "vue-router";
import GroupList from "@/components/shopping-group-list/GroupList.vue";
import ButtonSmallColor from "@/components/common/ButtonSmallColor.vue";
import ButtonLongColor from "@/components/common/ButtonLongColor.vue";

// 상태 관리를 위한 반응형 객체 생성
const state = reactive({
  groups: [
    {
      id: 1,
      title: '강아지 사료 공동구매 하실분 구해요!',
      item: '몽이있는 사료',
      participants: 10,
      price: 10000,
      maxParticipants: 100,
      date: '2000-01-01',
      img: "@/assets/프로젝트.png",
      contents: "강아지 사료 사실분 구합니다."
    },
    {
      id: 2,
      title: '사료 공동구매 하실분 구해요!',
      item: '몽이있는 사료',
      participants: 10,
      price: 10000,
      maxParticipants: 100,
      date: '2000-01-01',
      img: "@/assets/프로젝트.png",
      contents: "강아지 사료 사실분 구합니다.@@@@@@@@@@@@@@@@@@@@@@@@@"
    },
    {
      id: 3,
      title: '사료 공동구매 하실분 구해요!',
      item: '몽이있는 사료',
      participants: 10,
      price: 10000,
      maxParticipants: 100,
      date: '2000-01-01',
      img: "@/assets/프로젝트.png",
      contents: "강아지 사료 사실분 구합니다.@@@@@@@@@@@@@@@@@@@@@@@@@"
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
const goToGroupCreate = () => {
  router.push('/shoppinggroup/create');
}

</script>

<template>
  <main class="shopping-group-list">
    <div class="text-center">
      <BackButton/>
      <h2>모임방 목록</h2>
    </div>
    <SearchBar @search="onSearch"/>
    <GroupList :groups="state.groups"/>
    <div class="button-div">
      <ButtonLongColor>즐겨찾기 모임방</ButtonLongColor>
      <div class="button-right-div">
        <ButtonSmallColor class="left-button">전체 모임방</ButtonSmallColor>
        <ButtonSmallColor class="right-button" @click="goToGroupCreate">모임방 생성</ButtonSmallColor>
      </div>
    </div>
  </main>
</template>

<style scoped>
.shopping-group-list {
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

.button-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-button {
  margin-right: 10px;
}

.right-button {
  margin-left: 10px;
}
</style>
