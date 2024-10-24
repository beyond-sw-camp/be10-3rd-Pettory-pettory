<script setup>
// 부모로부터 받은 데이터 Props 로 받기
import ChatMe from "@/components/message/ChatMe.vue";
import ChatRelativity from "@/components/message/ChatRelativity.vue";
import ChatMeModify from "@/components/message/ChatMeModify.vue";
import ChatRelativityModify from "@/components/message/ChatRelativityModify.vue";
import ChatDelete from "@/components/message/ChatDelete.vue";

const props = defineProps({
  chatMessage : {
    type : Object,
    required : true
  }
});

const userId = 1; // 임시 유저 아이디
</script>

<template>
  <div v-if="chatMessage.userId === userId && chatMessage.chattingState === 'ACTIVE'">
    <ChatMe v-bind:message="chatMessage.chattingContent"
            v-bind:timestamp="chatMessage.chattingInsertTime"/>
  </div>
  <div v-else-if="chatMessage.userId === userId && chatMessage.chattingState === 'MODIFY'">
    <ChatMeModify v-bind:message="chatMessage.chattingContent"
                  v-bind:timestamp="chatMessage.chattingUpdateTime" />
  </div>
  <div v-else-if="chatMessage.userId !== userId && chatMessage.chattingState === 'ACTIVE'">
    <ChatRelativity v-bind:userNickname="chatMessage.userNickname"
                    v-bind:message="chatMessage.chattingContent"
                    v-bind:timestamp="chatMessage.chattingInsertTime" />
  </div>
  <div v-else-if="chatMessage.userId !== userId && chatMessage.chattingState === 'MODIFY'">
    <ChatRelativityModify v-bind:userNickname="chatMessage.userNickname"
                          v-bind:message="chatMessage.chattingContent"
                          v-bind:timestamp="chatMessage.chattingUpdateTime"/>
  </div>
  <div v-else-if="chatMessage.chattingState === 'DELETE'">
    <ChatDelete />
  </div>
</template>