<script setup>
import WalkingGroupForm from "@/walkinggroup/components/WalkingGroupForm.vue";
import axios from 'axios';
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {useAuthStore} from "@/stores/auth.js";

const router = useRouter();
const walkingGroupData = ref(null);
const authStore = useAuthStore();

const fetchWalkingGroupData = async (walkingGroupId) => {
  try {
    console.log(authStore.accessToken);
    const response = await axios.get(`http://localhost:8080/api/walking-group/${walkingGroupId}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    walkingGroupData.value = response.data.walkingGroupsById;
  } catch (error) {
    console.error("산책 모임 정보를 가져오는 중 오류 발생", error);
  }
};

const handleWalkingGroupEdit = async (formData) => {
  try {
    await axios.put(`http://localhost:8080/api/walking-group/${walkingGroupData.value.walkingGroupId}`, formData, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    router.push("/walkinggroups");
  } catch (error) {
    console.error("산책 모임 수정 중 오류 발생", error);
  }
};

onMounted(() => {
  const walkingGroupId = router.currentRoute.value.params.id;
  fetchWalkingGroupData(walkingGroupId);
});
</script>

<template>
  <div class="container">
    <h1>산책 모임 수정</h1>
    <WalkingGroupForm
        @submit="handleWalkingGroupEdit"
        :initialData="walkingGroupData"
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