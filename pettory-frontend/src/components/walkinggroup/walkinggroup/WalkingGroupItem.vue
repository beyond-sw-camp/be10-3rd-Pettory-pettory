<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  walkingGroup: {
    type: Object,
    required: true
  }
});

const router = useRouter();

const gotoWalkingGroupDetail = (id) => {
  router.push(`/walkinggroups/${id}`);
};
</script>

<template>
  <div class="item" @click="gotoWalkingGroupDetail(walkingGroup.walkingGroupId)">
    <div class="walkingGroup-details">
      <p class="walkingGroup-name">{{ walkingGroup.walkingGroupName }}</p>
      <p class="walkingGroup-userName">{{ walkingGroup.userName }}</p>
      <p class="walkingGroup-info">{{ walkingGroup.walkingGroupInfo }}</p>
      <p class="walkingGroup-maximumCount">{{ walkingGroup.walkingGroupMaximumCount }}</p>
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 20px;
  margin: 10px;
  border: 1px solid #53D9C1;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: left;
}

.item:hover {
  background-color: #f0f0f0;
}
.walkingGroup-details {
  flex: 1;
}

.walkingGroup-name, .walkingGroup-userName, .walkingGroup-info, .walkingGroup-maximumCount {
  margin: 5px 0;
}
</style>