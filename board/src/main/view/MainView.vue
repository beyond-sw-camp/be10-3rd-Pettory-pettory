<template>
  <div class="main-page">
    <!-- 제목 부분 -->
    <h1>반려동물과 함께 만들어 가는 나의 이야기, 펫토리</h1>

    <!-- 모임 리스트 이미지와 텍스트 -->
    <div class="meetup-section">
      <img src="@/header/image/펫토리아이콘.png" alt="모임 이미지" class="meetup-image" />
      <div class="meetup-content">
        <h2>다른 반려동물들과 함께 만들어 가는 산책 이야기</h2>
        <p>주변 반려동물과 함께 색다른 추억을 만드는 모임을 경험해 보세요</p>

        <!-- 산책 모임 버튼 -->
        <div class="meetup-button">
          <button>산책모임</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
};
</script>

<style scoped>
.main-page {
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 30px;
}

.meetup-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.meetup-image {
  width: 300px; /* 이미지 너비 설정 */
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-right: 20px; /* 이미지와 텍스트 사이 간격 */
}

.meetup-content {
  text-align: left; /* 텍스트를 왼쪽으로 정렬 */
}

.meetup-button {
  margin-top: 20px;
}

.meetup-button button {
  background-color: #66cccc;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
}

.meetup-button button:hover {
  background-color: #55bbbb;
}

h2 {
  font-size: 1.5rem;
}

p {
  font-size: 1rem;
  color: grey;
  margin-top: 10px;
}
</style>
