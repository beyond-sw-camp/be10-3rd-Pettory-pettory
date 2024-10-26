<template>
  <div class="question-view">
    <!-- 카테고리와 제목 -->
    <div class="question-header">
      <h4>{{ question.category }}</h4>
      <h1>{{ question.title }}</h1>
    </div>

    <!-- 질문 정보 -->
    <div class="question-info">
      <p>글쓴이 : {{ question.author }}</p>
      <p>날짜 : {{ question.createdAt }}</p>
      <p>조회 수 : {{ question.views }}</p>
    </div>

    <!-- 질문 내용 -->
    <div class="question-content">
      <p v-html="question.content"></p>
      <img :src="question.imageUrl" alt="질문 이미지" v-if="question.imageUrl" />
    </div>

    <!-- 수정 및 삭제 버튼 -->
    <div class="question-actions">
      <CounselingButton @click="editQuestion">질문 수정</CounselingButton>
      <CounselingButton @click="deleteQuestion">질문 삭제</CounselingButton>
    </div>

    <!-- 답변 목록 -->
    <div class="answers-section">
      <h3>답변 {{ answers.length }}</h3>
      <div v-for="answer in answers" :key="answer.id" class="answer-item">
        <p>{{ answer.author }}: {{ answer.content }}</p>
        <button @click="replyToAnswer(answer)">답변</button>
        <div v-if="answer.replies" class="replies">
          <p v-for="reply in answer.replies" :key="reply.id" class="reply-item">
            ↳ {{ reply.author }}: {{ reply.content }}
          </p>
        </div>
      </div>

      <!-- 답변 입력 -->
      <div class="answer-form">
        <input v-model="newAnswer" placeholder="답변 작성하기" />
        <button @click="submitAnswer">답변 작성</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import CounselingButton from "@/components/counseling/counseling/CounselingButton.vue";

export default {
  components: {CounselingButton},
  setup() {
    const question = ref({
      title: '질문 제목',
      author: '회원 닉네임',
      createdAt: '2024-10-11 16:17',
      views: 20,
      content: '질문 내용',
      imageUrl: '/path/to/image.jpg',
      category: '카테고리 이름',
    });

    const answers = ref([
      {
        id: 1,
        author: '민권쓰',
        content: '답변 내용 1',
        replies: [],
      },
      {
        id: 2,
        author: '찌유',
        content: '답변 내용 2',
        replies: [{ id: 3, author: '찬찬찬', content: '답변 내용 3' }],
      },
    ]);

    const newAnswer = ref('');

    // 답변 작성 함수
    const submitAnswer = () => {
      if (newAnswer.value.trim() !== '') {
        answers.value.push({
          id: answers.value.length + 1,
          author: '회원 닉네임',
          content: newAnswer.value,
          replies: [],
        });
        newAnswer.value = '';
      }
    };

    // 질문 수정
    const editQuestion = () => {
      console.log('질문 수정');
    };

    // 질문 삭제
    const deleteQuestion = () => {
      console.log('질문 삭제');
    };

    // 재답변 작성
    const replyToAnswer = (answer) => {
      console.log('재답변 작성', answer);
    };

    onMounted(() => {
      console.log('질문 조회 페이지가 로드되었습니다.');
    });

    return {
      question,
      answers,
      newAnswer,
      submitAnswer,
      editQuestion,
      deleteQuestion,
      replyToAnswer,
    };
  },
};
</script>

<style scoped>
.question-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.question-header h4 {
  margin: 0;
  font-size: 1.2rem;
  color: #555;
}

.question-header h1 {
  margin: 10px 0;
  font-size: 2rem;
}

.question-info {
  font-size: 0.9rem;
  color: #777;
}

.question-content {
  margin: 20px 0;
}

.question-content img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 20px 0;
}

.question-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.question-actions button {
  padding: 8px 12px;
  cursor: pointer;
}

.answers-section {
  margin-top: 40px;
}

.answer-item {
  margin-bottom: 15px;
}

.replies {
  margin-left: 20px;
}

.answer-form {
  display: flex;
  margin-top: 20px;
}

.answer-form input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.answer-form button {
  padding: 10px 15px;
  border: none;
  background-color: #66cccc;
  color: white;
  cursor: pointer;
  margin-left: 10px;
}
</style>
