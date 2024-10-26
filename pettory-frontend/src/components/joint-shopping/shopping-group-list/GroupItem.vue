<script setup>
import ButtonSmallColor from "@/components/common/ButtonSmallColor.vue";
import {ref} from "vue";

const props = defineProps({
  group: {
    type: Object,
    required: true,
  },
  bookmarks: {
    type: Array,
    required: true
  },
  range:{
    type: String,
    required: true
  },
  buttonVisible: {
    type: Boolean,
    default: true,
  }
});

// emit 정의
const emit = defineEmits(['info', 'check']);

const newBookmarks = ref([...props.bookmarks]); // props로 받아온 bookmarks

// 그룹이 즐겨찾기된 상태인지 확인하는 함수
const isBookmark = (groupNum) => {
  return newBookmarks.value.includes(groupNum);
};

// 즐겨찾기 토글 함수
const toggleClass = (groupNum) => {
  const isActive = ref(false);

  if (isBookmark(groupNum)) {
    // 즐겨찾기 해제: 해당 그룹 ID를 배열에서 제거
    newBookmarks.value = newBookmarks.value.filter(id => id !== groupNum);
    isActive.value = false;
  } else {
    // 즐겨찾기 추가: 해당 그룹 ID를 배열에 추가
    newBookmarks.value.push(groupNum);
    isActive.value = true;
  }

  // 북마크 추가
  emit('check', groupNum, isActive.value, newBookmarks.value);
};

</script>

<template>
  <!-- 모임 카드 리스트 -->
  <section class="group-list">
    <div class="group-card">
      <!-- 카드 내용 -->
      <div class="card-left-content">
        <!-- 참여 가능 태그 -->
        <div :class="(group.jointShoppingGroupState === 'APPLICATION') ? 'circle-application' : 'circle-close'">
          <span v-if="(group.jointShoppingGroupState === 'APPLICATION')">참가가능</span>
          <span v-else > 마감 </span>
        </div>
        <!-- 모임 설명 -->
        <div>
          <p class="group-title">{{ group.jointShoppingGroupName }}</p>
          <p class="group-details">물품: <strong>{{ group.jointShoppingProducts }}</strong> | 최대 참가자 수:
            {{ group.jointShoppingParticipationMaximumCount }}명</p>
          <p class="group-details">가격: {{ group.jointShoppingCost }}원 | 최대 인원 수: {{
              group.jointShoppingGroupMaximumCount
            }}명</p>
        </div>
      </div>
      <!-- 작성일 -->
      <div class="card-right-content">
        <ButtonSmallColor class="group-join-button" @click="emit('info')" v-if="buttonVisible">
          {{ (range === 'participation' ) ? '입장' : '참가' }}
        </ButtonSmallColor>
        <span class="group-date">작성일: {{ group.jointShoppingGroupInsertDatetime }}</span>
          <svg :class="isBookmark(group.jointShoppingGroupNum) ? 'active-icon' : 'non-active-icon'"
               @click="toggleClass(group.jointShoppingGroupNum)" >
          <use xlink:href="#icon-bookmark">
            <symbol id="icon-bookmark" viewBox="0 0 32 32">
              <path d="M6 0v32l10-10 10 10v-32z"></path>
            </symbol>
          </use>
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 일반 CSS 사용 */
.group-list {
  margin-top: 24px;
  width: 100%;
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

.circle-application {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px; /* 동그라미의 너비 */
  height: 75px; /* 동그라미의 높이 (너비와 같아야 함) */
  background-color: #a8e4e3; /* 동그라미의 배경색 */
  border-radius: 50%; /* 동그라미를 만드는 핵심 */
  margin-left: 20px;
}

.circle-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px; /* 동그라미의 너비 */
  height: 75px; /* 동그라미의 높이 (너비와 같아야 함) */
  background-color: #FCB3AD; /* 동그라미의 배경색 */
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

.group-date {
  font-size: 0.875rem;
  color: #718096;
  margin-right: 25px;
  margin-left: 25px;
}

.non-active-icon {
  display: inline-block;
  width: 50px;
  height: 50px;
  stroke-width: 1px;
  stroke: #53D9C1;
  fill: #ffffff;
}

.active-icon {
  display: inline-block;
  width: 50px;
  height: 50px;
  stroke-width: 1px;
  stroke: #53D9C1;
  fill: #53D9C1; /* 활성화 시 색상 변경 */
}

</style>