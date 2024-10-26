<script setup>
import {onMounted, reactive, ref} from 'vue';
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth.js";
import axios from "axios";
import BackButton from "@/components/common/BackButton.vue";
import ButtonSmallColor from "@/components/common/ButtonSmallColor.vue";
import GroupUserList from "@/components/joint-shopping/shopping-group/GroupUserList.vue";
import ModalSmall from "@/components/common/ModalSmall.vue";

const authStore = useAuthStore();

// 라우터로 온 데이터 받기
const route = useRoute();
const router = useRouter();

// 상태 관리를 위한 반응형 객체 생성
const state = reactive({
  group: [],
  isMaster: false,
  userList: [],
  totalUsers: 0,
});

// API 호출 함수 / 현재 모임방
const fetchGroup = async () => {
  try {
    const token = authStore.accessToken;
    const groupNum = route.params.id;

    const response = await axios.get(`http://localhost:8080/jointshopping/groups/${groupNum}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    state.group = response.data.group;
    state.isMaster = response.data.isMaster;

  } catch (error) {
    console.error('에러가 발생했습니다:', error);
  }
};

// API 호출 함수 / 현재 모임방 있는 사용자들
const fetchGroupUsers = async () => {
  try {
    const token = authStore.accessToken;
    const groupNum = route.params.id;

    const response = await axios.get(`http://localhost:8080/jointshopping/groups/users/${groupNum}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    state.userList = response.data.groupUserList;
    state.totalUsers = response.data.totalItems;

  } catch (error) {
    console.error('에러가 발생했습니다:', error);
  }
};

// API 호출 함수 / 강퇴
const withdrawalUser = async (userEmail) => {
  try {
    const token = authStore.accessToken;
    const groupNum = route.params.id;

    await axios.delete(`http://localhost:8080/jointshopping/groups/${groupNum}/users/withdrawal`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        userEmail: userEmail
      }
    });

  } catch (error) {
    console.error('에러가 발생했습니다:', error);
  }
};

