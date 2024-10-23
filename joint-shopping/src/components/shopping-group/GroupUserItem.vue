<script setup>

import ButtonSmallColor from "@/components/common/ButtonSmallColor.vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

// emit 정의
const emit = defineEmits(['info']);

</script>

<template>
  <div class="user-item">
    <span>{{ user.name }}</span>
    <div >
      <ButtonSmallColor class="info-btn" >강퇴</ButtonSmallColor>
      <ButtonSmallColor class="info-btn" @click="emit('info')" >정보보기</ButtonSmallColor>
    </div>

  </div>

</template>

<style scoped>
.user-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.info-btn {
  background-color: #FFFFFF;
  color: #000000;
  border: 1px solid #53D9C1;
  margin-left: 20px;
}
</style>