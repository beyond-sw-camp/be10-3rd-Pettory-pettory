<script setup>
import axios from 'axios';
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {useAuthStore} from "@/stores/auth.js";
import WalkingGroupRecordForm from "@/components/walkinggroup/WalkingGroupApplication/WalkingGroupRecordForm.vue";

const router = useRouter();
const walkingGroupRecordData = ref(null);
const authStore = useAuthStore();

const fetchWalkingGroupRecordData = async (walkingGroupRecordId) => {
  try {
    console.log(authStore.accessToken);
    const response = await axios.get(`http://localhost:8080/api/walking-group/${walkingGroupRecordId}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    walkingGroupRecordData.value = response.data.walkingGroupRecordId;
  } catch (error) {
    console.error("산책 기록 정보를 가져오는 중 오류 발생", error);
  }
};

const handleWalkingGroupRecordEdit = async (formData) => {
  try {
    await axios.put(`http://localhost:8080/api/walking-group-record/${walkingGroupRecordData.value.walkingGroupRecordId}`
        , formData
        , {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    router.push("/walkinggrouprecords");
  } catch (error) {
    console.error("산책 모임 수정 중 오류 발생", error);
  }
};

onMounted(() => {
  const walkingGroupRecordId = router.currentRoute.value.params.id;
  fetchWalkingGroupRecordData(walkingGroupRecordId);
});
</script>

<template>
  <div class="container">
    <h1>산책 모임 수정</h1>
    <WalkingGroupRecordForm
        @submit="handleWalkingGroupRecordEdit"
        :initialData="walkingGroupRecordData"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex; /* flex 레이아웃 사용 */
  flex-direction: column; /* 자식 요소를 수직으로 쌓기 */
  align-items: center; /* 수평으로 중앙 정렬 */
  justify-content: center; /* 수직으로 중앙 정렬 */
}

h1 {
  margin: 10px;
  padding : 10px;
}
</style>