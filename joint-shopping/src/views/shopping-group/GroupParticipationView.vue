<script setup>

// 상태 관리를 위한 반응형 객체 생성
import {reactive} from "vue";
import BackButton from "@/components/common/BackButton.vue";
import ButtonSmallColor from "@/components/common/ButtonSmallColor.vue";
import ButtonLongColor from "@/components/common/ButtonLongColor.vue";
import GroupUserList from "@/components/shopping-group/GroupUserList.vue";

const state = reactive({
  groups: [],
  participants: [
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
          <span>현재 6 / 10 명</span>
          <div class="circle">
            <span>참가가능</span>
          </div>
        </div>
        <div>
          <span>공동구매: 모임중</span>
        </div>
      </div>
      <div class="status-right-div">
        <!--      지금 2번 수정페이지로, 특정페이지 이동 필요      -->
        <ButtonLongColor class="left-button" >배송정보 확인</ButtonLongColor>
        <ButtonLongColor class="right-button" >배송정보 입력</ButtonLongColor>
      </div>
    </div>

    <GroupUserList :users="state.participants" :isParticipation=true />

    <div class="button-div">
      <ButtonLongColor class="right-button" >공동구매 마감</ButtonLongColor>
    </div>
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

.status-right-div{
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

.title {
  font-weight: bold;
}

.left-button {
  margin-right: 10px;
}

.right-button {
  margin-left: 10px;
}

.button-div{
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>