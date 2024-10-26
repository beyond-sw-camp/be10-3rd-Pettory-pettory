<script setup>

import ChattingMainWindow from "@/views/main/ChattingMainWindow.vue";
</script>

<template>
  <ChattingMainWindow v-bind:chatroomState="'ACTIVE'"
                      v-bind:chatroomType="'WALKING'"
                      v-bind:chatroomTypeNum=178 />
</template>

<style scoped>

</style>
