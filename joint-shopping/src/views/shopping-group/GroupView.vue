<script setup>
import {reactive, ref} from 'vue';
import BackButton from "@/components/common/BackButton.vue";
import ButtonSmallColor from "@/components/common/ButtonSmallColor.vue";
import ButtonLongColor from "@/components/common/ButtonLongColor.vue";
import GroupUserList from "@/components/shopping-group/GroupUserList.vue";
import {useRouter} from "vue-router";

// 상태 관리를 위한 반응형 객체 생성
const state = reactive({
  groups: [
    {
      id: 1,
      title: '강아지 사료 공동구매 하실분 구해요!',
      item: '몽이있는 사료',
      participants: 10,
      price: 10000,
      maxParticipants: 100,
      date: '2000-01-01',
      img: "@/assets/프로젝트.png",
      contents: "강아지 사료 사실분 구합니다."
    },
    {
      id: 2,
      title: '사료 공동구매 하실분 구해요!',
      item: '몽이있는 사료',
      participants: 10,
      price: 10000,
      maxParticipants: 100,
      date: '2000-01-01',
      img: "@/assets/프로젝트.png",
      contents: "강아지 사료 사실분 구합니다.@@@@@@@@@@@@@@@@@@@@@@@@@"
    },
    {
      id: 3,
      title: '사료 공동구매 하실분 구해요!',
      item: '몽이있는 사료',
      participants: 10,
      price: 10000,
      maxParticipants: 100,
      date: '2000-01-01',
      img: "@/assets/프로젝트.png",
      contents: "강아지 사료 사실분 구합니다.@@@@@@@@@@@@@@@@@@@@@@@@@"
    }
  ],
  users: [
    {id: 1, name: '본인'},
    {id: 2, name: '닉네임 123'},
    {id: 3, name: '닉네임 123'},
    {id: 4, name: '닉네임 123'},
    {id: 5, name: '닉네임 123'},
    {id: 6, name: '닉네임 123'},
    {id: 7, name: '닉네임 123'},
    {id: 8, name: '닉네임 123'},
    {id: 9, name: '닉네임 123'},
  ]
});

// 현재 모임방 유저 데이터 백엔드에서 받기
// 라우터에서 모임방 데이터 객체 인자를 받아옴

const router = useRouter();
const goToGroupEdit = (id) => {
  router.push(`/shoppinggroup/${id}/edit`);
}
const goToGroupParticipation = (id) => {
  router.push(`/shoppinggroup/${id}/participation`);
}

</script>

<template>
  <div class="group-container">
    <section class="left-section">
      <BackButton/>
      <div class="header">
        <h1 class="group-title">모임방입당</h1>
      </div>
      <div class="status-div">
        <div>
          <div class="status">
            <span>현재 10 / 100 명</span>
            <div class="circle">
              <span>참가가능</span>
            </div>
          </div>
        </div>
        <div>
          <div class="group-edit">
            <!--      지금 2번 수정페이지로, 특정페이지 이동 필요      -->
            <ButtonSmallColor @click="goToGroupEdit(state.groups[1].id)">모임방 수정</ButtonSmallColor>
            <p>물품명: 맛있는 강아지 사료</p>
            <p>공동구매비용: 10000원</p>
          </div>
        </div>
      </div>

      <!--   이후는 다 컴포넌트 -->
      <GroupUserList :users="state.users"/>

      <div class="button-div">
        <ButtonSmallColor>나가기</ButtonSmallColor>
        <div class="button-right-div">
          <ButtonSmallColor class="left-button">구매 참가</ButtonSmallColor>
          <ButtonSmallColor class="right-button" @click="goToGroupParticipation(state.groups[1].id)">참가자 목록
          </ButtonSmallColor>
        </div>
      </div>
    </section>
    <section class="right-section">
      <div class="chat-box">채팅</div>
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

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px; /* 동그라미의 너비 */
  height: 75px; /* 동그라미의 높이 (너비와 같아야 함) */
  background-color: #a8e4e3; /* 동그라미의 배경색 */
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