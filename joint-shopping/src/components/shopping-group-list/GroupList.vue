<script setup>

import GroupItem from "@/components/shopping-group-list/GroupItem.vue";
import {ref} from "vue";
import ModalSmall from "@/components/common/ModalSmall.vue";
import GroupDetailModal from "@/components/modal/GroupDetailModal.vue";
import {useRouter} from "vue-router";

const props = defineProps({
  groups: {
    type: Array,
    required: true
  }
});

// 선택한 그룹의 정보 모달창 띄움
const isModalVisible = ref(false);
const selectedGroup = ref(null);
const groupInfo = (group) => {
  selectedGroup.value = group;
  isModalVisible.value = true;
}

// 뒤로가기로 나가기
const closeModal = () => {
  isModalVisible.value = false;
}

const router = useRouter();
const goToGroup = (id) => {
  router.push(`/shoppinggroup/${id}`);
}

</script>

<template>
  <div class="container">
    <GroupItem v-for="group in groups" :key="group.id" :group="group" @info="groupInfo(group)"/>
    <GroupDetailModal :group="selectedGroup" :isVisible="isModalVisible" @join="goToGroup(selectedGroup.id)"
                      @close="closeModal"/>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>