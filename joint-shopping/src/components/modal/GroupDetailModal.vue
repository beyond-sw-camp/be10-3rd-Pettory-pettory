<script setup>

import BackButton from "@/components/common/BackButton.vue";
import SearchBar from "@/components/shopping-group/SearchBar.vue";
import GroupList from "@/components/shopping-group/GroupList.vue";
import {defineEmits} from "vue";

const props = defineProps({
  group: {
    type: Object,
    required: true,
  }
});

const emit = defineEmits(['join']);

const joinGroup = () => {
  emit('join');
};

</script>

<template>
  <div class="shopping-group-modal">
    <BackButton/>

  </div>
</template>

<style scoped>
.shopping-group-modal {

}
</style>