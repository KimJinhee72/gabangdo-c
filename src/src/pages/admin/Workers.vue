<template>
  <div class="space-y-6">
    <!-- 페이지 헤더 -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
          기사관리
        </h1>
        <p class="infoP text-sm text-gray-500 mt-1 dark:text-white">
          기사 정보를 관리하고 상태를 확인할 수 있습니다.
        </p>
      </div>
      <button
        @click="openAddModal"
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
        <i class="fas fa-plus mr-2"></i>기사추가
      </button>
    </div>

    <!-- 기사 통계 카드 -->
    <!--오늘기사 카드-->
    <div class="card grid grid-rows-1 md:w-full grid-cols-3 gap-6">
      <div
        class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow dark:bg-gray-800">
        <div class="flex items-center max-[930px]:justify-center">
          <div class="icon-box p-3 rounded-full bg-blue-100 text-blue-600">
            <i
              class="block max-[930px]:hidden user fas fa-user-tie text-2xl"></i>
          </div>
          <div class="ml-4 cardtxt">
            <h3
              class="block max-[930px]:hidden text-sm font-medium text-ray-500 dark:text-white">
              오늘기사<span class="text-xs text-gray-500 dark:text-white">
                / 전체기사</span
              >
            </h3>
            <h3
              class="hidden max-[930px]:block text-sm font-medium text-gray-500 dark:text-white">
              오늘<span class="text-xs text-gray-500 dark:text-white">
                / 전체</span
              >
            </h3>
            <p
              class="text-2xl max-[510px]:text-lg leading-9 font-semibold text-gray-800 dark:text-white">
              {{ store.dashboardStats.totalWorkers - 3 }}
              <span
                class="text-lg max-[510px]:text-sm font-semibold text-gray-800 dark:text-white"
                >/ {{ store.dashboardStats.totalWorkers }}
              </span>
            </p>
            <span class="span text-sm text-green-600 dark:text-green-300"
              >+1명</span
            >
          </div>
        </div>
      </div>

      <!-- 활동중카드 -->
      <div
        class="card bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow dark:bg-gray-800">
        <div class="flex items-center max-[930px]:justify-center">
          <div class="icon-box p-3 rounded-full bg-green-100 text-green-600">
            <i
              class="block max-[930px]:hidden check fas fa-check-circle text-2xl"></i>
          </div>
          <div class="ml-4 cardtxt">
            <h3 class="text-sm font-medium text-gray-500 dark:text-white">
              활동중
            </h3>
            <p class="text-2xl font-semibold text-gray-800 dark:text-white">
              {{ store.dashboardStats.activeWorkers }}명
            </p>
            <span class="span text-sm text-green-600 dark:text-green-300"
              >+1명</span
            >
          </div>
        </div>
      </div>
      <!-- 평점카드 -->
      <div
        class="card bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow dark:bg-gray-800">
        <div class="flex items-center max-[930px]:justify-center">
          <div class="icon-box p-3 rounded-full bg-yellow-100 text-yellow-400">
            <i class="block max-[930px]:hidden star fas fa-star text-2xl"></i>
          </div>
          <div class="ml-4 cardtxt">
            <h3 class="text-sm font-medium text-gray-500 dark:text-white">
              평균 평점
            </h3>
            <p class="text-2xl font-semibold text-gray-800 dark:text-white">
              {{ store.dashboardStats.avgRating }}
            </p>
            <span class="span text-sm text-green-600 dark:text-green-300"
              >+0.1</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 검색 및 필터 -->
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <div class="relative">
            <input
              type="text"
              placeholder="기사명 또는 연락처로 검색..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
        <div class="flex gap-2">
          <select
            class="border border-gray-300 text-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">상태 필터</option>
            <option value="active">활동중</option>
            <option value="inactive">대기중</option>
          </select>
          <select
            class="border border-gray-300 text-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">평점 필터</option>
            <option value="4">4점 이상</option>
            <option value="3">3점 이상</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 기사 목록 & 상세 모달 -->
    <WorkersList/>
    <!-- 기사 추가 모달 -->
    <form @submit.prevent="submitForm">
      <div
        v-if="isAddModalOpen"
        @close="closeModal"
        class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div
          class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          @click.stop>
          <div class="p-6 border-b border-gray-200">
            <div
              @click="openAddModal"
              class="modal flex justify-between items-center">
              <h3 class="text-lg font-medium text-gray-900">기사 추가</h3>
              <button
                @click="$emit('close')"
                class="text-gray-400 hover:text-gray-500">
                <i @click.stop="closeModal" class="fas fa-times"></i>
              </button>
            </div>
          </div>
          <div class="p-6">
            <div>
              <!-- 기본 정보 -->
              <div class="space-y-6">
                <!-- 프로필 섹션 -->
                <div
                  class="grid md:grid-cols-[200px_1fr] gap-8 bg-white rounded-xl shadow-sm p-8">
                  <!-- 프로필 이미지 -->
                  <div class="relative w-48 h-48 mx-auto md:mx-0">
                    <img
                      :src="profileImage"
                      alt="프로필 이미지"
                      class="w-full h-full object-cover rounded-full" />
                    <button
                      @click="uploadImage"
                      class="absolute bottom-2 right-1/2 transform translate-x-1/2 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                      <i class="fas fa-camera"></i>
                    </button>
                  </div>

                  <!-- 프로필 정보 -->
                  <div class="space-y-6">
                    <div class="space-y-2">
                      <label class="text-sm text-gray-600">이름</label>
                      <div class="relative">
                        <input
                          v-model="driverName"
                          :disabled="!isEditing"
                          type="text"
                          placeholder="이름을 입력하세요  (ex : 홍길동)"
                          required
                          class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed" />
                        <i
                          class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      </div>
                    </div>

                    <div class="space-y-2">
                      <label class="text-sm text-gray-600">연락처</label>
                      <div class="relative">
                        <input
                          v-model="driverPhone"
                          :disabled="!isEditing"
                          type="tel"
                          placeholder="연락처를 입력하세요(ex : 010-1234-5678)"
                          required
                          class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed" />
                        <i
                          class="fas fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      </div>
                    </div>

                    <div class="space-y-2">
                      <label class="text-sm text-gray-600">이메일</label>
                      <div class="relative">
                        <input
                          v-model="driverEmail"
                          :disabled="!isEditing"
                          type="email"
                          placeholder="이메일을 입력하세요(ex : driver@example.com)"
                          required
                          class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed" />
                        <i
                          class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      </div>
                    </div>

                    <div class="space-y-2">
                      <label class="text-sm text-gray-600">차량 정보</label>
                      <div class="relative">
                        <input
                          v-model="vehicleInfo"
                          :disabled="!isEditing"
                          type="text"
                          placeholder="차량 정보를 입력하세요(ex : 현대 그랜저 (12가 3456))"
                          required
                          class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed" />
                        <i
                          class="fas fa-car absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 액션 버튼 -->
                <div class="flex gap-4 justify-end">
                  <div
                    v-if="!isEditing"
                    class="flex gap-4 justify-end items-center">
                    <button
                      @click="startEditing"
                      class="px-6 py-3 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors">
                      <i class="fas fa-edit"></i>
                      프로필 수정
                    </button>
                    <button
                      @click.stop="cancelEditing"
                      class="px-6 py-3 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors">
                      <i class="fas fa-times"></i>
                      저장취소
                    </button>
                  </div>
                  <div v-else class="flex justify-end gap-4">
                    <button
                      @click="saveProfile"
                      class="px-6 py-3 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors">
                      <i class="fas fa-save"></i>
                      저장
                    </button>
                    <button
                      type="submit"
                      @click="closeModal"
                      class="px-6 py-3 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors">
                      <i class="fas fa-times"></i>
                      취소
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 이미지 업로드 모달 -->
        <div
          v-if="showImageModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-semibold text-gray-800">
                프로필 이미지 변경
              </h3>
              <button
                @click="closeImageModal"
                class="text-gray-500 hover:text-gray-700">
                <i class="fas fa-times text-xl"></i>
              </button>
            </div>

            <div class="space-y-6">
              <div
                @click="triggerFileInput"
                class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  ref="fileInput"
                  class="hidden" />
                <div
                  v-if="imagePreview"
                  class="w-48 h-48 mx-auto rounded-lg overflow-hidden">
                  <img
                    :src="imagePreview"
                    alt="미리보기"
                    class="w-full h-full object-cover" />
                </div>
                <div v-else class="text-gray-500">
                  <i class="fas fa-cloud-upload-alt text-5xl mb-4"></i>
                  <p>이미지를 선택하세요</p>
                </div>
              </div>

              <div class="flex justify-end gap-4">
                <button
                  @click="saveImage"
                  class="px-6 py-3 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors">
                  <i class="fas fa-save"></i>
                  저장
                </button>
                <button
                  @click="closeImageModal"
                  class="px-6 py-3 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors">
                  <i class="fas fa-times"></i>
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import WorkersList from "./components/WorkersList.vue";
import { ref, computed, watch } from "vue";
import { useAppStore } from "@/stores/useAppStore";

