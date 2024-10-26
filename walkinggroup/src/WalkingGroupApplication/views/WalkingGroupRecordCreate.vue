<script setup>
import WalkingGroupRecordForm from "@/WalkingGroupApplication/components/WalkingGroupRecordForm.vue";
import axios from "axios";
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth.js";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const walkingGroupId = route.params.id;

const handleWalkingGroupRecordCreate = async (formData) => {

  formData = { ...formData, walkingGroupId }

  try {
    await axios.post("http://localhost:8080/api/walking-group-record/", formData, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    router.push(`/walkinggrouprecords/${walkingGroupId}`)
  } catch (error) {
    console.error("산책 기록 등록 중 오류 발생", error);
  }
};
</script>

<template>
  <div  class="container">
    <div class="content">
      <h1>산책 기록 생성</h1>
      <WalkingGroupRecordForm @submit="handleWalkingGroupRecordCreate"/>
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
.content {
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
  justify-content: center;
  width: 100%; /* 전체 화면 가로 너비 사용 */
}
h1 {
  margin: 10px;
  padding: 30px;
  text-align: center;
}
</style>