<script setup>
import {defineProps, defineEmits} from "vue";
import ButtonSmallColor from "@/components/common/ButtonSmallColor.vue";
import GroupItem from "@/components/shopping-group-list/GroupItem.vue";
import BackButton from "@/components/common/BackButton.vue";

// props 정의
const props = defineProps({
  group: {
    type: Object,
    required: true,
  },
  isVisible: Boolean, // 모달 표시 여부

  isClosable: {
    type: Boolean,
    default: true,  // 모달을 닫을 수 있는지 여부
  },
});

// emit 정의
const emit = defineEmits(['close', 'join']);

const closeModal = () => {
  if (props.isClosable) {
    emit('close');
  }
};

</script>

<template>
  <!-- 모달이 보일 때만 렌더링 -->
  <div v-if="isVisible" class="modal-overlay" >

    <back-button @click="closeModal" />

    <GroupItem :group="group" :buttonVisible=false />

    <div class="group-content">
      <div class="card-left-content">
        <img :src="group.img" :alt="없넹">
      </div>
      <div class="card-right-content">
        <span>{{ group.contents }}</span>
      </div>
    </div>

    <!-- 참가 버튼 -->
    <div class="modal-footer">
      <ButtonSmallColor @click="emit('join')" >모임방 참가</ButtonSmallColor>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 일반 CSS 사용 */
.group-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  transition: box-shadow 0.3s;
  border: 1px solid #53D9C1;
}

.card-left-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.card-right-content {
  display: flex;
  align-items: center;
}

/* 모달 푸터 (액션 버튼들) */
.modal-footer {
  display: flex;
  justify-content: right;
}

</style>