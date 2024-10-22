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
    <UpdateCategoryModal
        :show="isEditModalVisible"
        :initialCategoryName="selectedCategoryName"
        @edit="updateCategoryName"
        @close="closeEditModal"
    />

    <!-- 삭제 확인 모달 -->
    <DeleteCategoryModal
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
import { defineComponent } from 'vue';
import CategoryItem from '../components/CategoryItem.vue';
import CreateCategoryModal from '../modal/CreateCategoryModal.vue';
import UpdateCategoryModal from "@/modal/UpdateCategoryModal.vue";
import DeleteCategoryModal from "@/modal/DeleteCategoryModal.vue";
import { useCategoryLogic } from '@/logic/CategoryListLogic.vue' // 로직 가져오기

export default defineComponent({
  components: {
    DeleteCategoryModal,
    UpdateCategoryModal,
    CategoryItem,
    CreateCategoryModal
  },
  setup() {
    const {
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
    } = useCategoryLogic();

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
