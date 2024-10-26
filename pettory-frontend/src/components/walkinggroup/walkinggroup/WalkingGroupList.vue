<script setup>

import WalkingGroupItem from "@/components/walkinggroup/walkinggroup/WalkingGroupItem.vue";

const props = defineProps({
  walkinggroups: {
    type:Array,
    required: true
  }
});
</script>

<template>
  <div class="container">
    <WalkingGroupItem v-for="walkingGroup in walkinggroups" :key="walkingGroup.walkingGroupId" :walkingGroup="walkingGroup" />
  </div>
</template>

<style scoped>
  .container {
    display : flex;
    flex-direction: column;
  }
</style>