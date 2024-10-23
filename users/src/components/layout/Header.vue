<script setup>
import {RouterLink} from "vue-router";
import ButtonSmallColor from '@/components/common/ButtonSmallColor.vue';
import {computed} from "vue";
import {useAuthStore} from "@/stores/auth.js";
import router from "@/router/router.js";

const authStore = useAuthStore();
// accessToken 이 있으면 로그인한 상태
const isLoggedIn = computed(() => !!authStore.accessToken);
const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" active-class="active" replace>펫토리로고</RouterLink>
        <a>산책모임</a>
        <a>공동구매</a>
        <a>게시판</a>
        <a>상담</a>
        <RouterLink to = "/walking-records/summary" active-class="active">산책기록</RouterLink>
        <RouterLink v-if="!isLoggedIn" to="/login" active-class="active" replace>
          <ButtonSmallColor>로그인</ButtonSmallColor>
        </RouterLink>
        <RouterLink v-if="!isLoggedIn" to="/users" active-class="active" replace>
          <ButtonSmallColor>회원가입</ButtonSmallColor>
        </RouterLink>
        <ButtonSmallColor v-if="isLoggedIn" @click="handleLogout">로그아웃</ButtonSmallColor>

      </nav>
    </div>
  </header>
</template>

<style scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    padding: 20px;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  a {
    text-decoration: none;
    color: #333;
    padding: 10px 15px;
  }
</style>