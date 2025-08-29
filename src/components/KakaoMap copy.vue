<template>
  <div id="map" style="width: 100%; height: 350px"></div>
</template>

<script setup>
import { onMounted } from "vue";

const positions = [
  // ... (기존 positions 배열 내용)
  // 대구공항
  {
    id: "airport",
    content: `
      <div class="w-38 p-2 rounded-xl shadow-md overflow-hidden border text-center">
        <div class="bg-white px-2">
          <div class="text-pink-600 font-bold text-sm pb-1">14:00</div>
        </div>
        <div class="w-40 bg-blue-100 px-2 py-1 text-xs">
          <p class="text-blue-600 font-semibold">s사이즈 / 3개</p>
          <p class="text-black">공항 → 숙소</p>
        </div>
        <div class="px-2 py-2">
          <button onclick="window.handleOverlayOpen('airport')" class="w-full bg-red-500 text-white text-xs rounded-md py-1">시작</button>
        </div>
      </div>
    `,
    lat: 35.894219,
    lng: 128.658297,
    image: "/images/yr/marker/plain_locationR.png",
  },
  // ... (나머지 positions 배열 내용)
];

function loadKakaoMapScript() {
  const kakaoKey = import.meta.env.VITE_KAKAO_MAP_KEY;
  if (!kakaoKey) {
    console.warn("⚠️ VITE_KAKAO_MAP_KEY 환경변수가 설정되지 않았습니다.");
    return Promise.reject("Kakao Map Key missing");
  }

  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve();
    } else {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`;
      script.onload = () => window.kakao.maps.load(resolve);
      script.onerror = (e) => reject(e);
      document.head.appendChild(script);
    }
  });
}

onMounted(async () => {
  try {
    await loadKakaoMapScript();

    const kakao = window.kakao;
    const container = document.getElementById("map");
    const map = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(35.8714354, 128.601445),
      level: 8,
    });

    const overlays = {};
    let currentOverlay = null;

    window.handleOverlayOpen = (id) => {
      // 이미 열려있는 오버레이가 있다면 닫기
      if (currentOverlay) {
        currentOverlay.setMap(null);
      }
      // 클릭된 오버레이를 열고 currentOverlay에 저장
      if (overlays[id]) {
        overlays[id].setMap(map);
        currentOverlay = overlays[id];
      }
    };

    positions.forEach((pos) => {
      const markerImage = new kakao.maps.MarkerImage(
        pos.image,
        new kakao.maps.Size(40, 40)
      );
      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(pos.lat, pos.lng),
        image: markerImage,
      });

      const customOverlay = new kakao.maps.CustomOverlay({
        content: pos.content,
        position: marker.getPosition(),
        yAnchor: 1.5,
        zIndex: 3,
      });

      overlays[pos.id] = customOverlay;

      kakao.maps.event.addListener(marker, "click", () => {
        // 이미 열려있는 오버레이가 있다면 닫기
        if (currentOverlay) {
          currentOverlay.setMap(null);
        }
        // 현재 클릭된 오버레이 열기
        customOverlay.setMap(map);
        currentOverlay = customOverlay;
      });
    });
  } catch (err) {
    console.error("카카오맵 로드 중 오류 발생:", err);
  }
});
</script>
