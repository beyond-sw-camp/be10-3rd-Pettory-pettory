<script setup>


import WalkingGroupRecordItem from "@/components/walkinggroup/WalkingGroupApplication/WalkingGroupRecordItem.vue";

const props = defineProps({
  walkingGroupRecord: {
    type:Array,
    required: true
  }
});

</script>

<template>
  <div class="container">
    <WalkingGroupRecordItem
        v-for="walkingGroupRecord in walkingGroupRecord"
        :key="walkingGroupRecord.walkingGroupRecordId" :walkingGroupRecord="walkingGroupRecord"/>
  </div>
</template>

<style scoped>
.container {
  display : flex;
  flex-direction: column;
}
</style>