// API 호출 함수 / 나가기
const exitUser = async () => {
  try {
    const token = authStore.accessToken;
    const groupNum = route.params.id;

    await axios.delete(`http://localhost:8080/jointshopping/groups/${groupNum}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  } catch (error) {
    console.error('에러가 발생했습니다:', error);
  }
};

// API 호출 함수 / 참가방 참여
const ParticipationUser = async () => {
  try {
    const token = authStore.accessToken;
    const groupNum = route.params.id;
    const paymentCost = state.group.jointShoppingCost;

    await axios.post(`http://localhost:8080/jointshopping/participation`,
        {
          paymentCost: paymentCost,
          jointShoppingGroupNum: groupNum
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

  } catch (error) {
    console.error('에러가 발생했습니다:', error);
  }
};

// 나가기 모달창
const isExitModalVisible = ref(false);
// 참가 모달창
const isParticipationModalVisible = ref(false);

const confirmExitModal = async () => {
  isExitModalVisible.value = false;
  await exitUser();
  await router.push(`/shoppinggroup`);
}

const closeExitModal = () => {
  isExitModalVisible.value = false;
}

const confirmParticipationModal = async (groupNum) => {
  isParticipationModalVisible.value = false;
  await ParticipationUser();
  await router.push(`/shoppinggroup/${groupNum}/participation`);
}

const closeParticipationModal = () => {
  isParticipationModalVisible.value = false;
}


// 모임방 수정
const goToGroupEdit = (groupNum) => {
  router.push(`/shoppinggroup/${groupNum}/edit`);
}

// 공동구매 참가방
const goToGroupParticipation = (groupNum) => {
  router.push(`/shoppinggroup/${groupNum}/participation`);
}

// 유저 강퇴
const userWithdrawal = async (userEmail) => {
  await withdrawalUser(userEmail);
  await fetchGroupUsers();
}

// 유저 나가기
const userExit = () => {
  isExitModalVisible.value = true;
}

// 유저 참가방 참가
const userParticipation = () => {
  isParticipationModalVisible.value = true;
}

// 컴포넌트 마운트 시 제품 목록 로드
onMounted(() => {
  fetchGroup();
  fetchGroupUsers();
});
</script>

<template>
  <div class="group-container">
    <section class="left-section">
      <BackButton/>
      <div class="header">
        <h1 class="group-title">{{ state.group.jointShoppingGroupName }}</h1>
      </div>
      <div class="status-div">
        <div>
          <div class="status">
            <span>현재 {{ state.userList.length }} / {{ state.group.jointShoppingGroupMaximumCount }} 명</span>
            <div
                :class="(state.group.jointShoppingGroupState === 'APPLICATION') ? 'circle-application' : 'circle-close'">
              <span v-if="(state.group.jointShoppingGroupState === 'APPLICATION')">참가가능</span>
              <span v-else> 마감 </span>
            </div>
          </div>
        </div>
        <div>
          <div class="group-edit">
            <!--      지금 2번 수정페이지로, 특정페이지 이동 필요      -->
            <ButtonSmallColor v-if="state.isMaster" @click="goToGroupEdit(state.group.jointShoppingGroupNum)">모임방 수정</ButtonSmallColor>
            <p>물품명: {{ state.group.jointShoppingProducts }}</p>
            <p>공동구매비용: {{ state.group.jointShoppingCost }} 원</p>
          </div>
        </div>
      </div>

      <!--   이후는 다 컴포넌트 -->
      <GroupUserList :userList="state.userList" :isMaster="state.isMaster" @withdrawal="userWithdrawal"/>

      <div class="button-div">
        <div>
          <ButtonSmallColor v-if="!state.isMaster" @click="userExit">나가기</ButtonSmallColor>
        </div>
        <div class="button-right-div">
          <ButtonSmallColor v-if="!state.isMaster" class="left-button" @click="userParticipation">구매 참가
          </ButtonSmallColor>
          <ButtonSmallColor class="right-button" @click="goToGroupParticipation(state.group.jointShoppingGroupNum)">참가자
            목록
          </ButtonSmallColor>
        </div>
      </div>

      <ModalSmall :isVisible="isExitModalVisible" :message="'현재 모임방에서 나가시겠습니까?'"
                  @close="closeExitModal" @confirm="confirmExitModal"/>
      <ModalSmall :isVisible="isParticipationModalVisible" :message="'공동구매 참가를 하시겠습니까?'"
                  @close="closeParticipationModal" @confirm="confirmParticipationModal(state.group.jointShoppingGroupNum)"/>

    </section>
    <section class="right-section">
<!--      <ChattingMainWindow :chatroomState="" class="chat-box">채팅</ChattingMainWindow>-->
    </section>
  </div>
</template>

<style scoped>

.group-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 200px;
  margin-right: 200px;
}

.left-section {
  width: 50%;
  padding: 20px;
}

.right-section {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.status-div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.chat-box {
  width: 90%;
  height: 80%;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.group-title {
  font-weight: bold;
}

.status {
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: left;
}

.circle-application {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px; /* 동그라미의 너비 */
  height: 75px; /* 동그라미의 높이 (너비와 같아야 함) */
  background-color: #a8e4e3; /* 동그라미의 배경색 */
  border-radius: 50%; /* 동그라미를 만드는 핵심 */
  margin-left: 20px;
}

.circle-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px; /* 동그라미의 너비 */
  height: 75px; /* 동그라미의 높이 (너비와 같아야 함) */
  background-color: #FCB3AD; /* 동그라미의 배경색 */
  border-radius: 50%; /* 동그라미를 만드는 핵심 */
  margin-left: 20px;
}

.group-edit {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.button-div {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-button {
  margin-right: 10px;
}

.right-button {
  margin-left: 10px;
}
</style>