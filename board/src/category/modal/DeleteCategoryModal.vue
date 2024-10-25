<template>
  <div class="modal-overlay" v-if="show">
    <div class="modal-content">
      <h3>선택하신 카테고리를 삭제하시겠습니까?</h3>
      <div class="modal-actions">
        <button @click="confirmDelete">삭제</button>
        <button @click="closeModal">취소</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from "axios";

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false
    },
    categoryNum: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const closeModal = () => {
      emit('close');
    };

    const confirmDelete = async () => {
      try {
        // DELETE 요청을 서버로 전송
        await axios.delete(`http://localhost:8080/board/categorys/${props.categoryNum}`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJta0BuYXZlci5jb20iLCJhdXRoIjpbIlJPTEVfVVNFUiJdLCJleHAiOjE3MzAzNTQ4OTF9.nLn_NaNBr3y_gxCULCPVS0Eq8BSqb1kSBhB0P-_XpsX6r7QY0oH4ZEpgFncA5VUA1Ro72ZlU4P-JLwTL1o65vQ' // 올바른 토큰을 여기에 추가
          }
        });

        // 성공적으로 삭제된 후 모달 닫기
        emit('confirm-delete', props.categoryNum);
        emit('delete-success'); // 부모 컴포넌트로 성공 이벤트 전달
      } catch (error) {
        console.error("카테고리 삭제 중 오류 발생: ", error);
      }
    };
    return {
      closeModal,
      confirmDelete
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
</style>
