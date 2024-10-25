<script setup>
import {ref, onMounted} from "vue";
import {useAuthStore} from "@/stores/auth.js";
import {useRouter} from "vue-router";
import ButtonLongColor from "@/components/common/ButtonLongColor.vue";

import {fetchUserInfo} from "@/util/FetchUserInfo.js";

const authStore = useAuthStore();
// const userData = ref(null);
const router = useRouter();

// fetchUserInfo 메소드에서 데이터 가져오기
const { userInfo, fetchUserInfoData } = fetchUserInfo();

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};

const handleChangePasswordClick = () => {
  router.push('/users/passwords')
};

onMounted(() => {
  fetchUserInfoData();
});

</script>

<template>
  <div class="user-profile-container" v-if="userInfo">
    <h2>{{ userInfo.userNickname }} 님의 회원 정보</h2>
    <div class="user-info-box">
      <div class="user-info-item">
        <label>이메일</label>
        <span>{{ userInfo.userEmail }}</span>
      </div>
      <div class="user-info-item">
        <label>비밀번호</label>
        <ButtonLongColor @click="handleChangePasswordClick">비밀번호 변경</ButtonLongColor>
      </div>
      <div class="user-info-item">
        <label>닉네임</label>
        <span>{{ userInfo.userNickname }}</span>
      </div>
      <div class="user-info-item">
        <label>이름</label>
        <span>{{ userInfo.userName }}</span>
      </div>
      <div class="user-info-item">
        <label>생일</label>
        <span>{{ userInfo.userBirth }}</span>
      </div>
      <div class="user-info-item">
        <label>산책정보공개</label>
        <span>{{ userInfo.userWalkingRecordPublicYn ? '공개' : '비공개' }}</span>
      </div>
    </div>
  </div>
  <div v-else>
    <p>회원정보 불러오는 중</p>
  </div>
</template>

<style scoped>
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