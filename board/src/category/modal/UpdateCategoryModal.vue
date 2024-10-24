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

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false
    },
    initialCategoryName: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const categoryName = ref(props.initialCategoryName);

    const closeModal = () => {
      emit('close');
    };

    const confirmEdit = () => {
      emit('edit', categoryName.value);
      closeModal();
    };

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
