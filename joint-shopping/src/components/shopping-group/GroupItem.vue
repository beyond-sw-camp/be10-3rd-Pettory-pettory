<script setup>
import {useRouter} from "vue-router";
import ButtonLongColor from "@/components/common/ButtonLongColor.vue";
import ButtonSmallColor from "@/components/common/ButtonSmallColor.vue";

const props = defineProps({
  group: {
    type: Object,
    required: true,
  }
});

const joinGroup = () => {

}


// 검색 조건이 변경될 때마다 API 호출
const onSearch = (searchParams) => {
  state.groups.title = searchParams.searchData;
  // fetchProducts(1);  // 페이지를 1로 초기화하고 다시 호출 // 검색 기능 라우터 이후에 구현 악시오스 이용
};
</script>

<template>
  <!-- 모임 카드 리스트 -->
  <section class="group-list">
    <div class="group-card">
      <!-- 카드 내용 -->
      <div class="card-left-content">
        <!-- 참여 가능 태그 -->
        <span class="badge">참가 가능</span>
        <!-- 모임 설명 -->
        <div>
          <p class="group-title">{{ group.title }}</p>
          <p class="group-details">물품: <strong>{{ group.item }}</strong> | 참가 수: {{ group.participants }}명</p>
          <p class="group-details">가격: {{ group.price }}원 | 최대인원: {{ group.maxParticipants }}명</p>
        </div>
      </div>
      <!-- 작성일 -->
      <div class="card-right-content">
        <ButtonSmallColor class="group-join-button" @click="joinGroup" :group="group">참가</ButtonSmallColor>
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

.badge {
  background-color: #BCFCFF;
  color: #285e61;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 600;
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