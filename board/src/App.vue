 게시판 카테고리
<template>
  <div>
    <CategoryList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CategoryList from './components/CategoryList.vue';

export default defineComponent({
  components: {
    CategoryList
  }
});
</script>

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
