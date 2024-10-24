<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from "vue-router";
import WalkingGroupDetail from "@/walkinggroup/components/WalkingGroupDetail.vue";

const walkingGroup = ref(null);
const route = useRoute();
const router = useRouter();

const walkingGroupId = route.params.id;

const fetchWalkingGroupDetail = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/walking-group/${walkingGroupId}`);
    walkingGroup.value = response.data.walkingGroup;
  } catch (error) {
    console.error('산책 모임 정보를 불러오는 중 에러가 발생했습니다.', error);
  }
};

const goToEditPage = () => {
  router.push(`/walkinggroups/${walkingGroupId}/edit`);
};

const deleteWalkingGroup  = async () => {
  const confirmed = confirm('이 산책 모임을 삭제하시겠습니까?')
  if(confirmed) {
    try {
      await axios.delete(`http://localhost:8080/api/walking-group/${walkingGroupId}`);
      alert('산책 모임이 성공적으로 삭제되었습니다.');
      router.push('/walkinggroups');
    } catch (error) {
      console.error('산책 모임 삭제 중 오류가 발생했습니다.', error);
      alert('산책 모임 삭제에 실패했습니다.');
    }
  }
};

onMounted(fetchWalkingGroupDetail());
</script>

<template>
  <div class="container">
    <div v-if="walkingGroup">
      <WalkingGroupDetail :walkingGroup="walkingGroup"/>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <div class="d-flex justify-content-end mb-3">
      <button @click="goToEditPage" class="editBtn">수정하기</button>
      <button @click="deleteWalkingGroup" class="deleteBtn">삭제하기</button>
    </div>
  </div>
</template>

<style scoped>

</style>