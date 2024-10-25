<script setup>
import RegisterWalkingGroupItem from "@/WalkingGroupApplication/components/RegisterWalkingGroupItem.vue";

const props = defineProps({
  registerWalkingGroups: {
    type:Array,
    required: true
  }
});
</script>

<template>
  <div class="container">
    <RegisterWalkingGroupItem
        v-for="registerWalkingGroup in registerWalkingGroups"
        :key="registerWalkingGroup.registerWalkingGroupId" :registerWalkingGroup="registerWalkingGroup" />
  </div>
</template>

<style scoped>
.container {
  display : flex;
  flex-direction: column;
}
</style>