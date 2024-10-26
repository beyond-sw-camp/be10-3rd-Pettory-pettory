<script setup>

import WalkingGroupApplicationItem
  from "@/components/walkinggroup/WalkingGroupApplication/WalkingGroupApplicationItem.vue";

const props = defineProps({
  walkingGroupApplications: {
    type: Array,
    required: true
  }
});

const emit = defineEmits([
    'handleApplicationClick'
]);

const handleApplicationClick = (walkingGroupApplicationId, action) => {
  emit('handleApplicationClick', walkingGroupApplicationId, action)
};
</script>

<template>
  <div class="container">
    <WalkingGroupApplicationItem
        v-for="walkingGroupApplication in walkingGroupApplications"
        :key="walkingGroupApplication.walkingGroupApplicationId"
        :walkingGroupApplication="walkingGroupApplication"
      @handleApplicationClick="handleApplicationClick"
    />
  </div>
</template>

<style scoped>
.container {
  display : flex;
  flex-direction: column;
}
</style>