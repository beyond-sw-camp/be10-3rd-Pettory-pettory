<script setup>
import ChatPanel from "@/components/panel/ChatPanel.vue";
import Header from "@/components/header/Header.vue";
import axios from "axios";
import {ref, reactive, onMounted } from "vue";

// 채팅 리스트 객체 생성
const chattingListObject = reactive({
  chattingList : [],
  errorMessage : ''
});

// 채팅 목록 조회
const fetchChattingList = async () => {
  try {
    // 임시 채팅 조회
    const response = await axios.get('http://localhost:8080/chat/chatroom-chatting/145', {
      headers : {
        Authorization : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjaGF0QGdtYWlsLmNvbSIsImF1dGgiOlsiUk9MRV9VU0VSIl0sImV4cCI6MTczMDI1MTc5N30.aM3knHn_RuZanzSNI9Hd-dsXIEQaaJUTEWD0fEg-9WCUfb7VahwTzza5e4tQ4EnrtzFPH_TnJsKtgKXqXFAWDQ'
      },
      withCredentials : true
    });
    chattingListObject.chattingList = response.data.results.chattingList;
  } catch (error) {
    console.error('채팅 목록을 불러오는 중 에러가 발생했습니다.', error);
  }
}

onMounted(() => {
  fetchChattingList();
});
// 1. 채팅 송신
// 2. 채팅 수신 후 DB 저장
// 3. List 로 불러와서 뿌려주는 것은 채팅방 입장했을 때 DB에 기록된 채팅을 가져올때

// 통신 함수
function chattingCommunication() {
  // 임시 채팅 소켓 생성
  const websocket = new WebSocket("ws://localhost:8080/ws/chatroom/145");

  // 웹 소켓이 열렸을 때 호출이 됨
  websocket.onopen = () => {
    const sendChatObject = {
      chattingChatroomUniqueNum : chatObject.chattingChatroomUniqueNum,
      chattingContent: chatObject.chattingContent,
      chattingState: chatObject.chattingState,
      userId: chatObject.userId
    };

    // websocket 의 send 로 서버로 메시지를 송신한다.
    // 메시지를 JSON.stringify 를 통해 JSON 으로 변환한 후 전송한다.
    websocket.send(JSON.stringify(sendChatObject));
    console.log(JSON.stringify(sendChatObject));
  };

  // 웹 소켓이 서버로부터 메시지를 수신 받았을 때
  websocket.onmessage = (chattingMessage) => {
    const receiveMessage = JSON.parse(chattingMessage.data);
    console.log(receiveMessage);
  }
}
</script>

<template>
  <Header />
  <!-- ChatPanel 에게 데이터 전달 -->
  <ChatPanel v-bind:chatList="chattingListObject.chattingList"/>
</template>

<style scoped>

</style>