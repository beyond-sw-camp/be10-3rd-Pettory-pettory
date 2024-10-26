<template>
  <div class="create-post">
    <!-- 카테고리 선택 -->
    <div class="category-select">
      <BoardButton @click="toggleCategoryList">☰ 카테고리를 선택하세요</BoardButton>
      <ul v-if="isCategoryListVisible" class="category-list">
        <li
            v-for="category in categories"
            :key="category.categoryNum"
            @click="selectCategory(category)"
        >
          {{ category.categoryTitle }}
        </li>
      </ul>
      <p v-if="selectedCategoryTitle">선택한 카테고리: {{ selectedCategoryTitle }}</p>
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
import 'quill/dist/quill.snow.css';
import {useAuthStore} from "@/stores/auth.js";

import { useRouter } from "vue-router";
import axios from "axios";
import BoardButton from "@/components/board/board/BoardButton.vue";

export default {
  components: {
    BoardButton,
  },
  setup() {
    const authStore = useAuthStore();
    const quillEditor = ref(null);
    const quill = ref<Quill | null>(null);
    const postTitle = ref('');
    const postContent = ref('');
    const selectedCategoryNum = ref<number | null>(null);
    const selectedCategoryTitle = ref<string>('');
    const categories = ref<{ categoryNum: number; categoryTitle: string }[]>([]);
    const isCategoryListVisible = ref(false);
    const router = useRouter();

    onMounted(() => {
      quill.value = new Quill(quillEditor.value, {
        theme: 'snow',
        placeholder: '게시글 내용을 작성하세요',
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['image'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['clean'],
            ],
            handlers: {
              image: () => {
                selectAndUploadImage(); // 이미지 업로드 통합 핸들러
              },
            },
          },
        },
      });

      quill.value.on('text-change', () => {
        postContent.value = quill.value?.root.innerHTML || '';
      });

      fetchCategories(); // 카테고리 목록 가져오기
    });

    // 이미지 선택 및 서버 전송 통합 함수
    const selectAndUploadImage = async (imageSrc = null) => {
      const formData = new FormData();

      if (imageSrc) {
        const blob = await (await fetch(imageSrc)).blob();
        formData.append('file', blob);
      } else {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
          const file = input.files[0];
          formData.append('file', file);
          await uploadImageToServer(formData);
        };
        return; // `onchange` 이벤트에서 처리되므로 종료
      }

      await uploadImageToServer(formData);
    };

    // 서버로 이미지 전송 함수
    const uploadImageToServer = async (formData) => {
      try {
        const response = await axios.post('http://localhost:8080/board/posts/image', formData, {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,          },
        });

        const imageUrl = response.data.url; // 서버에서 받은 이미지 URL
        insertToEditor(imageUrl);
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    };

    // 에디터에 이미지 URL 삽입
    const insertToEditor = (url) => {
      const range = quill.value?.getSelection();
      if (range) {
        quill.value.insertEmbed(range.index, 'image', url);
      }
    };

    // 카테고리 목록 가져오기
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/board/categorys', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJta0BuYXZlci5jb20iLCJhdXRoIjpbIlJPTEVfVVNFUiJdLCJleHAiOjE3MzA0Mzk4MzV9.q5PbbqoQkaMlO7pXi3VNHUiLfIN4aCIna7vy03MMNQ9lsciRmDyNpNet6-v61NwxoSs8CZKE-uR9ZW2foVMQhA',
          },
        });

        categories.value = response.data.map((category: any) => ({
          categoryNum: category.categoryNum,
          categoryTitle: category.categoryTitle,
        }));
      } catch (error) {
        console.error('카테고리 목록을 불러오는 중 오류 발생:', error);
      }
    };

    // 카테고리 선택 토글
    const toggleCategoryList = () => {
      isCategoryListVisible.value = !isCategoryListVisible.value;
    };

    // 카테고리 선택 처리
    const selectCategory = (category) => {
      selectedCategoryNum.value = category.categoryNum;
      selectedCategoryTitle.value = category.categoryTitle;
      isCategoryListVisible.value = false;
    };

    // 게시글 저장
    const savePost = async () => {
      if (!postTitle.value || !postContent.value || !selectedCategoryNum.value) {
        alert('제목, 내용, 카테고리를 모두 입력해주세요.');
        return;
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(postContent.value, 'text/html');
      const images = Array.from(doc.querySelectorAll('img'));

      for (const img of images) {
        const imageUrl = img.getAttribute('src');
        if (imageUrl && imageUrl.startsWith('data:')) {
          await selectAndUploadImage(imageUrl);
          img.setAttribute('src', imageUrl); // 서버 URL로 변경된 후 재설정
        }
      }

      const updatedHtmlContent = doc.body.innerHTML;
      const newPost = {
        postTitle: postTitle.value,
        postContent: updatedHtmlContent,
        postWriterNum: 10,
        postCategoryNum: selectedCategoryNum.value,
      };

      try {
        const response = await axios.post('http://localhost:8080/board/posts', newPost, {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 201) {
          alert('게시글이 저장되었습니다.');
          router.push('/board');
        } else {
          console.error('예상치 못한 응답:', response);
          alert('게시글 저장 중 문제가 발생했습니다.');
        }
      } catch (error) {
        console.error('게시글 저장 실패:', error);
        alert(error.response ? error.response.data.message : '서버 오류가 발생했습니다.');
      }
    };

    return {
      quillEditor,
      postTitle,
      postContent,
      selectedCategoryTitle,
      selectedCategoryNum,
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
