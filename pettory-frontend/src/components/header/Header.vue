<script setup>
import {RouterLink} from "vue-router";
import ButtonSmallColor from '@/components/common/ButtonSmallColor.vue';
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import {useAuthStore} from "@/stores/auth.js";
import router from "@/router/router.js";
import SideMenuBar from "@/components/common/SideMenuBar.vue";

const authStore = useAuthStore();
const isSideMenuBarOn = ref(false); // 기본 off 상태

// accessToken 이 있으면 로그인한 상태
const isLoggedIn = computed(() => !!authStore.accessToken);
const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};

// 사이드 메뉴바의 토글을 작동시키는 메소드
const toggleSideMenuBar = () => {
  isSideMenuBarOn.value = !isSideMenuBarOn.value;
}

// // toggleSideMenuBar 메소드를 자식 컴포넌트(SideMenuBaer)에 전달
// provide("toggleSideMenuBar", toggleSideMenuBar);

// 사이드 메뉴바가 아닌 화면의 다른 부분을 클릭했을 때 사이드메뉴바를 닫는 메소드
const handleClickOutside = (event) => {
  const sideMenu = document.querySelector('.side-menubar-container');
  if (sideMenu && !sideMenu.contains(event.target)) {
    isSideMenuBarOn.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

</script>

<template>
    <div id="app">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/" active-class="active" replace>
            <img src="@/assets/image/펫토리아이콘.png" alt="펫토리 로고" />
          </RouterLink>
          <RouterLink to="/walkinggroups" active-class="active" replace>
            산책모임
          </RouterLink>
          <RouterLink to="/shoppinggroup" active-class="active" replace>
            공동구매
          </RouterLink>
          <RouterLink to="/board" active-class="active" replace>
            게시판
          </RouterLink>
          <RouterLink to="/counseling" active-class="active" replace>
            상담
          </RouterLink>

          <RouterLink v-if="!isLoggedIn" to="/login" active-class="active" replace>
            <ButtonSmallColor>로그인</ButtonSmallColor>
          </RouterLink>
          <RouterLink v-if="!isLoggedIn" to="/users" active-class="active" replace>
            <ButtonSmallColor>회원가입</ButtonSmallColor>
          </RouterLink>
          <ButtonSmallColor v-if="isLoggedIn" @click="handleLogout">로그아웃</ButtonSmallColor>

          <!-- 사이드 메뉴바 토글 버튼-->
          <img
              src="@/assets/image/density_medium.png"
              alt="side menubar icon"
              class="side-menubar"
              @click.stop="toggleSideMenuBar"
          />
        </nav>
      </div>
    </header>

      <!-- 사이드 메뉴바 -->
      <transition name="slide">
        <div
            v-if="isSideMenuBarOn"
            class="side-menubar-container"
            @click.stop
        >
          <SideMenuBar @close="toggleSideMenuBar" />
        </div>
      </transition>
  </div>
</template>

<style scoped>

  header {
    width: 100%;  /* 화면 전체 너비 차지 */
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  }
  .wrapper {
    display: flex;
    justify-content: center;
    padding: 20px;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: nowrap;  /* 화면이 줄어들어도 글씨 가로로 유지 */
  }

  a {
    white-space: nowrap;
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

  /* 사이드 메뉴바 아이콘 */
  .side-menubar {
    width: 20px;
    height: auto;
    cursor: pointer;
  }

  /* 반응형으로 조절하고 싶을 경우 */
  .side-menubar {
    max-width: 100%; /* 부모 요소에 맞춰 최대 크기를 설정 */
    height: auto; /* 높이를 자동으로 맞춤 */
  }


  /* 슬라이드 애니메이션 */
  .slide-enter-active, .slide-leave-active {
    transition: transform 0.3s ease;
  }
  .slide-enter-from {
    transform: translateX(100%);  /* 오른쪽에서 나타나기 */
  }
  .slide-leave-to {
    transform: translateX(100%);  /* 오른쪽으로 사라지기 */
  }

</style>