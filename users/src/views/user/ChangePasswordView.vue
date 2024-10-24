<script setup>
import ChangePasswordForm from "@/components/user/ChangePasswordForm.vue";
import axios from "axios";
import {useRouter} from "vue-router";

const router = useRouter();

const handleChangePasswordSubmit = async ({curPwd, newPwd}) => {
  try {
    const ChangePasswordRequest = {
      currentUserPassword: curPwd,
      newUserPassword: newPwd
    };

    const response = await axios.put('http://localhost:8080/users/passwords', ChangePasswordRequest);

    if (response.status === 200) {
      router.push('/login');
    }
  } catch (error) {
    console.log('오류', error);
  }
};
</script>

<template>
  <div class="change-password-view">
    <ChangePasswordForm @submit="handleChangePasswordSubmit" />
    <RouterView />
  </div>
</template>

<style scoped>
.change-password-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>