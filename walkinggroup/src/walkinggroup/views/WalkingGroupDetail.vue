<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from "vue-router";
import WalkingGroupDetail from "@/walkinggroup/components/WalkingGroupDetail.vue";
import {useAuthStore} from "@/stores/auth.js";
import ButtonSmallColor from "@/common/ButtonSmallColor.vue";

const walkingGroup = ref(null);
const isLeader = ref(false); // 사용자가 방장인지 여부
const route = useRoute();
const router = useRouter();

const walkingGroupId = route.params.id;

const authStore = useAuthStore();

const fetchWalkingGroupDetail = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/walking-group/${walkingGroupId}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });
    walkingGroup.value = response.data.walkingGroupsById;
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
      await axios.delete(`http://localhost:8080/api/walking-group/${walkingGroupId}`, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      });
      alert('산책 모임이 성공적으로 삭제되었습니다.');
      router.push('/walkinggroups');
    } catch (error) {
      console.error('산책 모임 삭제 중 오류가 발생했습니다.', error);
      alert('산책 모임 삭제에 실패했습니다.');
    }
  }
};

const applyForGroup = async () => {
  alert('모임에 신청되었습니다!');

  try {
    console.log(authStore.accessToken);
    await axios.post(`http://localhost:8080/api/walking-group-application/`, {
      walkingGroupId
    }, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });

    router.push("/walkinggroups");

  } catch (error) {
    console.error('신청 중 오류가 발생했습니다.', error);
  }
};

onMounted(() => fetchWalkingGroupDetail());
</script>

<template>
  <div class="container">
    <div v-if="walkingGroup">
      <WalkingGroupDetail :walkingGroup="walkingGroup"/>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <!-- 방장일 경우 수정/삭제 버튼, 아닐 경우 신청하기 버튼 -->
<!--    <div v-if="isLeader" class="d-flex justify-content-end mb-3">-->
<!--      <ButtonSmallColor @click="goToEditPage" class="editBtn">수정하기</ButtonSmallColor>-->
<!--      <ButtonSmallColor @click="deleteWalkingGroup" class="deleteBtn">삭제하기</ButtonSmallColor>-->
<!--    </div>-->
    <div class="d-flex justify-content-end mb-3">
      <ButtonSmallColor @click="applyForGroup" class="applyBtn">신청하기</ButtonSmallColor>
    </div>
  </div>
</template>

<style scoped>

</style>