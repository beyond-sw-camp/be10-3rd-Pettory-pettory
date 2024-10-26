<script setup>

import GroupUserItem from "@/components/shopping-group/GroupUserItem.vue";
import {ref} from "vue";
import UserInfoModal from "@/components/modal/UserInfoModal.vue";
import ModalSmall from "@/components/common/ModalSmall.vue";

const props = defineProps({
  userList: {
    type: Array,
    required: true
  },
  isMaster:{
    type: Boolean,
    required: true
  },
  isParticipation: {  // 참가자 목록인지 모임 회원 목록인지
    type: Boolean,
    default: false,
  }
});

// emit 정의
const emit = defineEmits(['withdrawal']);

// 선택한 유저의 정보 모달창 띄움
const isUserModalVisible = ref(false);
const isWithdrawalModalVisible = ref(false);
const selectedUser = ref(null);

const userInfo = (user) => {
  selectedUser.value = user;
  isUserModalVisible.value = true;
}
const userWithdrawal = (user) => {
  selectedUser.value = user;
  isWithdrawalModalVisible.value = true;
}

// 강퇴 모달 확인 클릭 시
const confirmWithdrawalModal = (userEmail) => {
  isWithdrawalModalVisible.value = false;
  emit('withdrawal', userEmail);
}

// 뒤로가기로 나가기
const closeInfoModal = () => {
  isUserModalVisible.value = false;
}
const closeWithdrawalModal = () => {
  isWithdrawalModalVisible.value = false;
}


</script>

<template>
  <div class="user-list">
    <div class="user-title-div" v-if="!isParticipation">
      <h2>회원 목록</h2>
    </div>
    <div class="container">
      <GroupUserItem v-for="user in userList" :key="user.userId" :user="user" :isMaster="isMaster"
                     :isParticipation="isParticipation" @info="userInfo(user)" @withdrawal="userWithdrawal(user)"/>
      <UserInfoModal :user="selectedUser" :isVisible="isUserModalVisible" @close="closeInfoModal"/>
      <ModalSmall :isVisible="isWithdrawalModalVisible" :message="'선택하신 회원을 강퇴 하시겠습니까?'"
                  @close="closeWithdrawalModal" @confirm="confirmWithdrawalModal(selectedUser.userEmail)"/>
    </div>
  </div>
</template>

<style scoped>
.user-list {
  border: 1px solid #53D9C1;
  padding: 20px;
  max-height: 500px;
  overflow-y: auto;
  border-radius: 10px;
  text-align: center;
}

.user-title-div {
  margin-bottom: 50px;
}

.container {
  display: flex;
  flex-direction: column;
}

</style>