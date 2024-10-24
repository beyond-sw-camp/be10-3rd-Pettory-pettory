<script setup>
import WalkingGroupApplicationItem from "@/walkingGroupAplication/components/WalkingGroupApplicationItem.vue";

const props = defineProps({
  walkinggroupApplications: {
    type:Array,
    required: true
  }
});
</script>

<template>
  <div class="container">
    <WalkingGroupApplicationItem
        v-for="walkingGroupApplication in walkinggroupApplications"
        :key="walkingGroupApplication.walkingGroupApplicationId" :walkingGroupApplication="walkingGroupApplication"  walking-group-applications=""/>
  </div>
</template>

<style scoped>
.container {
  display : flex;
  flex-direction: column;
}
</style>