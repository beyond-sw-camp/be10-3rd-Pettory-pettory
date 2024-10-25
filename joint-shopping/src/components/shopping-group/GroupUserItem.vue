<script setup>

import ButtonSmallColor from "@/components/common/ButtonSmallColor.vue";
import UserInfoModal from "@/components/modal/UserInfoModal.vue";
import ButtonLongColor from "@/components/common/ButtonLongColor.vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  isMaster: {
    type: Boolean,
    required: true
  },
  isParticipation: {  // 참가자 목록인지 모임 회원 목록인지
    type: Boolean,
    default: false,
  }
});

// emit 정의
const emit = defineEmits(['info', 'withdrawal']);

</script>

<template>
  <div class="user-item">
    <span>{{ user.userNickname }}</span>
    <div v-if="isParticipation">
      <template v-if="isMaster">
        <ButtonLongColor class="info-btn">배송정보 입력</ButtonLongColor>
        <ButtonLongColor class="info-btn" @click="emit('info')">정보보기</ButtonLongColor>
      </template>
      <template v-else>
        <ButtonLongColor class="info-btn">수령대기</ButtonLongColor>
        <ButtonLongColor class="info-btn" @click="emit('info')">정보보기</ButtonLongColor>
      </template>
    </div>
    <div v-else>
      <ButtonSmallColor v-if="isMaster" class="info-btn" @click="emit('withdrawal')">강퇴</ButtonSmallColor>
      <ButtonSmallColor class="info-btn" @click="emit('info')">정보보기</ButtonSmallColor>
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