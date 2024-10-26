<script setup>
import {reactive, ref} from 'vue';

const submitData = ref({
  chattingContent : ""
});

const props = defineProps({
  chatroomState : String,
  chatroomType : String,
  chatroomTypeNum : Number,
  userId : Number,
  userNickname : String
});

const submitObject = reactive({
  chattingChatroomUniqueNum : 0,
  chattingContent : '',
  chattingState : "ACTIVE",
  userId:0
});

const emit = defineEmits(['communication']);

const communication = () => {
  if (submitData.value.chattingContent.trim() === '') return;

  // 데이터 셋팅
  submitObject.chattingChatroomUniqueNum = props.chatroomTypeNum;
  submitObject.chattingContent = submitData.value.chattingContent;
  submitObject.userId = props.userId;

  // 새로운 데이터를 전달한다.
  emit('communication', submitObject);

  // 초기화
  submitData.value.chattingContent = '';
}

</script>

<template>
  <!-- @submit: submitForm 함수를 호출 하겠다 -->
  <form v-on:submit.prevent="communication" class="input-area">
    <textarea id="chatInput" v-model="submitData.chattingContent" placeholder="메시지를 입력하세요" required></textarea>
    <button class="send-button" type="submit">➤</button>
  </form>
</template>

<style scoped>

</style>