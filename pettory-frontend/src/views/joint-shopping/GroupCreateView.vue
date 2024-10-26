<script setup>

import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth.js";
import axios from "axios";
import BackButton from "@/components/common/BackButton.vue";
import GroupForm from "@/components/joint-shopping/shopping-group/GroupForm.vue";

const router = useRouter();
const authStore = useAuthStore();

const handleGroupCreate = async (formData) => {
  const token = authStore.accessToken;

  try {
    // FormData를 서버로 전송
    await axios.post("http://localhost:8080/jointshopping/groups",
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

    await router.push(`/shoppinggroup`);

  } catch (error) {
    console.error("오류 발생:", error);
  }
};

</script>

<template>
  <main class="shopping-group-create">
    <div class="text-center">
      <BackButton/>
      <h2>모임방 생성</h2>
    </div>
    <GroupForm @submit="handleGroupCreate" />
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