<script setup>

import ChattingMainWindow from "@/views/main/ChattingMainWindow.vue";
</script>

<template>
  <ChattingMainWindow v-bind:chatroomState="'ACTIVE'"
                      v-bind:chatroomType="'WALKING'"
                      v-bind:chatroomTypeNum=147
                      v-bind:userId=1
                      v-bind:userNickname="'water'"/>
</template>

<style scoped>

</style>
