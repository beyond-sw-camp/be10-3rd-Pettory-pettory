<template>
  <div class="modal-overlay" v-if="show">
    <div class="modal-content">
      <h3>생성할 카테고리 이름을 입력하세요</h3>
      <input v-model="newCategoryName" type="text" placeholder="카테고리 이름" />
      <div class="modal-actions">
        <button @click="confirmCreate">생성</button>
        <button @click="closeModal">취소</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from "axios";

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, { emit }) {
    const newCategoryName = ref('');

    const closeModal = () => {
      emit('close');
    };

    const confirmCreate = () => {
      if (newCategoryName.value.trim() !== '') {
        emit('create', newCategoryName.value);
        emit('create-success'); // 부모 컴포넌트로 성공 이벤트 전달
      }
      createCategoryToDB(newCategoryName.value);
      closeModal();
    };

    const createCategoryToDB = async (newCategoryName) => {
      try{
        // 서버로 전송
        await axios.post("http://localhost:8080/board/categorys",{
          categoryTitle : newCategoryName,
        },{
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJta0BuYXZlci5jb20iLCJhdXRoIjpbIlJPTEVfVVNFUiJdLCJleHAiOjE3MzAzNTQ4OTF9.nLn_NaNBr3y_gxCULCPVS0Eq8BSqb1kSBhB0P-_XpsX6r7QY0oH4ZEpgFncA5VUA1Ro72ZlU4P-JLwTL1o65vQ' // 올바른 토큰 사용
          }
        });
      }catch(error){
        console.log("카테고리 등록 중 오류 발생: ", error)
      }
    };

    return {
      newCategoryName,
      closeModal,
      confirmCreate
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
  width: 500px; /* 가로 크기 수정 */
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
