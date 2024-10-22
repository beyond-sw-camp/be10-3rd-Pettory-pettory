<script setup lang="ts">
import Header from "@/header/Header.vue";
import CategoryList from './view/CategoryList.vue';

</script>


 <template>
  <div>

    <Header />
    <router-view></router-view>
    <router-link to="/board/category">카테고리 보기</router-link>
  </div>
</template>


<style>
/* 전역 스타일을 여기에 추가 */
</style>

<!-- App.vue -->
<!--<template>-->
<!--  <div id="app">-->
<!--    &lt;!&ndash; 작성한 게시판 컴포넌트 표시 &ndash;&gt;-->
<!--    <Board/>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  import Board from './components/Board.vue';  -->

<!--export default {-->
<!--  name: 'App',-->
<!--  components: {-->
<!--    Board,-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style>-->
<!--/* 기본 스타일 설정 */-->
<!--#app {-->
<!--  font-family: Avenir, Helvetica, Arial, sans-serif;-->
<!--  -webkit-font-smoothing: antialiased;-->
<!--  -moz-osx-font-smoothing: grayscale;-->
<!--  text-align: center;-->
<!--  color: #2c3e50;-->
<!--  margin-top: 60px;-->
<!--}-->
<!--</style>-->
