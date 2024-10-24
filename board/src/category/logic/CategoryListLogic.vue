<script>
import { ref, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

// props를 사용하는 대신 categories 데이터를 외부에서 직접 받아서 처리하는 함수로 변경
export function useCategoryLogic(initialCategories) {
  // 외부에서 초기 카테고리를 받아서 ref로 설정
  const isLoading = ref(true); // 로딩 상태를 ref로 변경
  const categories = ref(initialCategories || []); // 카테고리 배열을 ref로 변경
  const selectedCategory = ref({
    categoryNum: null,
    categoryTitle: ''
  });

  const modals = ref({
    isEditModalVisible: false,
    isDeleteModalVisible: false,
    isCreateModalVisible: false
  });

  // 카테고리 데이터 변화 감지
  watch(categories, (newCategories, oldCategories) => {
    console.log('Categories have changed:', newCategories);
  }, {
    deep: true // 깊은 감시를 활성화하여 내부 객체의 변경도 감지
  });

  const route = useRoute();
  const router = useRouter();

  // 수정 모달 열기
  const openEditModal = (category) => {
    selectedCategory.value.categoryNum = category.categoryNum;
    selectedCategory.value.categoryTitle = category.categoryTitle;
    modals.value.isEditModalVisible = true;
  };

  // 수정 모달 닫기
  const closeEditModal = () => {
    modals.value.isEditModalVisible = false;
  };

  // 카테고리 이름 업데이트
  const updateCategoryName = (newName) => {
    const category = categories.value.find(cat => cat.categoryNum === selectedCategory.value.categoryNum);
    if (category) {
      category.categoryTitle = newName;
    }
    closeEditModal();
  };

  // 삭제 모달 열기
  const openDeleteModal = (category) => {
    selectedCategory.value.categoryNum = category.categoryNum;
    modals.value.isDeleteModalVisible = true;
  };

  // 삭제 모달 닫기
  const closeDeleteModal = () => {
    modals.value.isDeleteModalVisible = false;
  };

  // 카테고리 삭제
  const deleteCategoryConfirmed = () => {
    categories.value = categories.value.filter(category => category.categoryNum !== selectedCategory.value.categoryNum);
    closeDeleteModal();
  };

  // 생성 모달 열기
  const openCreateModal = () => {
    modals.value.isCreateModalVisible = true;
  };

  // 생성 모달 닫기
  const closeCreateModal = () => {
    modals.value.isCreateModalVisible = false;
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

  const fetchCategoryDetail = async () => {
    isLoading.value = true; // 로딩 상태 활성화

    try {
      const response = await axios.get('http://localhost:8080/board/categorys', {
        params: {
          categoryNum: selectedCategory.value.categoryNum || '', // 빈 값 방지
          categoryTitle: selectedCategory.value.categoryTitle || '', // 빈 값 방지
        },
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJta0BuYXZlci5jb20iLCJhdXRoIjpbIlJPTEVfVVNFUiJdLCJleHAiOjE3MzAzNTQ4OTF9.nLn_NaNBr3y_gxCULCPVS0Eq8BSqb1kSBhB0P-_XpsX6r7QY0oH4ZEpgFncA5VUA1Ro72ZlU4P-JLwTL1o65vQ' // 올바른 토큰 사용
        }
      });

      // 2번 코드: 카테고리 데이터를 올바르게 할당하는 부분
      if (response.status === 200 && Array.isArray(response.data)) {
        categories.value = response.data.map(cat => ({
          categoryNum: cat.categoryNum,
          categoryTitle: cat.categoryTitle
        }));
        console.log('카테고리 데이터:', categories.value); // 응답 데이터 확인
      } else {
        console.error('API 응답 형식이 잘못되었습니다:', response.data);
      }
    } catch (error) {
      if (error.response) {
        // 서버 응답이 있지만 오류 상태 코드
        console.error('API 오류:', error.response.status, error.response.data);
      } else if (error.request) {
        // 요청이 전송되었으나 응답이 없을 때
        console.error('서버 응답이 없습니다:', error.request);
      } else {
        // 요청이 만들어지기 전 문제 발생
        console.error('요청 오류:', error.message);
      }
    } finally {
      isLoading.value = false; // 로딩 상태 해제
      await nextTick(); // 상태가 변경된 후 DOM 업데이트 보장
      console.log('isLoading 상태:', isLoading.value); // 상태 확인
    }
  };

  // 컴포넌트가 처음 마운트될 때 카테고리 데이터를 자동으로 불러옴
  onMounted(() => {
    fetchCategoryDetail();
  });

  return {
    state: {
      isLoading,
      categories,
      selectedCategory,
      modals
    },
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
