<script setup>


import DrawSpeechBub from "@/components/chatting/window/DrawSpeechBub.vue";
import ChatInput from "@/components/chatting/input/ChatInput.vue";

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

const emit = defineEmits(['communication']);

const communication = (message) => {
  emit('communication', message);
}

</script>

<template>
  <div class="chat-window">
    <DrawSpeechBub v-for="chatMessage in chatList" v-bind:key="chatList.chattingUniqueNum" v-bind:chatMessage="chatMessage"/>
  </div>
  <ChatInput :chatroomState="props.chatroomState"
             :chatroomType="props.chatroomType"
             :chatroomTypeNum="props.chatroomTypeNum"
             :userId="props.userId"
             :userNickname="props.userNickname"
             @communication="communication"/>
</template>

<style scoped>

</style>