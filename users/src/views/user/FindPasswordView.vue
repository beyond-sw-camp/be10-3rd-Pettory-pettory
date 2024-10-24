<script setup>
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import FindPasswordForm from "@/components/user/FindPasswordForm.vue";

const router = useRouter();
const userEmail = ref('');

const handleFindPasswordSubmit = async (email) => {
  try {

    const findPasswordRequest = {
      userEmail: email
    };

    const response = await axios.post('http://localhost:8080/users/passwords', findPasswordRequest);

    if (response.status === 200) {
      router.push('/login');
    }

  } catch (error) {
    console.log('오류: ', error);
  }
};

</script>

<template>
  <div class="find-password-view">
    <FindPasswordForm @submit="handleFindPasswordSubmit" />
    <RouterView />
  </div>
</template>

<style scoped>
.find-password-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>