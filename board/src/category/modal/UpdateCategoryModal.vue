<template>
  <div class="modal-overlay" v-if="show">
    <div class="modal-content">
      <h3>선택하신 카테고리를 수정할 이름을 입력하세요</h3>
      <input v-model="categoryName" type="text" />
      <div class="modal-actions">
        <button @click="confirmEdit">수정</button>
        <button @click="closeModal">취소</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import axios from "axios";

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    categoryNum: {
      type: Number,
      required: true, // 수정할 카테고리 번호 필요
    },
    initialCategoryName: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const categoryName = ref(props.initialCategoryName);

    // 모달 닫기 함수
    const closeModal = () => {
      emit('close');
    };

    // 카테고리 수정 후 서버로 전송
    const confirmEdit = () => {
      if (categoryName.value.trim() !== '') {
        emit('edit', categoryName.value);
        emit('edit-success'); // 부모 컴포넌트로 성공 이벤트 전달
      }
      editCategoryToDB(props.categoryNum, categoryName.value);
      closeModal();
    };

    // 서버에 수정 요청을 보내는 함수
    const editCategoryToDB = async (categoryNum, newCategoryName) => {
      try {
        // 서버로 PUT 요청 전송
        await axios.put(`http://localhost:8080/board/categorys/${categoryNum}`, {
          categoryTitle: newCategoryName,
        }, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJta0BuYXZlci5jb20iLCJhdXRoIjpbIlJPTEVfVVNFUiJdLCJleHAiOjE3MzAzNTQ4OTF9.nLn_NaNBr3y_gxCULCPVS0Eq8BSqb1kSBhB0P-_XpsX6r7QY0oH4ZEpgFncA5VUA1Ro72ZlU4P-JLwTL1o65vQ' // 올바른 토큰 사용
          }
        });
      } catch (error) {
        console.log("카테고리 수정 중 오류 발생: ", error);
      }
    };

    // 초기 카테고리 이름이 변경될 때마다 동기화
    watch(() => props.initialCategoryName, (newVal) => {
      categoryName.value = newVal;
    });

    return {
      categoryName,
      closeModal,
      confirmEdit
    };
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  text-align: center;
}

.modal-actions {
  margin-top: 20px;
}

.modal-actions button {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #66cccc;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.modal-actions button:hover {
  background-color: #559999;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
