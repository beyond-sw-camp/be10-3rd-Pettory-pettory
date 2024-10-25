<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js';
import ButtonSmallColor from "@/common/ButtonSmallColor.vue";

const registerWalkingGroup = ref(null); // 산책 모임 정보
const isLeader = ref(false); // 사용자가 방장인지 여부
const members = ref([]); // 회원 목록을 저장할 변수
const totalItems = ref(0); // 전체 회원 수
const route = useRoute();
const router = useRouter();
const registerWalkingGroupId = route.params.id;
const authStore = useAuthStore();

// 서버에서 산책 모임 정보와 회원 목록을 가져오는 함수
const fetchRegisterWalkingGroupDetail = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/register-walking-group/${registerWalkingGroupId}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });
    registerWalkingGroup.value = response.data.registerWalkingGroup;
    isLeader.value = response.data.isLeader;
    // registerWalkingGroup에서 walkingGroupId 추출
    const walkingGroupId = registerWalkingGroup.value.walkingGroupId;

    // 회원 목록 불러오기
    // fetchMembersList(walkingGroupId);
  } catch (error) {
    console.error('산책 모임 정보를 불러오는 중 에러 발생:', error);
  }
};

// 회원 목록을 불러오는 함수
// const fetchMembersList = async () => {
//   try {
//     const response = await axios.get(`http://localhost:8080/api/register-walking-group/users/${walkingGroupId}`, {
//       headers: {
//         Authorization: `Bearer ${authStore.accessToken}`
//       }
//     });
//     members.value = response.data.groupUserList; // 회원 목록 저장
//     totalItems.value = response.data.totalItems; // 전체 회원 수 저장
//   } catch (error) {
//     console.error('회원 목록을 불러오는 중 에러 발생:', error);
//   }
// };

// 산책 기록 페이지로 이동
const goToWalkingGroupRecord = (walkingGroupId) => {
  router.push(`/walkinggrouprecords/${walkingGroupId}`);
};

const goToWalkingGroupApplication = () => {
  router.push(`/walkinggroupapplications`);
};

// 산책 모임 탈퇴
const deleteRegisterWalkingGroup = async () => {
  const confirmed = confirm('이 산책 모임을 탈퇴하시겠습니까?');
  if (confirmed) {
    try {
      await axios.delete(`http://localhost:8080/api/register-walking-group/${registerWalkingGroupId}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });
    alert('산책 모임에서 성공적으로 탈퇴했습니다.');
    router.push('/registerwalkinggroups');
  } catch (error) {
    console.error('산책 모임 탈퇴 중 오류가 발생했습니다.', error);
  }
}
};

// 페이지 로드 시 데이터 불러오기
onMounted(() => {
  fetchRegisterWalkingGroupDetail();
  // fetchMembersList();
});
</script>

<template>
  <div class="container">
    <div class="header">
      <div v-if="registerWalkingGroup">
        <div>
          <h1>{{ registerWalkingGroup.walkingGroupName }}</h1>
          <p>{{ registerWalkingGroup.userName }}</p>
        </div>

        <!-- 회원 목록 -->
<!--        <div class="members-list">-->
<!--          <h2>회원목록 (총 {{ totalItems }}명)</h2>-->
<!--          <ul>-->
<!--            <li v-for="member in members" :key="member.id" class="member-item">-->
<!--              <div class="member-info">-->
<!--                <span v-if="member.isLeader" class="leader-icon">⭐</span>-->
<!--                <span>{{ member.name }}</span>-->
<!--              </div>-->
<!--              <button class="button" @click="viewMemberDetails(member.id)">정보보기</button>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->

        <!-- 하단 버튼들 -->
        <div class="d-flex justify-content-end mb-3">
          <ButtonSmallColor @click="()=>goToWalkingGroupRecord(registerWalkingGroup.walkingGroupId)">산책 기록</ButtonSmallColor>
          <ButtonSmallColor @click="goToWalkingGroupApplication" class="editBtn">신청자 목록</ButtonSmallColor>

        </div>
        <div>
<!--          <ButtonSmallColor @click="goToWalkingGroupRecord">산책 기록</ButtonSmallColor>-->
<!--          <ButtonSmallColor @click="deleteRegisterWalkingGroup">탈퇴하기</ButtonSmallColor>-->
        </div>
      </div>

      <div v-else>
        <p>Loading...</p>
      </div>
    </div>

    <!-- 채팅 영역 -->
    <div class="chat-box">
      채팅
    </div>
  </div>
</template>

<style scoped>
/* 컨테이너 스타일 */
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.header {
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.members-list {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.member-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
}

.leader-icon {
  margin-right: 10px;
  color: gold;
}

.footer-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.chat-box {
  width: 55%;
  background-color: #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80vh;
}

.chat-box input[type="text"] {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.chat-box button {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-left: 10px;
  cursor: pointer;
}

.chat-box button:hover {
  background-color: #45a049;
}

/* 버튼 스타일 */
.button {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.button:hover {
  background-color: #45a049;
}

.d-flex {
  display: flex;
}

.justify-content-end {
  justify-content: flex-end;
}

.mb-3 {
  margin-bottom: 1rem;
}

</style>
