<script setup>

import BackButton from "@/components/common/BackButton.vue";
import GroupCreateForm from "@/components/shopping-group/GroupForm.vue";
import {useRoute, useRouter} from "vue-router";
import GroupEditForm from "@/components/shopping-group/GroupForm.vue";
import GroupForm from "@/components/shopping-group/GroupForm.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import {useAuthStore} from "@/stores/auth.js";

const authStore = useAuthStore();

const router = useRouter();
// 라우터로 온 데이터 받기
const route = useRoute();
const groupData = ref(null);

// API 호출 함수 / 현재 모임방
const fetchGroup = async () => {
  try {
    const token = authStore.accessToken;
    const groupNum = route.params.id;

    const response = await axios.get(`http://localhost:8080/jointshopping/groups/${groupNum}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    groupData.value = response.data.group;
    console.log(groupData.value);

  } catch (error) {
    console.error('에러가 발생했습니다:', error);
  }
};

const handleGroupEdit = async (formData) => {
  const token = authStore.accessToken;
  const groupNum = route.params.id;

  try {
    // FormData를 서버로 전송
    await axios.put(`http://localhost:8080/jointshopping/groups/${groupNum}`,
        {
          jointShoppingGroupName: formData.jointShoppingGroupName,
          jointShoppingProducts: formData.jointShoppingProducts,
          jointShoppingInfo: formData.jointShoppingInfo,
          jointShoppingCost: formData.jointShoppingCost,
          jointShoppingGroupMaximumCount: formData.jointShoppingGroupMaximumCount,
          jointShoppingParticipationMaximumCount: formData.jointShoppingParticipationMaximumCount,
          jointShoppingCategory: formData.jointShoppingCategory,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

    await router.push(`/shoppinggroup/${groupNum}`);

  } catch (error) {
    console.error("오류 발생:", error);
  }
};

// 페이지가 마운트될 때 상품 데이터 가져오기
onMounted(() => {
  fetchGroup();
});
</script>

<template>
  <main class="shopping-group-create">
    <div class="text-center">
      <BackButton/>
      <h2>모임방 수정</h2>
    </div>
    <GroupForm @submit="handleGroupEdit"
               :initialData="groupData"/>
  </main>
</template>

<style scoped>
.shopping-group-create {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 200px;
  margin-right: 200px;
}

.text-center {
  margin-top: 50px;
  margin-bottom: 50px;
  text-align: center;
}
</style>