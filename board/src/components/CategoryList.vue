<template>
  <div class="category-list-container">
    <h1>게시글 카테고리 목록</h1>

    <div class="category-list">
      <CategoryItem
          v-for="category in categories"
          :key="category.id"
          :categoryName="category.name"
          @edit="openEditModal(category)"
          @delete="openDeleteModal(category)"
      />
    </div>

    <button class="create-button" @click="openCreateModal">카테고리 생성</button>

    <!-- 수정 모달 -->
    <ModalComponent
        :show="isEditModalVisible"
        :initialCategoryName="selectedCategoryName"
        @edit="updateCategoryName"
        @close="closeEditModal"
    />

    <!-- 삭제 확인 모달 -->
    <DeleteConfirmModal
        :show="isDeleteModalVisible"
        @confirm-delete="deleteCategoryConfirmed"
        @close="closeDeleteModal"
    />

    <!-- 카테고리 생성 모달 -->
    <CreateCategoryModal
        :show="isCreateModalVisible"
        @create="createCategory"
        @close="closeCreateModal"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CategoryItem from './CategoryItem.vue';
import ModalComponent from './ModalComponent.vue';
import DeleteConfirmModal from './DeleteConfirmModal.vue';
import CreateCategoryModal from './CreateCategoryModal.vue';

export default defineComponent({
  components: {
    CategoryItem,
    ModalComponent,
    DeleteConfirmModal,
    CreateCategoryModal
  },
  setup() {
    const categories = ref([
      { id: 1, name: '실종' },
      { id: 2, name: '자유' },
      { id: 3, name: '강아지' },
      { id: 4, name: '고양이' },
      { id: 5, name: '간식' },
      { id: 6, name: '장난감' }
    ]);

    const isEditModalVisible = ref(false);
    const isDeleteModalVisible = ref(false);
    const isCreateModalVisible = ref(false);
    const selectedCategoryId = ref(null);
    const selectedCategoryName = ref('');

    const openEditModal = (category) => {
      selectedCategoryId.value = category.id;
      selectedCategoryName.value = category.name;
      isEditModalVisible.value = true;
    };

    const closeEditModal = () => {
      isEditModalVisible.value = false;
    };

    const updateCategoryName = (newName) => {
      const category = categories.value.find(cat => cat.id === selectedCategoryId.value);
      if (category) {
        category.name = newName;
      }
      closeEditModal();
    };

    const openDeleteModal = (category) => {
      selectedCategoryId.value = category.id;
      isDeleteModalVisible.value = true;
    };

    const closeDeleteModal = () => {
      isDeleteModalVisible.value = false;
    };

    const deleteCategoryConfirmed = () => {
      categories.value = categories.value.filter(category => category.id !== selectedCategoryId.value);
      closeDeleteModal();
    };

    const openCreateModal = () => {
      isCreateModalVisible.value = true;
    };

    const closeCreateModal = () => {
      isCreateModalVisible.value = false;
    };

    const createCategory = (newName) => {
      const newCategory = {
        id: categories.value.length + 1,
        name: newName
      };
      categories.value.push(newCategory);
      closeCreateModal();
    };

    return {
      categories,
      isEditModalVisible,
      isDeleteModalVisible,
      isCreateModalVisible,
      selectedCategoryName,
      openEditModal,
      closeEditModal,
      updateCategoryName,
      openDeleteModal,
      closeDeleteModal,
      deleteCategoryConfirmed,
      openCreateModal,
      closeCreateModal,
      createCategory
    };
  }
});
</script>

<style scoped>
.category-list-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.category-list {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.create-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #66cccc;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.create-button:hover {
  background-color: #559999;
}

/* 스크롤바 스타일 */
.category-list::-webkit-scrollbar {
  width: 8px;
}

.category-list::-webkit-scrollbar-thumb {
  background-color: #66cccc;
  border-radius: 10px;
}
</style>
