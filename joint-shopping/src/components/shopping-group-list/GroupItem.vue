<script setup>
import {useRouter} from "vue-router";
import ButtonLongColor from "@/components/common/ButtonLongColor.vue";
import ButtonSmallColor from "@/components/common/ButtonSmallColor.vue";

const props = defineProps({
  group: {
    type: Object,
    required: true,
  },
  buttonVisible: {
    type: Boolean,
    default: true,
  }
});

// emit 정의
const emit = defineEmits(['info']);

</script>

<template>
  <!-- 모임 카드 리스트 -->
  <section class="group-list">
    <div class="group-card">
      <!-- 카드 내용 -->
      <div class="card-left-content">
        <!-- 참여 가능 태그 -->
        <div class="circle">
          <span>참가가능</span>
        </div>
        <!-- 모임 설명 -->
        <div>
          <p class="group-title">{{ group.title }}</p>
          <p class="group-details">물품: <strong>{{ group.item }}</strong> | 참가 수: {{ group.participants }}명</p>
          <p class="group-details">가격: {{ group.price }}원 | 최대인원: {{ group.maxParticipants }}명</p>
        </div>
      </div>
      <!-- 작성일 -->
      <div class="card-right-content">
        <ButtonSmallColor class="group-join-button" @click="emit('info')" v-if="buttonVisible">참가
        </ButtonSmallColor>
        <span class="group-date">작성일: {{ group.date }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 일반 CSS 사용 */
.group-list {
  margin-top: 24px;
}

.group-card {
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

.group-card:hover {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.card-left-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px; /* 동그라미의 너비 */
  height: 75px; /* 동그라미의 높이 (너비와 같아야 함) */
  background-color: #a8e4e3; /* 동그라미의 배경색 */
  border-radius: 50%; /* 동그라미를 만드는 핵심 */
  margin-left: 20px;
}

.group-title {
  font-size: 1.125rem;
  font-weight: 600;
}

.group-details {
  font-size: 0.875rem;
  color: #4a5568;
}

.card-right-content {
  display: flex;
  align-items: center;
}

.group-join-button {
  margin-right: 25px;
}

.group-date {
  font-size: 0.875rem;
  color: #718096;
}

</style>