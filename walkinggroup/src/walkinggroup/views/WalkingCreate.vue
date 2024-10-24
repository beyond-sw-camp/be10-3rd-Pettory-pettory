<script setup>
import WalkingGroupForm from "@/walkinggroup/components/WalkingGroupForm.vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const handleWalkingGroupCreate = async (formData) => {
  try {
    await axios.post("http://localhost:8080/api/walking-group/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    router.push("/walkinggroups")
  } catch (error) {
    console.error("산책 모임 등록 중 오류 발생", error);
  }
};
</script>

<template class="container">
  <div class="content">
    <h1>산책 모임 생성</h1>
    <WalkingGroupForm @submit="handleWalkingGroupCreate"/>
  </div>
</template>

<style scoped>
.container {
  display: flex; /* flex 레이아웃 사용 */
  flex-direction: column; /* 자식 요소를 수직으로 쌓기 */
  align-items: center; /* 수평으로 중앙 정렬 */
  justify-content: center; /* 수직으로 중앙 정렬 */
  background-color: #f5f5f5;
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