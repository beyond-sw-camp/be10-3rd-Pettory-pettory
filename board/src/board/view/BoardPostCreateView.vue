<template>
  <div class="create-post">
    <!-- 카테고리 선택 -->
    <div class="category-select">
      <BoardButton @click="toggleCategoryList">☰ 카테고리를 선택하세요</BoardButton>
      <ul v-if="isCategoryListVisible" class="category-list">
        <li
            v-for="category in categories"
            :key="category"
            @click="selectCategory(category)"
        >
          {{ category }}
        </li>
      </ul>
      <p v-if="selectedCategory">선택한 카테고리: {{ selectedCategory }}</p>
    </div>

    <!-- 게시글 제목 입력 -->
    <div class="title-input">
      <input
          type="text"
          v-model="postTitle"
          placeholder="게시글 제목을 입력하세요"
          class="post-title"
      />
    </div>

    <!-- 게시글 내용 입력 (Quill 에디터) -->
    <div class="editor">
      <div ref="quillEditor" class="quill-editor"></div>
    </div>

    <!-- 게시글 저장 버튼 -->
    <div class="actions">
      <button @click="savePost" class="save-button">게시글 저장</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Quill 기본 테마
import BoardButton from '@/board/components/BoardButton.vue';
import {useRouter} from "vue-router"; // 카테고리 선택용 버튼 컴포넌트

export default {
  components: {
    BoardButton,
  },
  setup() {
    const quillEditor = ref(null);
    const postTitle = ref('');
    const postContent = ref('');
    const selectedCategory = ref('');
    const categories = ref(['IT', '생활', '여행']); // 카테고리 목록
    const isCategoryListVisible = ref(false);
    const router = useRouter();

    onMounted(() => {
      const quill = new Quill(quillEditor.value, {
        theme: 'snow',
        placeholder: '게시글 내용을 작성하세요',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'], // formatting 제거 버튼
          ],
        },
      });

      quill.on('text-change', () => {
        postContent.value = quill.root.innerHTML;
      });
    });

    const toggleCategoryList = () => {
      isCategoryListVisible.value = !isCategoryListVisible.value;
    };

    const selectCategory = (category) => {
      selectedCategory.value = category;
      isCategoryListVisible.value = false;
    };

    // 게시글 저장
    const savePost = () => {
      if (!postTitle.value || !postContent.value || !selectedCategory.value) {
        alert('제목, 내용, 카테고리를 모두 입력해주세요.');
        return;
      }

      const newPost = {
        title: postTitle.value,
        content: postContent.value,
        category: selectedCategory.value,
        createdAt: new Date().toISOString(),
      };

      // 저장된 데이터를 콘솔에 출력
      console.log('저장된 게시글:', newPost);

      // 여기에 서버 API로 데이터를 전송하는 로직을 추가할 수 있습니다.
      alert('게시글이 저장되었습니다.');
      router.push('/board');

    };

    return {
      quillEditor,
      postTitle,
      postContent,
      selectedCategory,
      categories,
      isCategoryListVisible,
      toggleCategoryList,
      selectCategory,
      savePost,
    };
  },
};
</script>

<style scoped>
.create-post {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.category-select {
  margin-bottom: 20px;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  max-width: 300px;
}

.category-list li {
  padding: 10px;
  cursor: pointer;
}

.category-list li:hover {
  background-color: #eee;
}

.title-input {
  margin-bottom: 20px;
}

.post-title {
  width: 100%;
  padding: 10px;
  font-size: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.editor {
  margin-bottom: 20px;
}

.quill-editor {
  height: 500px;

}

.actions {
  text-align: right;
}

.save-button {
  padding: 10px 20px;
  border: none;
  background-color: #66cccc;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.save-button:hover {
  background-color: #339999;
}
</style>
