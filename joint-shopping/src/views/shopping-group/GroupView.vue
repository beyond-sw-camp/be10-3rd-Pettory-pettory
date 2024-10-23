<script setup>
import { ref } from 'vue';
import BackButton from "@/components/common/BackButton.vue";
import ButtonSmallColor from "@/components/common/ButtonSmallColor.vue";
import ButtonLongColor from "@/components/common/ButtonLongColor.vue";

const members = ref([
  { name: '본인' },
  { name: '닉네임 123' },
  { name: '닉네임 123' },
  { name: '닉네임 123' },
]);
</script>

<template>
  <div class="group-container">
    <div class="left-section">
<!--  라우터로 인자를 받아옴    -->
      <BackButton />
      <div class="header">
        <h1 class="group-title">모임방입당</h1>
      </div>
      <div class="status">
        <span>현재 10 / 100 명</span>
        <div class="circle">
          <span>참가가능</span>
        </div>
      </div>
      <div class="purchase-info">
        <p>물품명: 맛있는 강아지 사료</p>
        <p>공동구매비용: 10000원</p>
      </div>
      <!--   이후는 다 컴포넌트 -->
      <div class="member-list">
        <h3>회원 목록</h3>

        <div v-for="(member, index) in members" :key="index" class="member-item">
          <span>{{ member.name }}</span>
          <button class="info-btn">정보보기</button>
        </div>
      </div>

      <div class="button-div">
        <ButtonSmallColor >나가기</ButtonSmallColor>
        <div class="button-right-div">
          <ButtonSmallColor class="left-button">구매 참가</ButtonSmallColor>
          <ButtonSmallColor class="right-button" >참가자 목록</ButtonSmallColor>
        </div>
      </div>
    </div>
    <div class="right-section">
      <div class="chat-box">채팅</div>
    </div>
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

.purchase-info {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.member-list {
  border: 1px solid #53D9C1;
  padding: 10px;
  max-height: 300px;
  overflow-y: auto;
  border-radius: 10px;
}

.member-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.info-btn {
  background-color: #a8e4e3;
  border: none;
  padding: 5px;
  border-radius: 5px;
}


.button-div {
  margin-top: 10px;
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