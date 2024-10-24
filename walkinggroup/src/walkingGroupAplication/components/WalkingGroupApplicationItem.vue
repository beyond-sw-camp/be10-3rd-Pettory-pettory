<template>
  <div>
    <div v-if="walkingGroupApplications.length === 0">
      <p class="justify-content-center">신청자가 없습니다.</p>
    </div>
    <div v-else>
      <div v-for="application in walkingGroupApplications" :key="application.id" class="item">
        <p class="walkingGroupApplication-userName">{{ application.UserName }}</p>
        <ButtonSmallColor @click="() => handleApplicationClick(application.id, 'ACCEPT')">승인하기</ButtonSmallColor>
        <ButtonSmallColor @click="() => handleApplicationClick(application.id, 'REFUSE')">거절하기</ButtonSmallColor>
      </div>
    </div>

    <!-- 모달 컴포넌트 추가 -->
    <Modal v-if="showModal" @close="closeModal" :message="modalMessage" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import ButtonSmallColor from "@/common/ButtonSmallColor.vue";
import Modal from "@/common/Modal.vue"; // 모달 컴포넌트 import
import axios from "axios";
import { useAuthStore } from "@/stores/auth"; // 인증 상태를 가져오기 위한 스토어

const walkingGroupApplications = ref([]); // 신청서 목록
const authStore = useAuthStore(); // 인증 스토어 사용
const showModal = ref(false); // 모달 표시 여부
const modalMessage = ref(""); // 모달 메시지

const props = defineProps({
  walkingGroupApplications: {
    type: Object,
    required: true
  }
});

const handleApplicationClick = async (walkingGroupApplicationId, action) => {
  try {
    const requestBody = {
      status: action // "ACCEPT" 또는 "REFUSE"
    };

    await axios.put(`http://localhost:8080/api/walking-group-application/${walkingGroupApplicationId}`, requestBody, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });

    // 성공적인 업데이트 후 목록에서 제거
    walkingGroupApplications.value = walkingGroupApplications.value.filter(app => app.id !== walkingGroupApplicationId);

    // 모달 메시지 설정 및 모달 표시
    modalMessage.value = action === "ACCEPT" ? "승인되었습니다." : "거절되었습니다.";
    showModal.value = true; // 모달 열기
  } catch (error) {
    console.error(action === "ACCEPT" ? "승인 중 에러가 발생했습니다." : "거절 중 에러가 발생했습니다.", error);
  }
};

// 모달 닫기 함수
const closeModal = () => {
  showModal.value = false;
};

</script>

<style scoped>
.item {
  display: flex;
  width: 80%;
  padding: 20px;
  margin: 10px;
  border: 1px solid #53D9C1;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.item:hover {
  background-color: #f0f0f0;
}

.walkingGroupApplication-userName {
  flex: 1;
}

.walkingGroupApplication-userName {
  margin: 5px 0;
}
</style>
