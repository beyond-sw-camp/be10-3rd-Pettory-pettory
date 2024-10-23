<script setup>

import GroupUserItem from "@/components/shopping-group/GroupUserItem.vue";
import {ref} from "vue";
import UserInfoModal from "@/components/modal/UserInfoModal.vue";

const props = defineProps({
  users: {
    type: Array,
    required: true
  }
});

// 선택한 유저의 정보 모달창 띄움
const isModalVisible = ref(false);
const selectedUser = ref(null);
const userInfo = (user) => {
  selectedUser.value = user;
  isModalVisible.value = true;
}

// 뒤로가기로 나가기
const closeModal = () => {
  isModalVisible.value = false;
}

</script>

<template>
  <div class="user-list">
    <div class="user-title-div">
      <h2>회원 목록</h2>
    </div>
    <div class="container">
      <GroupUserItem v-for="user in users" :key="user.id" :user="user" @info="userInfo(user)"/>
      <UserInfoModal :user="selectedUser" :isVisible="isModalVisible" @close="closeModal"/>
    </div>
  </div>
</template>

<style scoped>
.user-list {
  border: 1px solid #53D9C1;
  padding: 20px;
  max-height: 300px;
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