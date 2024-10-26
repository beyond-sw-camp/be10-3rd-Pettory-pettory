<script setup>
import {defineProps, defineEmits} from "vue";

import BackButton from "@/components/common/BackButton.vue";
import ButtonLongColor from "@/components/common/ButtonLongColor.vue";

// props 정의
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  isVisible: Boolean, // 모달 표시 여부

  isClosable: {
    type: Boolean,
    default: true,  // 모달을 닫을 수 있는지 여부
  },
});

// emit 정의
const emit = defineEmits(['close']);

const closeModal = () => {
  if (props.isClosable) {
    emit('close');
  }
};
</script>

<template>
  <!-- 모달이 보일 때만 렌더링 -->
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">

<!-- 한명의 유저의 정보를 자세히 보는 컴포넌트 필요  -->
    <div class="user-profile-container" v-if="user">

      <back-button :isModal=true @click="closeModal" />

      <h2>{{ user.userNickname }} 님의 회원 정보</h2>
      <div class="user-info-box">
        <div class="user-info-item">
          <label>이메일</label>
          <span>{{ user.userEmail }}</span>
        </div>
        <div class="user-info-item">
          <label>닉네임</label>
          <span>{{ user.userNickname }}</span>
        </div>
        <div class="user-info-item">
          <label>이름</label>
          <span>{{ user.userName }}</span>
        </div>
        <div class="user-info-item">
          <label>생일</label>
          <span>{{ user.userBirth }}</span>
        </div>
        <div class="user-info-item">
          <label>산책정보공개</label>
          <span>{{ user.userWalkingRecordPublicYn ? '공개' : '비공개' }}</span>
        </div>
      </div>
    </div>
    <div v-else>
      <p>회원정보 불러오는 중</p>
    </div>

  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.user-profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
}

h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

.user-info-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user-info-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e5e5e5;
}

label {
  font-weight: bold;
  color: #333;
}

span {
  color: #555;
}
</style>