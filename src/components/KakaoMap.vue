<template>
  <div id="map" style="width: 100%; height: 350px"></div>
</template>

<script setup>
import { onMounted } from "vue";

const positions = [
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
  // 기차역 1
  {
    id: "station-1",
    content: `
      <div class="w-38 p-2 rounded-xl shadow-md overflow-hidden border text-center">
        <div class="bg-white px-2">
          <div class="text-pink-600 font-bold text-sm pb-1">11:00</div>
        </div>
        <div class="w-40 bg-blue-100 px-2 py-1 text-xs">
          <p class="text-blue-600 font-semibold">s사이즈 / 3개</p>
          <p class="text-black">공항 → 숙소</p>
        </div>
        <div class="px-2 py-2">
          <button onclick="window.handleOverlayOpen('station-1')" class="w-full bg-red-500 text-white text-xs rounded-md py-1">시작</button>
        </div>
      </div>
    `,
    lat: 35.880407,
    lng: 128.62818,
    image: "/images/yr/marker/subway_locationG.png",
  },
  // 기차역 2
  {
    id: "station-2",
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
          <button onclick="window.handleOverlayOpen('station-2')" class="w-full bg-red-500 text-white text-xs rounded-md py-1">시작</button>
        </div>
      </div>
    `,
    lat: 35.874107,
    lng: 128.594238,
    image: "/images/yr/marker/subway_locationR.png",
  },
  // 기차역 3
  {
    id: "station-3",
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
          <button onclick="window.handleOverlayOpen('station-3')" class="w-full bg-red-500 text-white text-xs rounded-md py-1">시작</button>
        </div>
      </div>
    `,
    lat: 35.871598,
    lng: 128.528478,
    image: "/images/yr/marker/subway_locationG.png",
  },
  // 내위치
  {
    id: "my-location",
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
          <button onclick="window.handleOverlayOpen('my-location')" class="w-full bg-red-500 text-white text-xs rounded-md py-1">시작</button>
        </div>
      </div>
    `,
    lat: 35.8695,
    lng: 128.594,
    image: "/images/yr/marker/myLocation.png",
  },
  // 유천초등학교
  {
    id: "school-1",
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
          <button onclick="window.handleOverlayOpen('school-1')" class="w-full bg-red-500 text-white text-xs rounded-md py-1">시작</button>
        </div>
      </div>
    `,
    lat: 35.8121469,
    lng: 128.5123098,
    image: "/images/yr/marker/house_loactionR.png",
  },
  // 월촌중학교
  {
    id: "school-2",
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
          <button onclick="window.handleOverlayOpen('school-2')" class="w-full bg-red-500 text-white text-xs rounded-md py-1">시작</button>
        </div>
      </div>
    `,
    lat: 35.8275,
    lng: 128.5402,
    image: "/images/yr/marker/house_loactionR.png",
  },
  // 수성야구장
  {
    id: "stadium",
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
          <button onclick="window.handleOverlayOpen('stadium')" class="w-full bg-red-500 text-white text-xs rounded-md py-1">시작</button>
        </div>
      </div>
    `,
    lat: 35.8245,
    lng: 128.6875,
    image: "/images/yr/marker/house_locationG.png",
  },
  // 사수초등학교
  {
    id: "school-3",
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
          <button onclick="window.handleOverlayOpen('school-3')" class="w-full bg-red-500 text-white text-xs rounded-md py-1">시작</button>
        </div>
      </div>
    `,
    lat: 35.9415,
    lng: 128.5482,
    image: "/images/yr/marker/house_locationG.png",
  },
  // 대구공업고등학교
  {
    id: "school-4",
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
          <button onclick="window.handleOverlayOpen('school-4')" class="w-full bg-red-500 text-white text-xs rounded-md py-1">시작</button>
        </div>
      </div>
    `,
    lat: 35.8947,
    lng: 128.6102,
    image: "/images/yr/marker/house_locationG.png",
  },
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
      script.onerror = () => reject("Kakao Map SDK 로드 실패");
      document.head.appendChild(script);
    }
  });
}


onMounted(async () => {
  try {
    await loadKakaoMapScript(); // ✅ 스크립트가 로드될 때까지 대기

    const kakao = window.kakao;
    const container = document.getElementById("map");
    const map = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(35.8714354, 128.601445),
      level: 8,
    });

    const overlays = {};

    window.handleOverlayOpen = (id) => {
      Object.values(overlays).forEach((ov) => ov.setMap(null));
      if (overlays[id]) overlays[id].setMap(map);
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
        Object.values(overlays).forEach((ov) => ov.setMap(null));
        customOverlay.setMap(map);
      });
    });
  } catch (err) {
    console.error(err); // ✅ 오류 확인용 콘솔
  }
});
</script>
