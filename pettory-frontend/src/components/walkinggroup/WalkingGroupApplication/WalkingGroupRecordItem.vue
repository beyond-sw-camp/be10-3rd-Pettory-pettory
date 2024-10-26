<script setup>
import { useRouter } from "vue-router";
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import ButtonSmallColor from "@/components/common/ButtonSmallColor.vue";

const authStore = useAuthStore();

const props = defineProps({
  walkingGroupRecord: {
    type: Object,
    required: true
  }
});

const router = useRouter();

const deleteWalkingGroupRecord = async () => {
  const confirmed = confirm('이 산책 기록을 삭제하시겠습니까?');
  if (confirmed) {
    try {
      await axios.delete(`http://localhost:8080/api/walking-group-record/${walkingGroupRecord.walkingGroupRecordId}`, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      });
      alert('산책 기록이 성공적으로 삭제되었습니다.');
      router.push(`/walkinggrouprecords/${walkingGroupId}`);
    } catch (error) {
      console.error('산책 기록 삭제 중 오류가 발생했습니다.', error);
      alert('산책 기록 삭제에 실패했습니다.');
    }
  }
};
</script>

<template>
  <div class="item">
    <div class="walkingGroup-details">
      <p class="walkingGroup-date">{{ walkingGroupRecord.walkingGroupDate }}</p>
      <p class="walkingGroup-duration">산책 시간 : {{ walkingGroupRecord.walkingGroupRecordDuration }}분</p>
      <p class="walkingGroup-routeStart">산책 시작 장소 : {{ walkingGroupRecord.walkingGroupRouteStart }}</p>
      <p class="walkingGroup-routeEnd">산책 끝 장소 : {{ walkingGroupRecord.walkingGroupRouteEnd }}</p>
    </div>
    <div class="walkingGroup-actions">
      <ButtonSmallColor @click="deleteWalkingGroupRecord">삭제하기</ButtonSmallColor>
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 10px;
  border: 1px solid #53D9C1;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 70%;
  text-align: left;
}

.walkingGroup-details {
  margin-bottom: 20px;
}

.walkingGroup-date {
  font-size: 1.2em;
  font-weight: bold;
}

.walkingGroup-duration, .walkingGroup-routeStart, .walkingGroup-routeEnd {
  margin: 5px 0;
}

.walkingGroup-actions {
  display: flex;
  justify-content: flex-end;
}

.delete-btn {
  background-color: #53D9C1;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-left: 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #3dbb9e;
}
</style>