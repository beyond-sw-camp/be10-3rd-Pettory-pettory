<template>
  <div>
    <h2>카테고리 목록</h2>
    <ul>
      <li v-for="category in categories" :key="category.id">
        {{ category.name }}
        <button @click="openEditModal(category)">수정</button>
        <button @click="openDeleteModal(category)">삭제</button>
      </li>
    </ul>

    <button @click="openCreateModal">카테고리 추가</button>

    <!-- 수정 모달 -->
    <div v-if="isEditModalVisible">
      <h3>카테고리 수정</h3>
      <input v-model="selectedCategoryName" />
      <button @click="updateCategoryName(selectedCategoryName)">수정</button>
      <button @click="closeEditModal">닫기</button>
    </div>

    <!-- 삭제 모달 -->
    <div v-if="isDeleteModalVisible">
      <h3>정말 삭제하시겠습니까?</h3>
      <button @click="deleteCategoryConfirmed">삭제</button>
      <button @click="closeDeleteModal">닫기</button>
    </div>

    <!-- 추가 모달 -->
    <div v-if="isCreateModalVisible">
      <h3>새로운 카테고리 추가</h3>
      <input v-model="newCategoryName" />
      <button @click="createCategory(newCategoryName)">추가</button>
      <button @click="closeCreateModal">닫기</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useCategoryLogic } from '@/components/board/category/CategoryListLogic.vue'; // Composable 불러오기

export default defineComponent({
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

    // 새로 추가할 카테고리 이름
    const newCategoryName = ref('');

    return {
      categories,
      isEditModalVisible,
      isDeleteModalVisible,
      isCreateModalVisible,
      selectedCategoryName,
      newCategoryName, // 새 카테고리 이름을 입력받기 위한 데이터
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
/* 필요한 스타일을 여기에 추가 */
</style>
