<script setup>

import ChatInput from "@/components/input/ChatInput.vue";
import DrawSpeechBub from "@/components/window/DrawSpeechBub.vue";

const props = defineProps({
  chatList: {
    type: Array,
    required: true
  }
});

</script>

<template>
  <div class="chat-window">
    <DrawSpeechBub v-for="chatMessage in chatList" v-bind:key="chatList.chattingUniqueNum" v-bind:chatMessage="chatMessage"/>
  </div>
  <ChatInput />
</template>

<style scoped>

</style>