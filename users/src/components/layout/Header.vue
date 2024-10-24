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
        <RouterLink to="/" active-class="active" replace>
          <img src="@/assets/image/펫토리아이콘.png" alt="펫토리 로고" />
        </RouterLink>
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
        <RouterLink v-if="isLoggedIn" to = "/users/email" active-class="active">마이페이지</RouterLink>
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

  /* 이미지 스타일링 */
  img {
    width: 100px; /* 너비를 150px로 고정 */
    height: auto; /* 비율을 유지하면서 높이 자동 조정 */
  }

  /* 반응형으로 조절하고 싶을 경우 */
  img {
    max-width: 100%; /* 부모 요소에 맞춰 최대 크기를 설정 */
    height: auto; /* 높이를 자동으로 맞춤 */
  }
</style>