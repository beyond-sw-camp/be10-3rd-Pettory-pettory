<script setup>
import { ref, reactive, onMounted } from "vue";

import axios from "axios";
import { useRouter } from "vue-router";
import {useAuthStore} from "@/stores/auth.js";
import RegisterWalkingGroupList from "@/components/walkinggroup/WalkingGroupApplication/RegisterWalkingGroupList.vue";
import PagingBar from "@/components/joint-shopping/shopping-group-list/PagingBar.vue";

const state = reactive({
  registerWalkingGroups: [],
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
});

const authStore = useAuthStore();

const fetchRegisterWalkingGroups = async (page = 1) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/register-walking-group/all`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      },
      params: {
        page,
      }
    });
    state.registerWalkingGroups = response.data.registerWalkingGroups;
    state.currentPage = response.data.currentPage;
    state.totalPages = response.data.totalPages;
    state.totalItems = response.data.totalItems;
  } catch (error) {
    console.error('가입한 산책 모임 목록을 불러오는 중 에러가 발생했습니다.', error);
  }
};

const router = useRouter();

onMounted(() => fetchRegisterWalkingGroups());
</script>

<template>
  <div class="container">
    <h1>가입한 산책 모임 목록</h1>
    <div class="register-list">
      <RegisterWalkingGroupList :registerWalkingGroups="state.registerWalkingGroups"/>
      <PagingBar
          :currentPage="state.currentPage"
          :totalPages="state.totalPages"
          :totalItems="state.totalItems"
          @page-changed="fetchRegisterWalkingGroups"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex; /* flex 레이아웃 사용 */
  flex-direction: column; /* 자식 요소를 수직으로 쌓기 */
  align-items: center; /* 수평으로 중앙 정렬 */
  justify-content: center; /* 수직으로 중앙 정렬 */
}

.register-list {
  border: 1px solid #53D9C1; /* 경계 스타일 지정 */
  border-radius: 10px;
  background-color: white;
  width: 100%; /* 가능한 너비 사용 */
  max-width: 800px; /* 더 나은 레이아웃을 위한 최대 너비 설정 */
  padding: 20px; /* 패딩 추가 */
}

div {
  text-align: right;
  margin-bottom: 20px;
}
</style>