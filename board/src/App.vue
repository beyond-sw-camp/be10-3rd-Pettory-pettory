<script setup lang="ts">
import Header from "@/header/Header.vue";
import CategoryList from './category/view/CategoryListView.vue';

</script>


 <template>
  <div>

    <Header />
    <router-view></router-view>
  </div>
</template>


<style>
/* 전역 스타일을 여기에 추가 */
</style>

