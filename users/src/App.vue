<script setup>
import {RouterLink, RouterView} from "vue-router";
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
        <RouterLink to="/login" active-class="active" replace class="button">로그인</RouterLink>
        <RouterLink to="/users" active-class="active" replace class="button">회원가입</RouterLink>
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
  gap: 20px;
}

a, .button {
  text-decoration: none;
  color: #333;
  padding: 10px 15px;
}

.button {
  background-color: #cccccc;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  background-color: #66cccc;
}
</style>
