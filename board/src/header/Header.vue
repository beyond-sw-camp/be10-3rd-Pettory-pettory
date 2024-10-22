<script setup>
import {RouterLink} from "vue-router";
import ButtonSmallColor from '@/category/components/ButtonSmallColor.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" active-class="active" replace>펫토리로고</RouterLink>
        <a>산책모임</a>
        <a>공동구매</a>
        <RouterLink to="/board" active-class="active" replace>게시판</RouterLink>
        <a>상담</a>
        <RouterLink to="/login" active-class="active" replace>
          <ButtonSmallColor>로그인</ButtonSmallColor>
        </RouterLink>
        <RouterLink to="/users" active-class="active" replace>
          <ButtonSmallColor>회원가입</ButtonSmallColor>
        </RouterLink>
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