<script setup>
import {defineProps, defineEmits, computed} from "vue";
import ButtonSmallColor from "@/components/common/ButtonSmallColor.vue";
import GroupItem from "@/components/shopping-group-list/GroupItem.vue";
import BackButton from "@/components/common/BackButton.vue";

// props 정의
const props = defineProps({
  group: {
    type: Object,
    required: true,
  },
  bookmarks: {
    type: Array,
    required: true
  },
  range: {
    type: String,
    required: true
  },
  isVisible: Boolean, // 모달 표시 여부

  isClosable: {
    type: Boolean,
    default: true,  // 모달을 닫을 수 있는지 여부
  },
});

// emit 정의
const emit = defineEmits(['close', 'join', 'check']);

const closeModal = () => {
  if (props.isClosable) {
    emit('close');
  }
};

// 부모 컴포넌트로 검색 이벤트 전달
const emitCheck = (groupNum, isActive, newBookmarks) => {
  emit('check', groupNum, isActive, newBookmarks);
};

</script>

<template>
  <!-- 모달이 보일 때만 렌더링 -->
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <back-button :isModal=true @click="closeModal"/>
      <section class="top-section">

        <GroupItem :group="group" :bookmarks="bookmarks" :range="range" :buttonVisible=false @check="emitCheck"/>
      </section>

      <div class="group-content">
        <p>{{ group.jointShoppingInfo }}</p>
      </div>

      <!-- 참가 버튼 -->
      <div class="modal-footer">
        <ButtonSmallColor @click="emit('join')">모임방 참가</ButtonSmallColor>
      </div>
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
  flex-direction: column;
}

.modal-content {
  border: 1px solid #53D9C1;
  border-radius: 10px;
  align-items: center;
  background-color: #FFFFFF;
  padding: 50px;
  width: 700px;
  height: 500px;
}

.top-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #53D9C1;
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
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
  border: 1px solid #53D9C1;
  background-color: #fff;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  flex: 1;
}

.card-right-content {
  display: flex;
  border: 1px solid #53D9C1;
  background-color: #fff;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  flex: 2;
}

/* 모달 푸터 (액션 버튼들) */
.modal-footer {
  display: flex;
  justify-content: right;
}

</style>