<template>
  <div>
    <div class="item">
      <p class="walkingGroupApplication-userName">{{ walkingGroupApplication.userName }}</p>
      <ButtonSmallColor @click="() => emit('handleApplicationClick', walkingGroupApplication.walkingGroupApplicationId, 'ACCEPT')">승인하기</ButtonSmallColor>
      <ButtonSmallColor @click="() => emit('handleApplicationClick', walkingGroupApplication.walkingGroupApplicationId, 'REFUSAL')">거절하기</ButtonSmallColor>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ButtonSmallColor from "@/common/ButtonSmallColor.vue";
import { useAuthStore } from "@/stores/auth.js"; // 인증 상태를 가져오기 위한 스토어


const props = defineProps({
  walkingGroupApplication: {
    type: Object,
    required: true
  }
});

const emit = defineEmits([
  'handleApplicationClick'
]);

// const handleApplicationClick = async (walkingGroupApplicationId, action) => {
//   try {
//     const requestBody = {
//       walkingGroupApprovalState: action
//     };
//
//     console.log("요청 본문:", requestBody);
//
//     await axios.put(
//         `http://localhost:8080/api/walking-group-application/${walkingGroupApplicationId}`,
//         requestBody,
//         {
//           headers: {
//             Authorization: `Bearer ${authStore.accessToken}`,
//           },
//         }
//     );
//
//     console.log(walkingGroupApplications.value);
//
//     // 목록에서 신청서 제거
//     walkingGroupApplications.value = walkingGroupApplications.value.filter(
//         (app) => {
//           console.log(app.walkingGroupApplicationId);
//           console.log(walkingGroupApplicationId);
//           return app.walkingGroupApplicationId !== walkingGroupApplicationId
//         }
//     );
//     alert(action === "ACCEPT" ? "신청이 승인되었습니다." : "신청이 거절되었습니다.");
//
//   } catch (error) {
//     console.error("에러 발생:", error.response ? error.response.data : error.message);
//   }
// };

</script>

<style scoped>
.item {
  display: flex;
  width: 100%;
  padding: 20px;
  margin: 10px;
  border: 1px solid #53D9C1;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.walkingGroupApplication-userName {
  flex: 1;
  margin: 10px;
  text-align: left;

}

</style>
