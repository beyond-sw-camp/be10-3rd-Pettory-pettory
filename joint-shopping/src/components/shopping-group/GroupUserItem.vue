<script setup>

import ButtonSmallColor from "@/components/common/ButtonSmallColor.vue";
import UserInfoModal from "@/components/modal/UserInfoModal.vue";
import ButtonLongColor from "@/components/common/ButtonLongColor.vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  isParticipation: {  // 참가자 목록인지 모임 회원 목록인지
    type: Boolean,
    default: false,
  }
});

// emit 정의
const emit = defineEmits(['info']);

</script>

<template>
  <div class="user-item">
    <span>{{ user.name }}</span>
    <div v-if="isParticipation">
      <ButtonLongColor class="info-btn" >강퇴</ButtonLongColor>
      <ButtonLongColor class="info-btn" @click="emit('info')" >정보보기</ButtonLongColor>
    </div>
    <div v-else>
      <ButtonSmallColor class="info-btn" >강퇴</ButtonSmallColor>
      <ButtonSmallColor class="info-btn" @click="emit('info')" >정보보기</ButtonSmallColor>
    </div>
  </div>

</template>

<style scoped>
.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #53D9C1;
  margin: 10px;
  padding: 10px;
}

.info-btn {
  background-color: #FFFFFF;
  color: #000000;
  border: 1px solid #53D9C1;
  margin-left: 20px;
}
</style>