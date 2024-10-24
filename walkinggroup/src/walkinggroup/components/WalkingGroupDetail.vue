<script setup>
const props = defineProps({
  walkingGroup: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="walking-group-detail">
    <h1>{{ walkingGroup.walkingGroupName }}</h1>
    <h3 class="justify-content-end">{{ walkingGroup.userName }}</h3>
    <p>{{ walkingGroup.walkingGroupInfo }}</p>
    <p>{{ walkingGroup.walkingGroupMaxiumCount }}</p>
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