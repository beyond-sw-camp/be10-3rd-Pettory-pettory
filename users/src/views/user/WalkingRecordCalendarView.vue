<script setup>
import 'v-calendar/style.css';
import {ref, onMounted, watch} from 'vue';
import axios from 'axios';
import {useRoute} from "vue-router";
import {useAuthStore} from "@/stores/auth.js";

// Pinia 스토어
const authStore = useAuthStore();

// 현재 날짜로 기본 값 설정
const today = new Date();
const year = ref(today.getFullYear());
const month = ref(today.getMonth() + 1);

// url 의 쿼리 파라미터
// const route = useRoute();

const pets = ref([]); // 반려동물 목록
const selectedPet = ref(null);  // 산책 기록
const selectedFilterType = ref('all');

const totalDuration = ref(0); // 이달의 총 산책 시간
const walkingRecords = ref([]); // 산책 기록

// 산책 기록을 가져오는 메소드
const fetchWalkingRecords = async () => {
  try {
    const token = authStore.accessToken;
    if (!token) return;

    const response = await axios.get('http://localhost:8080/walking-records/summary', {
      params: { year: year.value, month: month.value, filterType: selectedFilterType.value },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data.result;
    pets.value = data.pets; // 반려동물 목록 설정
    walkingRecords.value = data.summaries; // 산책 기록 설정

    // 선택된 반려동물이 없을 경우 반려동물 목록 중 첫 번째 반려동물을 기본 값으로 선택
    if (!selectedPet.value && pets.value.length > 0) {
      selectedPet.value = pets.value[0].petId;
    }

    // 선택된 반려동물의 총 산책 시간 계산
    calculateTotalDurationPerPet();


  } catch (error) {
    console.error('산책 기록을 불러오는 중 에러가 발생했습니다:', error);
  }
};

// 선택된 반려동물의 총 산책 시간을 계산하는 함수
const calculateTotalDurationPerPet = () => {
  totalDuration.value = walkingRecords.value
      .filter(record => Number(record.petId) === Number(selectedPet.value)) // petId를 숫자로 변환하여 비교
      .reduce((sum, record) => sum + record.walkingRecordDuration, 0); // 합산
};


// 선택된 반려동물이 변경되었을 때 호출되는 함수
const handlePetChange = () => {
  fetchWalkingRecords(); // 선택된 반려동물에 따라 다시 데이터 가져오기
};

// 페이지 로드 시 산책 기록 API 호출
onMounted(() => {
  fetchWalkingRecords();
});

// 날짜 변경 시 산책 기록을 다시 가져오는 메소드
const changeDate = ({year: newYear, month: newMonth}) => {
  console.log('changeDate 호출:', changeDate);
  year.value = newYear;
  month.value = newMonth;
  fetchWalkingRecords();
};

// 반려동물 선택 변경 시 다시 산책 기록을 가져옴
watch(selectedPet, handlePetChange);

</script>

<template>
  <div class="calendar-container">

    <!-- 반려동물 목록 (산책 기록에서 가져온 반려동물 표시) -->
    <div class="pet-selection">
      <label for="pet-select">반려동물 선택:</label>
      <select id="pet-select" v-model="selectedPet" @change="handlePetChange" class="combo-box">
        <option v-for="pet in pets" :key="pet.petId" :value="pet.petId">{{ pet.petName }}</option>
      </select>
    </div>

    <!-- 필터 타입 선택 -->
    <div class="filter-selection">
      <label>기록 필터:</label>
      <div>
        <label>
          <input type="radio" value="all" v-model="selectedFilterType" @change="fetchWalkingRecords" />
          모두
        </label>
        <label>
          <input type="radio" value="self" v-model="selectedFilterType" @change="fetchWalkingRecords" />
          나
        </label>
        <label>
          <input type="radio" value="family" v-model="selectedFilterType" @change="fetchWalkingRecords" />
          가족
        </label>
      </div>
    </div>

    <!-- 이달의 총 산책 시간 -->
    <div class="total-duration">
      이 달의 {{ selectedPet ? pets.find(pet => pet.petId === selectedPet)?.petName : '모든 반려동물' }} 산책 시간: {{ totalDuration }}분
    </div>

    <!-- v-calendar (기본 달력) -->
    <v-calendar
        is-expanded
        :weekdays="['월', '화', '수', '목', '금', '토', '일']"
        @month-changed="changeDate"
    />


  </div>
</template>

<style scoped>
.calendar-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.pet-selection,
.filter-selection {
  margin-bottom: 15px;
}

.pet-selection label,
.filter-selection label {
  margin-right: 10px;
}

.total-duration {
  margin-top: 20px;
  font-weight: bold;
  color: #2c7a7b;
  text-align: center;
}

.combo-box {
  padding: 8px;
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  outline: none;
  appearance: none;
}

.filter-selection div {
  display: flex;
  gap: 10px;
}
</style>