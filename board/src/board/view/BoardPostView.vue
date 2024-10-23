<template>
  <div class="post-view">
    <!-- 카테고리와 제목 -->
    <div class="post-header">
      <h4>{{ post.category }}</h4>
      <h1>{{ post.title }}</h1>
    </div>

    <!-- 게시글 정보 -->
    <div class="post-info">
      <p>작성자 : {{ post.author }}</p>
      <p>게시 시각 : {{ post.createdAt }}</p>
      <p>조회수 : {{ post.views }}</p>
    </div>

    <!-- 게시글 내용 -->
    <div class="post-content">
      <p v-html="post.content"></p>
      <img :src="post.imageUrl" alt="게시글 이미지" v-if="post.imageUrl" />
    </div>

    <!-- 수정 및 삭제 버튼 -->
    <div class="post-actions">
      <button @click="editPost">게시글 수정</button>
      <button @click="deletePost">게시글 삭제</button>
    </div>

    <!-- 댓글 목록 -->
    <div class="comments-section">
      <h3>댓글 {{ comments.length }}</h3>
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <p>{{ comment.author }}: {{ comment.content }}</p>
        <button @click="replyToComment(comment)">답글</button>
        <div v-if="comment.replies" class="replies">
          <p v-for="reply in comment.replies" :key="reply.id" class="reply-item">
            ↳ {{ reply.author }}: {{ reply.content }}
          </p>
        </div>
      </div>

      <!-- 댓글 입력 -->
      <div class="comment-form">
        <input v-model="newComment" placeholder="댓글 작성하기" />
        <button @click="submitComment">댓글 작성</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const post = ref({
      title: '게시글 제목',
      author: '작성자닉네임',
      createdAt: '2024-10-11 16:17',
      views: 20,
      content: '게시글 내용~게시글 내용~',
      imageUrl: '/path/to/image.jpg',
      category: '카테고리 이름',
    });

    const comments = ref([
      {
        id: 1,
        author: '작성자1',
        content: '싸우자',
        replies: [],
      },
      {
        id: 2,
        author: '작성자2',
        content: '주소불러',
        replies: [{ id: 21, author: '작성자3', content: '이기는편 우리편' }],
      },
    ]);

    const newComment = ref('');

    // 댓글 작성 함수
    const submitComment = () => {
      if (newComment.value.trim() !== '') {
        comments.value.push({
          id: comments.value.length + 1,
          author: '작성자닉네임',
          content: newComment.value,
          replies: [],
        });
        newComment.value = '';
      }
    };

    // 게시글 수정
    const editPost = () => {
      console.log('게시글 수정');
    };

    // 게시글 삭제
    const deletePost = () => {
      console.log('게시글 삭제');
    };

    // 댓글에 답글 달기
    const replyToComment = (comment) => {
      console.log('댓글에 답글 달기', comment);
    };

    onMounted(() => {
      console.log('게시글 조회 페이지가 로드되었습니다.');
    });

    return {
      post,
      comments,
      newComment,
      submitComment,
      editPost,
      deletePost,
      replyToComment,
    };
  },
};
</script>

<style scoped>
.post-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.post-header h4 {
  margin: 0;
  font-size: 1.2rem;
  color: #555;
}

.post-header h1 {
  margin: 10px 0;
  font-size: 2rem;
}

.post-info {
  font-size: 0.9rem;
  color: #777;
}

.post-content {
  margin: 20px 0;
}

.post-content img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 20px 0;
}

.post-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.post-actions button {
  padding: 8px 12px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  cursor: pointer;
}

.comments-section {
  margin-top: 40px;
}

.comment-item {
  margin-bottom: 15px;
}

.replies {
  margin-left: 20px;
}

.comment-form {
  display: flex;
  margin-top: 20px;
}

.comment-form input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.comment-form button {
  padding: 10px 15px;
  border: none;
  background-color: #66cccc;
  color: white;
  cursor: pointer;
  margin-left: 10px;
}
</style>
