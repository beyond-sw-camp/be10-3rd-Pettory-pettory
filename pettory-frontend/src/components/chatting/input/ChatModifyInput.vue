<script setup>
// 페이지 로드가 완료되면 스크롤을 맨 아래로 이동
window.onload = function () {
  const chatWindow = document.querySelector('.chat-window');
  const messageView = document.getElementById('messageView');
  const maxLength = 60; // 표시할 최대 텍스트 길이

  chatWindow.scrollTop = chatWindow.scrollHeight; // 스크롤 맨 아래로 이동

  // 텍스트가 최대 길이를 넘으면 줄임표(...)로 표시
  if (messageView.textContent.length > maxLength) {
    messageView.textContent = messageView.textContent.slice(0, maxLength) + '...';
  }
};
</script>

<template>
  <div class="chatting-modify-me-message-window">
    <div class="profile-icon">
      <span class="material-icons">edit</span> <!-- 연필 아이콘 -->
    </div>
    <div class="modify">
      <div class="info">메시지 수정</div>
      <div class="modify-object-message-view" id="messageView">
        든 브라우저에서 동일하게 보이는 것이 중요합니다.awdasdwasdwasdwaawdasdwasdawdas
      </div>
    </div>
    <button class="close-button">
      <span class="material-icons">close</span> <!-- X 아이콘 -->
    </button>
  </div>
  <div class="input-area">
    <label for="chatInput"></label><textarea id="chatInput" placeholder="메시지를 입력하세요">든 브라우저에서 동일하게 보이는 것이 중요합니다.</textarea>
    <button class="material-icons">check</button>
  </div>
</template>

<style scoped>

</style>