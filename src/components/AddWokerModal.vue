<template>
  <!--기사 추가 모달 -->
  <div>
    <div
      v-if="addWorker"
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
              @click="closeModal"
              class="text-gray-400 hover:text-gray-500">
              <i class="fas fa-times"></i>
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
                    @click.stop="closeModal"
                    class="px-6 py-3 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors">
                    <i class="fas fa-times"></i>
                    취소
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
                    @click="cancelEditing"
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
  </div>
</template>

<script setup>
import { ref } from "vue";

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
// 숨겨진 파일 입력 요소를 클릭하여 파일 선택 창 열기
const triggerFileInput = () => {
  fileInput.value.click();
};
// /선택된 이미지 파일을 base64형식으로 변환하여 미리보기 표기
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
  // 실제 API 호출 로직 추가 예정
  const profile = {
    name: driverName.value,
    phone: driverPhone.value,
    email: driverEmail.value,
    vehicle: vehicleInfo.value,
  };
  alert(
    `프로필 저장 완료 :이름 : ${profile.name}전화번호 : ${profile.phone} 이메일:${profile.email} 차랑종류:${profile.vehicle}`
  );
  isEditing.value = false;
};
const cancelEditing = () => {
  driverName.value = oring.value.name;
  driverPhone.value = oring.value.phone;
  driverEmail.value = oring.value.email;
  vehicleInfo.value = oring.value.vehicle;
  isEditing.value = false;
};
const oring = ref({
  name: driverName.value,
  phone: driverPhone.value,
  email: driverEmail.value,
  vehicle: vehicleInfo.value,
});
</script>
