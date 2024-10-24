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
import PagingBar from "@/components/shopping-group-list/PagingBar.vue";

const authStore = useAuthStore();

// 상태 관리를 위한 반응형 객체 생성
const state = reactive({
  groups: [],
  bookmarks: [],
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  categoryNum: null,
  groupName: '',
  products: '',
});

// API 호출 함수 / 전체 모임방
const fetchGroups = async (page = 1) => {
  try {
    const token = authStore.accessToken;
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
    console.log(state.groupName);
    state.groups = response.data.groupList;
    state.currentPage = response.data.currentPage;
    state.totalPages = response.data.totalPages;
    state.totalItems = response.data.totalItems;

  } catch (error) {
    console.error('상품 목록을 불러오는 중 에러가 발생했습니다:', error);
  }
};

// API 호출 함수 / 현재 유저의 참가 모임방
const fetchUserGroups = async (page = 1) => {
  try {
    const token = authStore.accessToken;
    const response = await axios.get(`http://localhost:8080/jointshopping/groups/user`, {
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

// API 호출 함수 / 즐겨찾기 된 모임방
const fetchBookmarks = async (page = 1) => {
  try {
    const token = authStore.accessToken;
    const response = await axios.get(`http://localhost:8080/jointshopping/bookmarks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
      }
    });

    console.log(response.data);
    state.groups = response.data.groupList;
    state.bookmarks = response.data.groupList.map(item => item.jointShoppingGroupNum);
    state.currentPage = response.data.currentPage;
    state.totalPages = response.data.totalPages;
    state.totalItems = response.data.totalItems;
    console.log(state.bookmarks);

  } catch (error) {
    console.error('상품 목록을 불러오는 중 에러가 발생했습니다:', error);
  }
};

// 북마크 체크 api
const handleBookmarkCheck = async (groupNum, isActive, newBookmarks) => {
  try {
    const token = authStore.accessToken;

    // 북마크 체크
    if (isActive) {
      await axios.post(`http://localhost:8080/jointshopping/${groupNum}/bookmarks`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      await axios.delete(`http://localhost:8080/jointshopping/${groupNum}/bookmarks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    state.bookmarks = newBookmarks;

  } catch (error) {
    console.error("오류 발생:", error);
  }
};

// 전체 모임방, 참가 모임방 토글
const range = ref('participation')
const rangeToggle = () => {
  range.value = (range.value === "entire" || range.value === "bookmark") ? "participation" : "entire";

  if (range.value === 'participation') {
    fetchUserGroups(1);  // 페이지를 1로 초기화하고 다시 호출
  } else if (range.value === 'entire') {
    fetchGroups(1);  // 페이지를 1로 초기화하고 다시 호출
  }
}

// 즐겨찾기 조회 클릭 시마다 API 호출
const rangeBookmark = () => {
  range.value = "bookmark";
  fetchBookmarks(1);
}

// 검색 조건이 변경될 때마다 API 호출
const onSearch = (searchData) => {
  state.groupName = searchData;
  state.products = searchData;
  fetchGroups(1);  // 페이지를 1로 초기화하고 다시 호출
};

// 페이지 수정
const changePage = (page) => {

  if (range.value === 'participation') {
    fetchUserGroups(page);  // 페이지를 1로 초기화하고 다시 호출
  } else if (range.value === 'entire') {
    fetchGroups(page);  // 페이지를 1로 초기화하고 다시 호출
  } else if (range.value === 'bookmark'){
    fetchBookmarks(page);
  }
}


const router = useRouter();
const goToGroupCreate = () => {
  router.push('/shoppinggroup/create');
}

// 컴포넌트 마운트 시 제품 목록 로드
onMounted(() => {
  fetchUserGroups();
  fetchGroups();
  fetchBookmarks();
});
</script>

<template>
  <main class="shopping-group-list">
    <div class="text-center">
      <BackButton/>
      <h2>{{ range === 'entire' ? '전체 모임방 목록' : (range === 'participation' ? '참가하신 모임방 목록' : '즐겨찾기 된 모임방 목록') }}</h2>
    </div>
    <SearchBar @search="onSearch"/>
    <GroupList :groups="state.groups" :bookmarks="state.bookmarks" :range="range" @check="handleBookmarkCheck"/>
    <div class="button-div">
      <div>
        <ButtonLongColor v-if="range !== 'bookmark'" @click="rangeBookmark">즐겨찾기 모임방</ButtonLongColor>
      </div>
      <div class="button-right-div">
        <ButtonSmallColor class="left-button" @click="rangeToggle">{{
            (range === 'entire' || range === 'bookmark') ? '참가 모임방' : '전체 모임방'
          }}
        </ButtonSmallColor>
        <ButtonSmallColor class="right-button" @click="goToGroupCreate">모임방 생성</ButtonSmallColor>
      </div>
    </div>
    <!-- 페이지네이션 컴포넌트 -->
    <PagingBar
        :currentPage="state.currentPage"
        :totalPages="state.totalPages"
        :totalItems="state.totalItems"
        @pageChanged="changePage"
    />
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
