<template>
  <div class="main-page">
    <!-- 제목 부분 -->
    <h1>반려동물과 함께 만들어 가는 나의 이야기, 펫토리</h1>

    <!-- 산책 모임 -->
    <div class="meetup-section">
      <img src="@/components/layout/image/펫토리아이콘.png" alt="모임 이미지" class="meetup-image" />
      <div class="meetup-content">
        <h2>다른 반려동물들과 함께 만들어 가는 산책 이야기</h2>
        <p>주변 반려동물과 함께 색다른 추억을 만드는 모임을 경험해 보세요</p>

        <!-- 산책 모임 버튼 -->
        <div class="meetup-button">
          <button>산책모임</button>
        </div>
      </div>
    </div>
    <!-- 공동 구매 -->
    <div class="buy-section">
      <div class="buy-content">
        <h2>주변 사람들과 함께 물건 구매하기</h2>
        <p>주변 사람들과 함께 나의 반려동물을 위한 물건을 구매해보세요</p>

        <!-- 공동 구매 버튼 -->
        <div class="buy-button">
          <button>공동구매</button>
        </div>
      </div>
      <img src="@/components/layout/image/펫토리아이콘.png" alt="모임 이미지" class="buy-image" />

    </div>

    <!-- 게시판 -->
    <div class="board-section">
      <img src="@/components/layout/image/펫토리아이콘.png" alt="모임 이미지" class="board-image" />
      <div class="board-content">
        <h2>여러 사람들과 나누는 나의 이야기</h2>
        <p>나와 반려동물의 즐거운 추억을 다른 사람들과 공유해보세요</p>

        <!-- 게시판 버튼 -->
        <div class="board-button">
          <RouterLink to="/board" active-class="active" replace>
            <button>게시판</button>
          </RouterLink>
        </div>
      </div>
    </div>
    <!-- 상담 -->
    <div class="counseling-section">
      <div class="counseling-content">
        <h2>나의 반려동물에 대한 고민이 있다면?</h2>
        <p>질문을 남겨보세요 수의사들이 직접 답변해줍니다</p>

        <!-- 상담 버튼 -->
        <div class="counseling-button">
          <RouterLink to="/counseling" active-class="active" replace>
            <button>상담</button>
          </RouterLink>
        </div>
      </div>
      <img src="@/components/layout/image/펫토리아이콘.png" alt="모임 이미지" class="counseling-image" />

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

.buy-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.buy-image {
  width: 300px; /* 이미지 너비 설정 */
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-left: 20px; /* 이미지와 텍스트 사이 간격 */
}

.buy-content {
  text-align: right; /* 텍스트를 왼쪽으로 정렬 */
}

.buy-button {
  margin-top: 20px;
}

.buy-button button {
  background-color: #66cccc;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
}

.buy-button button:hover {
  background-color: #55bbbb;
}

.board-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.board-image {
  width: 300px; /* 이미지 너비 설정 */
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-right: 20px; /* 이미지와 텍스트 사이 간격 */
}

.board-content {
  text-align: left; /* 텍스트를 왼쪽으로 정렬 */
}

.board-button {
  margin-top: 20px;
}

.board-button button {
  background-color: #66cccc;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
}

.board-button button:hover {
  background-color: #55bbbb;
}

.counseling-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.counseling-image {
  width: 300px; /* 이미지 너비 설정 */
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-left: 20px; /* 이미지와 텍스트 사이 간격 */
}

.counseling-content {
  text-align: right; /* 텍스트를 왼쪽으로 정렬 */
}

.counseling-button {
  margin-top: 20px;
}

.counseling-button button {
  background-color: #66cccc;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
}

.counseling-button button:hover {
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

