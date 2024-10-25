<script setup>
import { ref, reactive, onMounted } from "vue";
import WalkingGroupRecordList from "@/WalkingGroupApplication/components/WalkingGroupRecordList.vue"
import axios from "axios";
import PagingBar from "@/common/PagingBar.vue";
import { useRoute, useRouter } from "vue-router";
import ButtonSmallColor from "@/common/ButtonSmallColor.vue";
import {useAuthStore} from "@/stores/auth.js";
const route = useRoute();
const walkingGroupId = route.params.id;


const state = reactive({
  walkingGroupRecord: [],
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
});

const authStore = useAuthStore();

const fetchWalkingGroupRecords = async (page = 1) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/walking-group-record/${walkingGroupId}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      },
      params: {
        page,
      }
    });
    console.log('Fetched Records:', response.data.walkingGroupRecord);
    state.walkingGroupRecord = response.data.walkingGroupRecord;
    state.currentPage = response.data.currentPage;
    state.totalPages = response.data.totalPages;
    state.totalItems = response.data.totalItems;
  } catch (error) {
    console.error('산책 기록 목록을 불러오는 중 에러가 발생했습니다.', error);
  }
};

const router = useRouter();

const goToWalkingGroupRecordCreate = () => {
  router.push(`/walkinggrouprecords/${walkingGroupId}/create`);
};

onMounted(() => fetchWalkingGroupRecords());
</script>

<template>
  <div class="container">
    <h1>산책 기록 목록</h1>
    <div class="btn">
      <ButtonSmallColor @click="goToWalkingGroupRecordCreate">생성하기</ButtonSmallColor>
    </div>
    <div class="walk-list">
      <WalkingGroupRecordList :walkingGroupRecord="state.walkingGroupRecord" />
      <PagingBar
          :currentPage="state.currentPage"
          :totalPages="state.totalPages"
          :totalItems="state.totalItems"
          @page-changed="fetchWalkingGroupRecords"
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

.walk-list {
  border: 1px solid #53D9C1; /* 경계 스타일 지정 */
  border-radius: 10px;
  background-color: white;
  width: 100%; /* 가능한 너비 사용 */
  max-width: 800px; /* 더 나은 레이아웃을 위한 최대 너비 설정 */
  padding: 20px; /* 패딩 추가 */
}

.btn {
  justify-content: flex-end;
}

button:hover {
  background-color: #49C0AB;
}

div {
  text-align: right;
  margin-bottom: 20px;
}
</style>