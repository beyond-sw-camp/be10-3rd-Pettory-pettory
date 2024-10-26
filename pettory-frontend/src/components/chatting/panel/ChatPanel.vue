<script setup>
// 부모로부터 온 데이터 Props 로 받기
import ChatWindow from "@/components/chatting/window/ChatWindow.vue";

const props = defineProps({
  chatList: {
    type: Array,
    required: true
  },
  chatroomState : String,
  chatroomType : String,
  chatroomTypeNum : Number,
  userId : Number,
  userNickname : String
});

/* emit 는 외부로 이벤트를 보낼 수 있고 또한 이 이벤트를 주는 부모 컴포넌트에서도
* 감지가 가능하도록 함. communication 이라는 이벤트를 외부로 보내게 되어있음. */
const emit = defineEmits(['communication']);

/* emit 을 이용해서 communication 이라는 이벤트를 발생을 시킴. */
const communication = (message) => {
  emit('communication', message);
}

// 여기에서의 콘솔은 아직 DOM 이 초기화 되고 나서 통신하기 전에 찍히는 로그이므로 내가 의도한 바를 확인할 수 없는 곳임.
// console.log(props.chatList);
</script>

<template>
  <div class="container">
    <div class="chat-panel">
      <!-- ChatPanel -> ChatWindow 로 데이터 넘김 -->
      <ChatWindow v-bind:chatList="props.chatList"
                  :chatroomState="props.chatroomState"
                  :chatroomType="props.chatroomType"
                  :chatroomTypeNum="props.chatroomTypeNum"
                  :userId="props.userId"
                  :userNickname="props.userNickname"
                  @communication="communication"/>
    </div>
  </div>
</template>

<style scoped>

</style>