<template>

  <div class="cardWarp">
    <!-- 카드1 -->
  <div class="card">
    <p class="sub-title">출발지가가</p>
    <h2 class="title">공항인 경우</h2>
    <img src="/public/images/yr/page1/airplane.png" alt="비행기" class="plane-img" />

    <ul class="step-list">
      <li><span class="step-num">1</span> 예약된 픽업 시간 도착</li>
      <li><span class="step-num">2</span> 가방 전달</li>
      <li><span class="step-num">3</span> 확인 메시지 수신</li>
    </ul>

    <button class="location-btn">픽업장소 위치안내</button>
  </div>

      <!-- 카드2 -->
  <div class="card">
    <p class="sub-title">출발지가가</p>
    <h2 class="title">숙소인 경우</h2>
    <img src="/public/images/yr/page1/building.png" alt="비행기" class="plane-img" />

    <ul class="step-list">
      <li><span class="step-num">1</span> 로비 / 프론트 데스크</li>
      <li><span class="step-num">2</span> 가방 전달</li>
      <li><span class="step-num">3</span> 고객 직접 전달 가능</li>
    </ul>

    <!-- <button class="location-btn">픽업장소 위치안내</button> -->
  </div>

      <!-- 카드3 -->
  <div class="card">
    <p class="sub-title">출발지가가</p>
    <h2 class="title">기차인 경우</h2>
    <img src="/public/images/yr/page1/subway.png" alt="비행기" class="plane-img" />

    <ul class="step-list">
      <li><span class="step-num">1</span> 지정된 출구 / 대기장소</li>
      <li><span class="step-num">2</span> 가방 전달</li>
      <li><span class="step-num">3</span> 도착 후 직원 연락</li>
    </ul>

    <button class="location-btn">픽업장소 위치안내</button>
  </div>
  </div>
</template>

<script setup>
// 별도 로직 없음
</script>

<style scoped>
.cardWarp{
  display: flex;
  gap: 30px;
}
.card {
  width: 380px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.sub-title {
  font-size: 18px;
  color: #6b7280;
  margin-bottom: 4px;
}

.title {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 16px;
}

.plane-img {
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin: 0 auto 16px;
}

.step-list {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
  text-align: left;
  padding-left: 60px;
}

.step-list li {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #374151;
  font-size: 18px;
  font-weight: 450;
}

.step-num {
  width: 24px;
  height: 24px;
  background: #a7a7a7;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 500;
  margin-right: 20px;
  color: #ffffff;
}

.location-btn {
  padding: 8px 16px;
  border-radius: 9999px;
  background-color: #279BF4;
  color: white;
  font-size: 15px;
  font-weight: 500;
  border: none;
  cursor: pointer;
    margin-top: 5px;
}

.location-btn:hover {
  background-color: #279BF4;

}
</style>
