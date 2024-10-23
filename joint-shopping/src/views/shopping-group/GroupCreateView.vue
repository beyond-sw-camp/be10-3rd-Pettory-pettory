<script setup>

import BackButton from "@/components/common/BackButton.vue";
import GroupCreateForm from "@/components/shopping-group/GroupCreateForm.vue";
import {useRouter} from "vue-router";

const router = useRouter();

// const handleProductCreate = async (formData) => {
//   try {
//     // FormData를 서버로 전송
//     await axios.post("http://localhost:8080/api/v1/products", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//
//     // 상품 등록이 완료되면 목록 페이지로 이동
//     router.push("/products");
//   } catch (error) {
//     console.error("상품 등록 중 오류 발생:", error);
//   }
// };

</script>

<template>
  <main class="shopping-group-create">
    <div class="text-center">
      <BackButton/>
      <h2>모임방 생성</h2>
      <GroupCreateForm @submit="handleProductCreate" />
    </div>
  </main>
</template>

<style scoped>
.shopping-group-create {
  display: flex;
  flex-direction: column;
  margin-left: 200px;
  margin-right: 200px;
}

.text-center {
  margin-top: 50px;
  margin-bottom: 50px;
  text-align: center;
}
</style>