const store = useAppStore();

const date = ref("오늘");
const pickup = ref("all");
const area = ref("all");
const status = ref("all");

// 페이지네이션 상태
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalItems = ref(15);
const selectedWorker = ref(null);
const addWorker = ref(null);

// 기준일 선택
const dateOptions = [
  { value: "all", label: "전체" },
  { value: "today", label: "오늘" },
  { value: "일주일", label: "일주일" },
  { value: "한달", label: "한달" },
];

// 날짜선택

const item = ref({
  rangeType: "today",
  startDate: "2025-05-30",
  endDate: "2025-05-30",
});

watch(date, (newVal) => {
  const today = new Date();
  switch (newVal) {
    case "오늘":
      item.value.rangeType = "today";
      item.value.startDate = formatDate(today);
      item.value.endDate = formatDate(today);
      break;
    case "일주일":
      item.value.rangeType = "week";
      item.value.startDate = formatDate(addDays(today, -7));
      item.value.endDate = formatDate(today);
      break;
    case "한달":
      item.value.rangeType = "month";
      item.value.startDate = formatDate(subMonths(today, 1));
      item.value.endDate = formatDate(today);
      break;
    case "all":
      item.value.rangeType = "all";
      item.value.startDate = "";
      item.value.endDate = "";
      break;
  }
});

