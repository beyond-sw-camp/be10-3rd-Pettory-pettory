<script setup>

</script>

<template>
  <div class="container">
    <div class="header">
      <router-link to="/" class="back-button">←</router-link>
      <h2 class="title">참가자 목록</h2>
    </div>

    <div class="status">
      <span>현재 6 / 10 명</span>
      <div class="tab-buttons">
        <button class="tab active">모집중</button>
        <button class="tab">배송정보 입력</button>
        <button class="tab">배송정보 확인</button>
      </div>
    </div>

    <div class="purchase-info">
      <span>공동구매: 모임점</span>
    </div>

    <div class="participant-list">
      <div v-for="(member, index) in members" :key="index" class="participant-item">
        <span>{{ member.name }}</span>
        <button class="delivery-btn">배송정보 입력</button>
        <button class="info-btn">정보보기</button>
      </div>
    </div>

    <button class="bottom-button" :disabled="true">공동구매 참가</button>
  </div>
</template>

<style scoped>
.container {
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.back-button {
  font-size: 24px;
  margin-right: 10px;
  text-decoration: none;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.status {
  margin-bottom: 20px;
}

.tab-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.tab {
  background-color: #f0f0f0;
  border: none;
  border-radius: 20px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.tab.active {
  background-color: #a8e4e3;
}

.purchase-info {
  margin-bottom: 20px;
}

.participant-list {
  border: 1px solid #e0e0e0;
  padding: 10px;
  border-radius: 10px;
  max-height: 200px;
  overflow-y: auto;
}

.participant-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.delivery-btn {
  background-color: #f0f0f0;
  border: none;
  border-radius: 20px;
  padding: 5px 10px;
  margin-right: 10px;
}

.info-btn {
  background-color: #a8e4e3;
  border: none;
  border-radius: 20px;
  padding: 5px 10px;
}

.bottom-button {
  width: 100%;
  padding: 10px;
  background-color: #a8e4e3;
  border: none;
  border-radius: 20px;
  margin-top: 20px;
  cursor: not-allowed;
  color: #fff;
}

</style>