<script setup>
import {onMounted, reactive, ref} from 'vue';
import SearchBar from "@/components/shopping-group-list/SearchBar.vue";
import BackButton from "@/components/common/BackButton.vue";
import {useRouter} from "vue-router";
import GroupList from "@/components/shopping-group-list/GroupList.vue";
import ButtonSmallColor from "@/components/common/ButtonSmallColor.vue";
import ButtonLongColor from "@/components/common/ButtonLongColor.vue";
import {useAuthStore} from "@/stores/auth.js";
import axios from "axios";


const authStore = useAuthStore();

// 상태 관리를 위한 반응형 객체 생성
const state = reactive({
  groups: [],
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  categoryNum: null,
  groupName: '',
  products: ''
});

// API 호출 함수
const fetchGroups = async (page = 1) => {
  try {
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqaGhAbmF2ZXIuY29tIiwiYXV0aCI6WyJST0xFX1VTRVIiXSwiZXhwIjoxNzMwMjczNjI5fQ.iIBnjCH6a0dgwrxORntXBEKlnSIV1V1UORP7OViWT-yNzSpmUEkzWWm8Zpug06m1d7asZMVjU5R52hYANKVpiw";
    const response = await axios.get(`http://localhost:8080/jointshopping/groups`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        categoryNum: state.categoryNum || null,
        groupName: state.groupName || null,
        products: state.products || null
      }
    });
    console.log(response.data);
    state.groups = response.data.groupList;
    state.currentPage = response.data.currentPage;
    state.totalPages = response.data.totalPages;
    state.totalItems = response.data.totalItems;
  } catch (error) {
    console.error('상품 목록을 불러오는 중 에러가 발생했습니다:', error);
  }
};


// 검색 조건이 변경될 때마다 API 호출
const onSearch = (searchParams) => {
  state.categoryNum = searchParams.categoryNum;
  state.groupName = searchParams.groupName;
  state.products = searchParams.products;
  fetchGroups(1);  // 페이지를 1로 초기화하고 다시 호출
};

const router = useRouter();
const goToGroupCreate = () => {
  router.push('/shoppinggroup/create');
}

// 컴포넌트 마운트 시 제품 목록 로드
onMounted(() => fetchGroups());
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
