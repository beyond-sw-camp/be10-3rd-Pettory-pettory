<script setup>

import {onMounted, reactive, ref} from "vue";
import BackButton from "@/components/common/BackButton.vue";
import ButtonSmallColor from "@/components/common/ButtonSmallColor.vue";
import ButtonLongColor from "@/components/common/ButtonLongColor.vue";
import GroupUserList from "@/components/shopping-group/GroupUserList.vue";
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth.js";
import axios from "axios";
import ModalSmall from "@/components/common/ModalSmall.vue";
import InsertDeliveryModal from "@/components/modal/InsertDeliveryModal.vue";
import DeliveryInfoModal from "@/components/modal/DeliveryInfoModal.vue";

const authStore = useAuthStore();
// 라우터로 온 데이터 받기
const route = useRoute();
const router = useRouter();

// 상태 관리를 위한 반응형 객체 생성
const state = reactive({
  group: [],
  isMaster: false,
  participationUserList: [],
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

// API 호출 함수 / 현재 공동구매 참가에 있는 사용자들
const fetchParticipationUsers = async () => {
  try {
    const token = authStore.accessToken;
    const groupNum = route.params.id;

    const response = await axios.get(`http://localhost:8080/jointshopping/participation/users/${groupNum}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    state.participationUserList = response.data.groupUserList;
    state.totalUsers = response.data.totalItems;

  } catch (error) {
    console.error('에러가 발생했습니다:', error);
  }
};

// API 호출 함수 / 공동구매 취소
const exitParticipationUser = async () => {
  try {
    const token = authStore.accessToken;
    const groupNum = route.params.id;

    await axios.delete(`http://localhost:8080/jointshopping/participation/${groupNum}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  } catch (error) {
    console.error('에러가 발생했습니다:', error);
  }
};

// API 호출 함수 / 방장 배송정보 입력
const insertDelivery = async (formData) => {
  try {
    const token = authStore.accessToken;
    const groupNum = route.params.id;

    await axios.put(`http://localhost:8080/jointshopping/groups/delivery-info/${groupNum}`,
        {
          courierCode : formData.courierCode,
          invoiceNum: formData.invoiceNum,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

  } catch (error) {
    console.error('에러가 발생했습니다:', error);
  }
};


const isInsertDeliveryModalVisible = ref(false);
const isDeliveryInfoModalVisible = ref(false);
const isExitModalVisible = ref(false);
// 배송정보 입력 모달
const insertDeliveryInfo = () => {
  isInsertDeliveryModalVisible.value = true;
}

const confirmInsertDelivery =  (formData) => {
  isInsertDeliveryModalVisible.value = false;
  insertDelivery(formData);
}

const closeInsertDelivery = () => {
  isInsertDeliveryModalVisible.value = false;
}

// 배송정보 확인 모달
const deliveryInfo = () => {
  isDeliveryInfoModalVisible.value = true;
}

const confirmDeliveryInfo =  () => {
  isDeliveryInfoModalVisible.value = false;
}

const closeDeliveryInfo = () => {
  isDeliveryInfoModalVisible.value = false;
}

// 공동구매 취소 모달
const exitParticipation = () => {
  isExitModalVisible.value = true;
}

const confirmExitParticipation = async () => {
  isExitModalVisible.value = false;
  await exitParticipationUser();
  await router.push(`/shoppinggroup/${state.group.jointShoppingGroupNum}`);
}

const closeExitParticipation = () => {
  isExitModalVisible.value = false;
}

// 컴포넌트 마운트 시 제품 목록 로드
onMounted(() => {
  fetchGroup();
  fetchParticipationUsers();
});
</script>

<template>
  <div class="group-container">
    <BackButton/>
    <div class="header">
      <h1 class="title">참가자 목록</h1>
    </div>

    <div class="status-div">
      <div class="status-left-div">
        <div class="status">
          <span>현재 {{ state.participationUserList.length }} / {{
              state.group.jointShoppingParticipationMaximumCount
            }} 명</span>
          <div :class="(state.group.jointShoppingGroupState === 'APPLICATION') ? 'circle-application' : 'circle-close'">
            <span v-if="(state.group.jointShoppingGroupState === 'APPLICATION')">참가가능</span>
            <span v-else> 마감 </span>
          </div>
        </div>
        <div>
          <span v-if="(state.group.jointShoppingProductsState === 'Recruitment')">공동구매: 모집중</span>
          <span v-else-if="(state.group.jointShoppingProductsState === 'OrderCompleted')">공동구매: 주문완료</span>
          <span v-else-if="(state.group.jointShoppingProductsState === 'Delivery')">공동구매: 배달중</span>
          <span v-else-if="(state.group.jointShoppingProductsState === 'Arrival')">공동구매: 도착</span>
        </div>
      </div>
      <div class="status-right-div">
        <ButtonLongColor v-if="state.isMaster" class="left-button"
                         :disabled="!(state.group.jointShoppingProductsState === 'OrderCompleted')"
                         @click="insertDeliveryInfo" >배송정보 입력</ButtonLongColor>
        <ButtonLongColor class="right-button"
                         :disabled="(state.group.jointShoppingProductsState === 'Recruitment')"
                         @click="deliveryInfo">배송정보 확인</ButtonLongColor>
      </div>
    </div>

    <GroupUserList :userList="state.participationUserList" :isParticipation=true :isMaster="state.isMaster"/>

    <div class="button-div">
      <ButtonLongColor v-if="state.isMaster" :disabled="!(state.group.jointShoppingProductsState === 'Arrival')"
                       class="right-button">공동구매 마감</ButtonLongColor>
      <ButtonLongColor v-else :disabled="!(state.group.jointShoppingProductsState === 'Recruitment')"
                       class="right-button" @click="exitParticipation">공동구매 취소</ButtonLongColor>
    </div>

    <InsertDeliveryModal :isVisible="isInsertDeliveryModalVisible" @close="closeInsertDelivery"
                @submit="confirmInsertDelivery"/>

    <DeliveryInfoModal :isVisible="isDeliveryInfoModalVisible" :courierCode="state.group.hostCourierCode"
                       :invoiceNum="state.group.hostInvoiceNum" @close="closeDeliveryInfo"
                       @confirm="confirmDeliveryInfo"/>

    <ModalSmall :isVisible="isExitModalVisible" @close="closeExitParticipation" @confirm="confirmExitParticipation"/>

  </div>
</template>

<style scoped>

.group-container {
  display: flex;
  flex-direction: column;
  margin-left: 350px;
  margin-right: 350px;
}


.header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.status-div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
}

.status-left-div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.status-right-div {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
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

.title {
  font-weight: bold;
}

.left-button {
  margin-right: 10px;
}

.right-button {
  margin-left: 10px;
}

.button-div {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>