<script lang="ts">
import {defineComponent, nextTick, onMounted, ref, watch} from 'vue';
import CategoryItem from '../components/CategoryItem.vue';
import CreateCategoryModal from '../modal/CreateCategoryModal.vue';
import UpdateCategoryModal from "@/category/modal/UpdateCategoryModal.vue";
import DeleteCategoryModal from "@/category/modal/DeleteCategoryModal.vue";
import { useCategoryLogic } from '@/category/logic/CategoryListLogic.vue';
import CategoryButton from "@/category/components/CategoryButton.vue"; // 로직 가져오기

export default defineComponent({
  components: {
    CategoryButton,
    DeleteCategoryModal,
    UpdateCategoryModal,
    CategoryItem,
    CreateCategoryModal
  },
  setup() {
    const {
      state,
      openEditModal,
      closeEditModal,
      updateCategoryName,
      openDeleteModal,
      closeDeleteModal,
      deleteCategoryConfirmed,
      openCreateModal,
      closeCreateModal,
      createCategory,
      fetchCategoryDetail,
      isCreateModalVisible,
      isDeleteModalVisible,
      isEditModalVisible,
      selectedCategoryNum,
    } = useCategoryLogic();

    // isLoading의 변화를 감시하고 콘솔에 로그 출력
    watch(() => state.isLoading.value, (newValue) => {
      console.log('isLoading 상태:', newValue);
    });

    onMounted(async () => {
      await fetchCategoryDetail();
      console.log('UI가 업데이트 된 후의 isLoading:', state.isLoading.value);
      console.log(state.categories.value);
    });

    watch(() => isCreateModalVisible, (newValue) => {
      console.log('isCreateModalVisible 상태:', newValue);
    });

    // 모달이 닫힐 때 카테고리 목록을 최신화하는 함수
    const handleModalClose = async () => {
      await fetchCategoryDetail();
      await nextTick();
    };

    const closeAndRefreshCreate = async () => {
      closeCreateModal();  // 기존 closeCreateModal 호출
      await handleModalClose();  // 최신화 함수 호출
    };

    const closeAndRefreshDelete = async () => {
      closeDeleteModal();  // 기존 closeCreateModal 호출
      await handleModalClose();  // 최신화 함수 호출
    };

    const closeAndRefreshUpdate = async () => {
      closeEditModal();  // 기존 closeCreateModal 호출
      await handleModalClose();  // 최신화 함수 호출
    };


    // state에서 필요한 값을 반환합니다.
    return {
      categories: state.categories,
      isLoading: state.isLoading, // isLoading 상태
      selectedCategoryName: state.selectedCategory.value.categoryTitle, // 수정된 부분
      isCreateModalVisible,
      isDeleteModalVisible,
      isEditModalVisible,
      openEditModal,
      closeEditModal,
      updateCategoryName,
      openDeleteModal,
      closeDeleteModal,
      deleteCategoryConfirmed,
      openCreateModal,
      closeCreateModal,
      createCategory,
      fetchCategoryDetail,
      selectedCategoryNum,
      closeAndRefreshCreate,
      closeAndRefreshDelete,
      closeAndRefreshUpdate
    };
  }
});
</script>

<template>
  <div class="category-list-container">
    <h1>게시글 카테고리 목록</h1>
    <div class="category-list">
      <!-- 데이터 로드 완료 후 카테고리가 없을 때 -->

      <p v-if="isLoading">카테고리를 불러오는 중입니다...</p>
      <p v-else-if="!categories.length">카테고리가 없습니다.</p>

      <!-- 카테고리가 있을 때 -->
      <CategoryItem
          v-for="category in categories"
          :key="category.categoryNum"
          :categoryTitle="category.categoryTitle"
          @edit="openEditModal(category)"
          @delete="openDeleteModal(category)"
      />
    </div>

    <CategoryButton @click="openCreateModal" :buttonStyle="{ padding: '10px 25px', fontSize: '1.2rem' }">
      카테고리 생성
    </CategoryButton>

    <!-- 수정 모달 -->
    <UpdateCategoryModal
        :show="isEditModalVisible"
        :initialCategoryName="selectedCategoryName"
        :categoryNum="selectedCategoryNum"
        @edit="updateCategoryName"
        @edit-success="closeAndRefreshUpdate"
        @close="closeAndRefreshUpdate"
    />

    <!-- 삭제 확인 모달 -->
    <DeleteCategoryModal
        :show="isDeleteModalVisible"
        :categoryNum="selectedCategoryNum"
        @confirm-delete="deleteCategoryConfirmed"
        @close="closeAndRefreshDelete"
        @delete-success="closeAndRefreshDelete"
    />

    <!-- 카테고리 생성 모달 -->
    <CreateCategoryModal
        :show="isCreateModalVisible"
        @create="createCategory"
        @close="closeAndRefreshCreate"
        @create-success="closeAndRefreshUpdate"
    />
  </div>
</template>

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

/* 스크롤바 스타일 */
.category-list::-webkit-scrollbar {
  width: 8px;
}

.category-list::-webkit-scrollbar-thumb {
  background-color: #66cccc;
  border-radius: 10px;
}
</style>