// 픽업위치
const pickupOptions = [
  { value: "all", label: "픽업위치" },
  { value: "대구공항", label: "대구공항" },
  { value: "동대구역", label: "동대구역" },
  { value: "서대구역", label: "서대구역" },
];

// 담당지역선택
const areaOptions = [
  { value: "all", label: "담당지역" },
  { value: "gu1", label: "동, 군위" },
  { value: "gu2", label: "서, 중, 북" },
  { value: "gu3", label: "중, 수성" },
  { value: "gu4", label: "달서, 달성" },
];

// 운반상태
const statusOptions = [
  { value: "all", label: "운반상태" },
  { value: "waiting", label: "대기중" },
  { value: "assigned", label: "기사배정" },
  { value: "in_progress", label: "운반중" },
  { value: "completed", label: "완료" },
  { value: "cancelled", label: "취소" },
];

// 활동중/대기중 버튼
const activeStatus = (worker) => {
  const currentStatus = worker.status;
  const newStatus = currentStatus === "대기중" ? "활동중" : "대기중";
  store.updateWorker(worker.id, { status: newStatus });
};

// 페이지네이션 계산
const totalPages = computed(() => {
  return Math.ceil(store.workers.length / itemsPerPage.value);
});

const paginatedWorkers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return store.workers.slice(start, end);
});

// 페이지 이동 함수
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const getStatusClass = (status) => {
  const statusClasses = {
    활동중: "bg-green-100 text-green-800",
    대기중: "bg-red-100 text-red-800",
  };
  return statusClasses[status] || "bg-gray-100 text-gray-800";
};

// 기사 추가 모달 관련 함수
const isAddModalOpen = ref(false);
const openAddModal = () => {
  isAddModalOpen.value = true;
  addWorker.value = {
    id: "",
    name: "",
    phone: "",
    rating: 0,
    status: "활동중",
    reservations: "0건",
    memo: "",
    joinDate: new Date().toISOString().split("T")[0],
    lastActivity: "",
    area: "",
  };
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  isAddModalOpen.value = false;
  document.body.style.overflow = "auto";
};

const profileImage = ref("/images/people1.png");
const showImageModal = ref(false);
const driverName = ref("");
const driverPhone = ref("");
const driverEmail = ref("");
const vehicleInfo = ref("");
const isEditing = ref(true);
const imagePreview = ref(null);
const fileInput = ref(null);
const averageRating = ref(4.8);

