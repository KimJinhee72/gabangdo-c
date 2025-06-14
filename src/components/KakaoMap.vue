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
  // 기차역
  {
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
          <button onclick="window.handleOverlayOpen('airport')" class="w-full bg-red-500 text-white text-xs rounded-md py-1">시작</button>
        </div>
      </div>
    `,
    lat: 35.880407,
    lng: 128.62818,
    image: "/images/yr/marker/subway_locationG.png",
  },
  // 기차역
  {
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
    lat: 35.874107,
    lng: 128.594238,
    image: "/images/yr/marker/subway_locationR.png",
  },
  // 기차역
  {
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
    lat: 35.871598,
    lng: 128.528478,
    image: "/images/yr/marker/subway_locationG.png",
  },
  // 내위치
  {
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
    lat: 35.8695,
    lng: 128.594,
    image: "/images/yr/marker/myLocation.png",
  },
  // 유천초등학교
  {
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
    content: "<div>숙소</div>",
    lat: 35.8121469,
    lng: 128.5123098,
    image: "/images/yr/marker/house_loactionR.png",
  },
  // 월촌중학교
  {
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
    content: "<div>숙소</div>",
    lat: 35.8275,
    lng: 128.5402,
    image: "/images/yr/marker/house_loactionR.png",
  },
  // 수성야구장
  {
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
    content: "<div>숙소</div>",
    lat: 35.8245,
    lng: 128.6875,
    image: "/images/yr/marker/house_locationG.png",
  },
  // 사수초등학교
  {
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
    content: "<div>숙소</div>",
    lat: 35.9415,
    lng: 128.5482,
    image: "/images/yr/marker/house_locationG.png",
  },
  // 대구공업고등학교
  {
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
    content: "<div>숙소</div>",
    lat: 35.8947,
    lng: 128.6102,
    image: "/images/yr/marker/house_locationG.png",
  },
];

function loadKakaoMapScript() {
  return new Promise((resolve) => {
    if (window.kakao && window.kakao.maps) {
      resolve();
    } else {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_KAKAO_MAP_KEY
      }&autoload=false`;
      script.onload = () => window.kakao.maps.load(resolve);
      document.head.appendChild(script);
    }
  });
}

onMounted(async () => {
  await loadKakaoMapScript();

  const kakao = window.kakao;
  const container = document.getElementById("map");
  const map = new kakao.maps.Map(container, {
    center: new kakao.maps.LatLng(35.8714354, 128.601445),
    level: 8,
  });

  const overlays = {};

  window.handleOverlayOpen = (id) => {
    Object.values(overlays).forEach((ov) => ov.setMap(null)); // 모든 overlay 닫기
    if (overlays[id]) overlays[id].setMap(map); // 해당 overlay만 열기
  };

  positions.forEach((pos, idx) => {
    const markerImage = new kakao.maps.MarkerImage(
      pos.image,
      new kakao.maps.Size(40, 40)
    );
    const marker = new kakao.maps.Marker({
      map,
      position: new kakao.maps.LatLng(pos.lat, pos.lng),
      image: markerImage,
    });

    const infowindow = new kakao.maps.InfoWindow({
      content: pos.content,
    });

    kakao.maps.event.addListener(marker, "mouseover", () => {
      infowindow.open(map, marker);
    });

    kakao.maps.event.addListener(marker, "mouseout", () => {
      infowindow.close();
    });
  });
});
</script>
