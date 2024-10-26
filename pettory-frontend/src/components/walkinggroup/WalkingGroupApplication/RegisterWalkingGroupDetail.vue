<script setup>
const props = defineProps({
  registerWalkingGroup: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="walking-group-detail">
    <h1>{{ registerWalkingGroup.walkingGroupName }}</h1>
    <h3 class="justify-content-end">{{ registerWalkingGroup.userName }}</h3>
  </div>
</template>

<style scoped>
.walking-group-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

h1 {
  margin-bottom: 10px;
}

p {
  margin: 10px;
}
</style>