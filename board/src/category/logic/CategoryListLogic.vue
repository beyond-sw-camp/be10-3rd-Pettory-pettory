<script>
import { ref } from 'vue';
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

// props를 사용하는 대신 categories 데이터를 외부에서 직접 받아서 처리하는 함수로 변경
export function useCategoryLogic(initialCategories) {
  // 외부에서 초기 카테고리를 받아서 ref로 설정
  const categories = ref(initialCategories || []);

  const isEditModalVisible = ref(false);
  const isDeleteModalVisible = ref(false);
  const isCreateModalVisible = ref(false);
  const selectedCategoryId = ref(null);
  const selectedCategoryName = ref('');
  const route = useRoute();
  const router = useRouter();

  // 수정 모달 열기
  const openEditModal = (category) => {
    selectedCategoryId.value = category.categoryNum;
    selectedCategoryName.value = category.categoryTitle;
    isEditModalVisible.value = true;
  };

  // 수정 모달 닫기
  const closeEditModal = () => {
    isEditModalVisible.value = false;
  };

  // 카테고리 이름 업데이트
  const updateCategoryName = (newName) => {
    const category = categories.value.find(cat => cat.categoryNum === selectedCategoryId.value);
    if (category) {
      category.categoryTitle = newName;
    }
    closeEditModal();
  };

  // 삭제 모달 열기
  const openDeleteModal = (category) => {
    selectedCategoryId.value = category.categoryNum;
    isDeleteModalVisible.value = true;
  };

  // 삭제 모달 닫기
  const closeDeleteModal = () => {
    isDeleteModalVisible.value = false;
  };

  // 카테고리 삭제
  const deleteCategoryConfirmed = () => {
    categories.value = categories.value.filter(category => category.categoryNum !== selectedCategoryId.value);
    closeDeleteModal();
  };

  // 생성 모달 열기
  const openCreateModal = () => {
    isCreateModalVisible.value = true;
  };

  // 생성 모달 닫기
  const closeCreateModal = () => {
    isCreateModalVisible.value = false;
  };

  // 새로운 카테고리 생성
  const createCategory = (newName) => {
    const newCategory = {
      categoryNum: categories.value.length + 1,
      categoryTitle: newName,
    };
    categories.value.push(newCategory);
    closeCreateModal();
  };

  // 카테고리 상세 정보 가져오기
  const fetchCategoryDetail = async () => {
    try {
      const response = await axios.get('http://localhost:8080/board/categorys');
      // 서버에서 받은 데이터를 categories에 저장
      categories.value = response.data.categories;
    } catch (error) {
      console.error('카테고리 목록을 불러오는 중 에러가 발생했습니다:', error);
    }
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
    createCategory,
    fetchCategoryDetail
  };
}
</script>
