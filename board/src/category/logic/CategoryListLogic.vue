<script lang="ts">
import { ref } from 'vue';

export function useCategoryLogic() {
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
</script>
