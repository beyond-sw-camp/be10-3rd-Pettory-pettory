<script setup>

import ChatWindow from "@/components/window/ChatWindow.vue";

// 부모로부터 온 데이터 Props 로 받기
const props = defineProps({
  chatList: {
    type: Array,
    required: true
  }
});

// 여기에서의 콘솔은 아직 DOM 이 초기화 되고 나서 통신하기 전에 찍히는 로그이므로 내가 의도한 바를 확인할 수 없는 곳임.
// console.log(props.chatList);
</script>

<template>
  <div class="container">
    <div class="chat-panel">
      <!-- ChatPanel -> ChatWindow 로 데이터 넘김 -->
      <ChatWindow v-bind:chatList="props.chatList"/>
    </div>
  </div>
</template>

<style scoped>

</style>