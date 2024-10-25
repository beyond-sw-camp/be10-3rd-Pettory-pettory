<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  registerWalkingGroup: {
    type: Object,
    required: true
  }
});

const router = useRouter();

const goToRegisterWalkingGroupDetail = (id) => {
  router.push(`/registerwalkinggroups/${id}`);
};
</script>

<template>
  <div class="item" @click="goToRegisterWalkingGroupDetail(registerWalkingGroup.registerWalkingGroupId)">
    <div class="walkingGroup-details">
      <p class="walkingGroup-name">{{ registerWalkingGroup.walkingGroupName }}</p>
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

.walkingGroup-name {
  margin: 5px 0;
}
</style>