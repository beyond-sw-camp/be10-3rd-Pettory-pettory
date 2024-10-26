<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import WalkingGroupApplicationList
  from "@/components/walkinggroup/WalkingGroupApplication/WalkingGroupApplicationList.vue";
import PagingBar from "@/components/walkinggroup/common/PagingBar.vue";

const state = reactive({
  walkingGroupApplications: [], // 수정된 변수명
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
});

const modalState = ref({
  isVisible: false,
  message: ""
});

const authStore = useAuthStore();

const handleApplicationClick = async (walkingGroupApplicationId, action) => {
  try {
    const requestBody = {
      walkingGroupApprovalState: action
    };

    console.log("요청 본문:", requestBody);

    await axios.put(
        `http://localhost:8080/api/walking-group-application/${walkingGroupApplicationId}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }
    );

    console.log(walkingGroupApplications.value);

    // 목록에서 신청서 제거
    walkingGroupApplications.value = walkingGroupApplications.value.filter(
        (app) => {
          console.log(app.walkingGroupApplicationId);
          console.log(walkingGroupApplicationId);
          return app.walkingGroupApplicationId !== walkingGroupApplicationId
        }
    );
    alert(action === "ACCEPT" ? "신청이 승인되었습니다." : "신청이 거절되었습니다.");

  } catch (error) {
    console.error("에러 발생:", error.response ? error.response.data : error.message);
  }
};

const fetchWalkingGroupApplications = async (page = 1) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/walking-group-application/all`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      },
      params: {
        page,
      }
    });
    state.walkingGroupApplications = response.data.walkingGroupApplications;
    state.currentPage = response.data.currentPage;
    state.totalPages = response.data.totalPages;
    state.totalItems = response.data.totalItems;
  } catch (error) {
    console.error('산책 모임 신청 목록을 불러오는 중 에러가 발생했습니다.', error);
  }
};

const router = useRouter();

onMounted(() => fetchWalkingGroupApplications());
</script>

<template>
  <div class="container">
    <h1>산책 모임 신청자 목록</h1>
    <div class="walk-list">
      <WalkingGroupApplicationList :walkingGroupApplications="state.walkingGroupApplications"
        @handleApplicationClick="handleApplicationClick"
      />
      <PagingBar
          :currentPage="state.currentPage"
          :totalPages="state.totalPages"
          :totalItems="state.totalItems"
          @page-changed="fetchWalkingGroupApplications"
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

button:hover {
  background-color: #49C0AB;
}

div {
  text-align: right;
  margin-bottom: 20px;
}
</style>