// 이미지 업로드 모달 열기
const uploadImage = () => {
  showImageModal.value = true;
};

// 이미지 모달 닫기
const closeImageModal = () => {
  showImageModal.value = false;
};

// 파일선택 다이얼로그 트리거
const triggerFileInput = () => {
  fileInput.value.click();
};

// 선택된 이미지 파일을 base64형식으로 변환하여 미리보기 표기
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // 파일 크기 체크 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB를 초과할 수 없습니다.");
      return;
    }

    // 이미지 파일 타입 체크
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// 프로필 이미지 저장
const saveImage = () => {
  if (imagePreview.value) {
    profileImage.value = imagePreview.value;
  }
  closeImageModal();
};

// 프로필 수정 모드 시작
const startEditing = () => {
  isEditing.value = true;
};

const saveProfile = () => {
  const profile = {
    name: driverName.value,
    phone: driverPhone.value,
    email: driverEmail.value,
    vehicle: vehicleInfo.value,
  };

  const confirmMessage = `
  아래 정보를 저장하시겠습니까?

  이름: ${profile.name}
  전화번호: ${profile.phone}
  이메일: ${profile.email}
  차량 정보: ${profile.vehicle}
  `;

  if (confirm(confirmMessage)) {
    // 새 기사를 store에 추가
    const newWorker = {
      name: profile.name,
      phone: profile.phone,
      rating: 0,
      status: "활동중",
      reservations: "0건",
      memo: "",
      joinDate: new Date().toISOString().split("T")[0],
      lastActivity: new Date().toISOString().split("T")[0],
      area: "동, 군위",
      areaGroup: "gu1"
    };
    
    store.addWorker(newWorker);
    alert("기사가 추가되었습니다.");
    isEditing.value = false;
    closeModal();
  } else {
    alert("저장이 취소되었습니다.");
  }
};

const cancelEditing = () => {
  const hasChanged =
    driverName.value !== "" ||
    driverPhone.value !== "" ||
    driverEmail.value !== "" ||
    vehicleInfo.value !== "";

  if (hasChanged) {
    if (confirm("정말 저장을 취소하시겠습니까?")) {
      isEditing.value = false;
      driverName.value = "";
      driverPhone.value = "";
      driverEmail.value = "";
      vehicleInfo.value = "";
      closeModal();
    }
  } else {
    isEditing.value = false;
    closeModal();
  }
};

// 유틸리티 함수들
const formatDate = (date) => date.toISOString().split('T')[0];
const addDays = (date, days) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
const subMonths = (date, months) => new Date(date.getFullYear(), date.getMonth() - months, date.getDate());

const submitForm = () => {
  // Form submission logic here
};
</script>

<style scoped>
.icon-box {
  width: 54px;
  height: 56px;
}
.icon-box i {
  font-size: 1.5rem; /* text-xl 정도 */
  padding-left: 0;
  margin-left: 5px;
  margin-bottom: 1px;
  align-items: center;
}
.icon-box i {
  font-size: 1.5rem; /* text-xl 정도 */
  padding-left: 0;
  margin-left: 2px;
  margin-bottom: 2px;
  align-items: center;
}
.user {
  margin-left: 5px !important;
}
.check {
  margin-left: 2.5px !important;
}
@media screen and (max-width: 1140px) {
  th {
    padding-left: 12px;
    padding-right: 12px;
  }
  td {
    padding-left: 12px;
    padding-right: 12px;
  }
}
@media screen and (max-width: 1010px) {
  .icon-box {
    all: unset;
    display: flex;
    padding: 0;
    background: none;
    color: inherit;
  }
  .icon-box i {
    font-size: 1.5rem; /* text-xl 정도 */
    padding-left: 0;
    color: rgb(53, 184, 24);
  }
  .icon-box .user {
    color: blue;
  }
  .icon-box .star {
    color: yellow;
  }
  .text-2xl > p {
    font-size: 18px !important;
  }
}
@media screen and (max-width: 930px) {
  .cardtxt {
    margin-left: 0px !important;
    text-align: center;
  }
  th {
    padding-left: 10px;
    padding-right: 10px;
  }
  td {
    padding-left: 10px;
    padding-right: 10px;
  }
}

@media screen and (max-width: 440px) {
  .infoP {
    display: none;
  }
  .card > .bg-white {
    padding: 15px !important;
  }
}
</style>
