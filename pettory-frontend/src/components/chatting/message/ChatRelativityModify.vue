<script setup>
const props = defineProps({
  userId : Number,
  userNickname : String,
  message : String,
  timestamp : String
})

const formatDatetimeChange = (timestamp) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  // javaScript 에서의 Date 객체는 월을 0 ~ 11 까지 반환함)
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? '오후' : '오전';

  hours = hours % 12 || 12; // 12시간제로 변환

  return `${year}-${month}-${day} ${period} ${hours}:${minutes}`;
}
</script>

<template>
  <div class="chatting-relativity-message-window">
    <div class="chatting-profile">
      <img src="https://via.placeholder.com/50" class="profile-image" alt="프로필 이미지" />
      <div class="chatting-nickname">{{ props.userNickname }}</div>
    </div>
    <div class="chatting-message">
      <div class="message">{{ props.message }}</div>
      <div class="timestamp">(수정됨) {{ formatDatetimeChange(props.timestamp) }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>