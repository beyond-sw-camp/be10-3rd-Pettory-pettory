<script setup>
import ChatPanel from "@/components/panel/ChatPanel.vue";
import Header from "@/components/header/Header.vue";
import axios from "axios";
import {ref, reactive, watch, onMounted, onUnmounted} from "vue";

/* 객체 생성부 */
// 웹 소켓 빈 객체 생성
const websocket = ref({});

// 채팅방 체크 함수
let chatCheck = "";

// ChatWindow 필요한 객체 선언
const chattingMainWindowProps = defineProps({
  chatroomState : String,
  chatroomType : String,
  chatroomTypeNum : Number,
  userId : Number,
  userNickname : String
});

// 채팅 리스트 객체 생성
const chattingListObject = reactive({
  chattingList : [],
  errorMessage : ''
});

// 채팅 리스트에 넣을 객체 생성 (채팅을 송수신 했을때 DrawSpeechBub 에 넘겨 그리게 함)
let chattingObject = {
  chattingUniqueNum : 0,
  chattingChatroomUniqueNum: 0,
  chattingContent : '',
  chattingInsertTime : '',
  chattingUpdateTime : null,
  chattingDeleteTime : null,
  chattingState : 'ACTIVE',
  userId : 0,
  userNickname : ''
}
/************************************************************/
/* 마운트 시점 호출 화살표 함수 */
// 소켓 연결
const connectWebSocket = () => {
  websocket.value = new WebSocket(`ws://localhost:8080/ws/chatroom/${chattingMainWindowProps.chatroomTypeNum}`);
  websocket.value.onopen = () => {
    console.log("소켓이 연결되었습니다.");
  }
}

// 채팅 목록 조회 함수
const fetchChattingList = async () => {
  try {
    // 임시 채팅 조회 경로
    const response = await axios.get(`http://localhost:8080/chat/chatroom-chatting/${chattingMainWindowProps.chatroomTypeNum}`, {
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

// 채팅방이 생성됬는지 체크 통신 함수
// #{chatroomTypeNum} 사용, 산책 모임방, 공동구매 모임방 고유번호 값.
const checkChatroom = async() => {
  try {
    const response = await axios.get(`http://localhost:8080/chat/chatroom-check/${chattingMainWindowProps.chatroomTypeNum}`,{
      headers : {
        Authorization : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjaGF0QGdtYWlsLmNvbSIsImF1dGgiOlsiUk9MRV9VU0VSIl0sImV4cCI6MTczMDI1MTc5N30.aM3knHn_RuZanzSNI9Hd-dsXIEQaaJUTEWD0fEg-9WCUfb7VahwTzza5e4tQ4EnrtzFPH_TnJsKtgKXqXFAWDQ'
      },
      withCredentials : true
    });
    chatCheck = response.data.checkRoom;
  } catch (error) {
    console.error('채팅방 체크 중 에러가 발생했습니다.');
  }
}

// 채팅방 생성 통신 함수
const createChatroom = async () => {
  try {
    await axios.post(`http://localhost:8080/chat/chatroom`,
      {
        chatroomState : chattingMainWindowProps.chatroomState,
        chatroomType : chattingMainWindowProps.chatroomType,
        chatroomTypeNum : chattingMainWindowProps.chatroomTypeNum
      },
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjaGF0QGdtYWlsLmNvbSIsImF1dGgiOlsiUk9MRV9VU0VSIl0sImV4cCI6MTczMDI1MTc5N30.aM3knHn_RuZanzSNI9Hd-dsXIEQaaJUTEWD0fEg-9WCUfb7VahwTzza5e4tQ4EnrtzFPH_TnJsKtgKXqXFAWDQ'
          },
          withCredentials: true
        }
    );
  } catch (error) {
    console.error('채팅방 생성 중 에러가 발생했습니다.');
  }
}

// 소켓 연결 종료
const disconnectWebSocket = () => {
  websocket.value.onclose = () => {
    console.log("소켓이 종료되었습니다.");
  }
}
/************************************************************/
/* 채팅 실시간 통신 함수 */
const communication = async (newMessage) => {
  // 이미 소켓은 열린 상황
  try {
    /* 스프레드 문법을 사용해서 proxy 객체를 JSON 객체로 변환을 시켜주어야 한다. */
    //console.log({...newMessage});
    // 채팅 전송
    websocket.value.send(JSON.stringify(newMessage));

    // 채팅 수신시
    websocket.value.onmessage = (event) => {
      // 수신된 데이터
      const receivedMessage = JSON.parse(event.data);
      chattingObject.chattingUniqueNum = receivedMessage.chattingUniqueNum;
      chattingObject.chattingChatroomUniqueNum = receivedMessage.chattingChatroomUniqueNum;
      chattingObject.chattingContent = receivedMessage.chattingContent;
      chattingObject.chattingInsertTime = receivedMessage.chattingInsertTime;
      chattingObject.chattingUpdateTime = null;
      chattingObject.chattingDeleteTime = null;
      chattingObject.chattingState = 'ACTIVE';
      chattingObject.userId = receivedMessage.userId;
      chattingObject.userNickname = receivedMessage.userNickname;

      chattingListObject.chattingList.push(chattingObject);
    };
    console.log(newMessage.chattingContent);
  } catch (error) {
    console.log("채팅을 송신하는데 오류가 발생했습니다.");
  }
}

// 채팅 리스트에 변화가 생길 때마다 스크롤을 아래로 이동
const scrollToBottom = () => {
  const chatWindow = document.querySelector('.chat-window');
  if (chatWindow) {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
};

// chatList 가 변경될 때마다 스크롤 아래로 이동
watch(() => chattingListObject.chattingList, () => {
  scrollToBottom();
});

/************************************************************/
/* 마운트 시점에 소켓 연결 및 채팅 조회 */
onMounted(async () => {
  await checkChatroom();
  if(chatCheck === 'NotReadyRoom'){
    await createChatroom();
  } else {
    await fetchChattingList();
  }
  connectWebSocket();
});

// 언마운트 시점에 소켓 종료
onUnmounted(() => {
  disconnectWebSocket();
});
</script>

<template>
  <Header />
  <!-- ChatPanel 에게 데이터 전달 및 이벤트 함수 전달
       @(자식컴포넌트에서 받을 이름) = "함수 이름" -->
  <ChatPanel v-bind:chatList="chattingListObject.chattingList"
             :chatroomState="chattingMainWindowProps.chatroomState"
             :chatroomType="chattingMainWindowProps.chatroomType"
             :chatroomTypeNum="chattingMainWindowProps.chatroomTypeNum"
             :userId="chattingMainWindowProps.userId"
             :userNickname="chattingMainWindowProps.userNickname"
             @communication="communication"/>
</template>