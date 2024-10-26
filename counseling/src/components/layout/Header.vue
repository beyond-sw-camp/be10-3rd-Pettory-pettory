<script setup>
import {RouterLink} from "vue-router";
import ButtonSmallColor from '@/components/common/ButtonSmallColor.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" active-class="active" replace>
          <img src="@/components/layout/image/펫토리아이콘.png" alt="펫토리 로고" />
        </RouterLink>
        <a>산책모임</a>
        <a>공동구매</a>
        <RouterLink to="/board" active-class="active" replace>게시판</RouterLink>
        <RouterLink to="/counseling" active-class="active" replace>상담</RouterLink>
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

