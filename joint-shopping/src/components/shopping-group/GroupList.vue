<script setup>

import GroupItem from "@/components/shopping-group/GroupItem.vue";

const props = defineProps({
  groups: {
    type: Array,
    required: true
  }
});

</script>

<template>
  <div class="container">
   <GroupItem v-for="group in groups" :key="group.groupId" :group="group" />
  </div>
</template>

<style scoped>
  .container {
    display : flex;
    flex-direction: column;
  }
</style>