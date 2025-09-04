<template>
  <!-- 예약 현황 -->
  <div class="bg-white rounded-lg shadow dark:bg-gray-800">
    <!-- 운반 예약 현황 타이틀  -->
    <div class="p-4 border-b border-gray-200 dark:border-white/20 dark:bg-gray-800 rounded-t-lg">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
        예약 목록
      </h2>
    </div>
    <!-- 검색 select바 -->
    <div
      class="p-4 py-2 font-light text-gray-500 dark:text-black text-sm border-b border-gray-200 flex flex-col md:flex-row gap-4">
      <div class="flex flex-wrap md:flex-row justify-center md:justify-start gap-2 items-center">
        <!-- 날짜 시작 끝 선택-->
        <DateRangePicker label="기간" v-model:startDate="startDate" v-model:endDate="endDate" />

        <!-- 날짜 선택 일일이 선택 -->
        <!-- <SearchDateSelect class="p-2" v-model="items[index].rangeType" v-model:startDate="items[index].startDate"
          v-model:endDate="items[index].endDate" @change="() => updateDateRange(index)" /> -->
        <!-- 오늘/주/한달 선택  -->
        <SearchSelect v-model="date" :options="dateOptions" @change="onDateChange" />
        <SearchSelect label="픽업위치" v-model="pickup" :options="pickupOptions" @change="onPickupChange" />
        <!-- <SearchSelect label="담당지역" v-model="area" :options="areaOptions" /> -->
        <SearchSelect label="운반상태" v-model="status" :options="statusOptions" />
        <button @click="onSearch"
          class="w-[35px] h-[35px] bg-indigo-600 dark:bg-indigo-300 text-white dark:text-black rounded-md hover:bg-indigo-700">
          검색
        </button>
      </div>
    </div>

    <!-- 운반 메뉴바  -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100">
          <tr class="hover:bg-gray-50">
            <th class="hidden md:block px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              예약번호
            </th>
            <th class="block md:hidden px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              번호
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              고객명
            </th>
            <th class="hidden md:block px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              픽업위치
            </th>
            <th class="block md:hidden px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              위치
            </th>
            <th class="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              수
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              예약일시
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              상태
            </th>
            <th class="hidden md:block px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              담당기사
            </th>
            <th class="block md:hidden px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              기사
            </th>
            <th
              class="max-[768px]:hidden px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <p class="mr-3">액션</p>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="reservation in pagedReservations" :key="reservation.id"
            @click="showReservationDetails(reservation)" class="hover:bg-gray-50">
            <td class="num px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ reservation.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ reservation.customerName }}
            </td>
            <td class="hidden md:block px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ reservation.location }}
            </td>
            <td class="md:hidden px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ reservation.location1 }}
            </td>
            <td class="px-8 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ reservation.bagCount }}
            </td>
            <td class="aaa hidden md:block px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ formatDate(reservation.date) }} {{ reservation.time }}
            </td>
            <td class="bbb hidden px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ formatDate1(reservation.date) }} {{ reservation.time }}
            </td>
            <td class="statusNor px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(reservation.status)"
                class="py-1.5 px-2 text-xs leading-5 font-semibold rounded-xl" style="width: 50px; height: 25px">
                {{ getStatusText(reservation.status) }}
              </span>
            </td>
            <td class="statusRound hidden px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(reservation.status)" class="w-3 h-3 inline-block rounded-full"></span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ reservation.worker }}
            </td>
            <td class="max-[768px]:hidden px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button @click.stop="showReservationDetails(reservation)"
                class="text-indigo-600 hover:text-indigo-900 mr-3">
                상세
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 예약 상세 모달 -->
    <div v-if="selectedReservation"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">예약 상세 정보</h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 기본 정보 -->
            <div class="space-y-6">
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">
                  기본 정보
                </h4>
                <div class="space-y-2 text-gray-700">
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700">상태 *</label>
                    <select v-model="selectedReservation.status"
                      class="flex-1 border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="대기중">대기중</option>
                      <option value="운반중">운반중</option>
                      <option value="완료">완료</option>
                      <option value="취소">취소</option>
                    </select>
                  </div>
                  <!-- 픽업위치 -->
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700">픽업위치 *</label>
                    <select v-model="selectedReservation.location"
                      class="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="대구공항">대구공항</option>
                      <option value="동대구역">동대구역</option>
                      <option value="서대구역">서대구역</option>
                    </select>
                  </div>
                  <!-- 고객 -->
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700">고객명 *</label>
                    <input type="text" v-model="selectedReservation.customerName"
                      class="flex-1 border border-gray-300 rounded-md md:px-4 pl-2 py-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700">연락처 *</label>
                    <input type="text" v-model="selectedReservation.phone"
                      class="flex-1 border border-gray-300 rounded-md md:px-4 pl-2 py-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                </div>
              </div>

              <!-- 운반 정보 -->
              <div class="text-gray-700">
                <h4 class="text-sm font-medium text-gray-500 mb-2">
                  운반 정보
                </h4>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700">가방 수 *</label>
                    <input type="number" v-model="selectedReservation.bagCount"
                      class="flex-1 border border-gray-300 rounded-md md:px-4 pl-2 py-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div class="flex items-center text-gray-700">
                    <label class="w-32 text-sm font-medium text-gray-700">특별 요청</label>
                    <input type="text" v-model="selectedReservation.specialRequests" placeholder="특별 취급 가방, 대형 가방 등"
                      class="flex-1 border border-gray-300 rounded-md md:px-4 pl-2 py-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                </div>
              </div>
            </div>

            <!-- 일정 및 기타 정보 -->
            <div class="space-y-6">
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">
                  일정 정보
                </h4>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700">예약일시 *</label>
                    <input type="datetime-local" v-model="selectedReservation.preferredDateTime"
                      class="hidden md:block flex-1 border border-gray-300 rounded-md md:px-3 pl-2 py-2 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="text" :value="formattedPreferredDate"
                      class="md:hidden flex-1 border border-gray-300 rounded-md md:px-3 pl-2 py-2 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                </div>
              </div>

              <!-- 담당 정보 -->
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">
                  담당 정보
                </h4>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700">담당기사 *</label>
                    <div @click="openTechnicianSearchModal" class="flex-1 relative">
                      <input type="text" v-model="technicianSearch" readonly placeholder="기사 검색"
                        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer" />
                      <i class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">
                  추가 정보
                </h4>
                <div class="space-y-2">
                  <div>
                    <label class="text-sm font-medium text-gray-700">메모</label>
                    <textarea v-model="selectedReservation.memo" rows="3"
                      class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="추가 메모사항을 입력하세요"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3 px-3 flex justify-end gap-3">
          <button @click="closeModal"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            예약취소
          </button>
          <button @click="saveReservation"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium hover:text-white hover:bg-indigo-600 text-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            저장
          </button>
        </div>
      </div>
    </div>

    <!-- 취소 확인 모달 -->
    <div v-if="showCancelModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">예약 취소 확인</h3>
            <button @click="closeCancelModal" class="text-gray-400 hover:text-gray-500">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="p-6">
          <p class="text-sm text-gray-900">
            정말로 이 예약을 취소하시겠습니까?
          </p>
          <p class="text-sm text-gray-500 mt-1">
            취소된 예약은 복구할 수 없습니다.
          </p>
        </div>
        <div class="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button @click="closeCancelModal"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            아니오
          </button>
          <button @click="cancelReservation"
            class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700">
            예, 취소합니다
          </button>
        </div>
      </div>
    </div>

    <!-- 기사 검색 모달 -->
    <div v-if="showTechnicianSearchModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">기사 검색</h3>
            <button @click="closeTechnicianSearchModal" class="text-gray-400 hover:text-gray-500">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="p-6">
          <!-- 검색 조건 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">구분</label>
              <select v-model="technicianSearchFilters.type"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="all">전체</option>
                <option value="executive">임원</option>
                <option value="employee">사원</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">정산율</label>
              <select v-model="technicianSearchFilters.settlementRate"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="all">전체</option>
                <option value="70">70%</option>
                <option value="75">75%</option>
                <option value="80">80%</option>
                <option value="85">85%</option>
                <option value="90">90%</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">활동지역</label>
              <select v-model="technicianSearchFilters.area"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="all">전체</option>
                <option value="gu1">동구, 군위군</option>
                <option value="gu2">서구, 중구, 북구</option>
                <option value="gu3">중구, 수성구</option>
                <option value="gu4">달서구, 달성군</option>
              </select>
            </div>
          </div>

          <!-- 검색어 입력 -->
          <div class="mb-6">
            <div class="relative">
              <input type="text" v-model="technicianSearchFilters.keyword" @input="handleInput"
                placeholder="기사명 또는 전화번호로 검색"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
              <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>

          <!-- 기사 목록 테이블 -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    번호
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    기사명
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    구분
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    휴대전화
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    정산율
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    활동지역
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    선택
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="tech in paginatedTechnicians" :key="tech.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ tech.id }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ tech.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ getTechnicianTypeText(tech.type) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ tech.phone }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ tech.settlementRate }}%
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ getAreaText(tech.area) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button @click="selectTechnician(tech)" class="text-indigo-600 hover:text-indigo-900">
                      선택
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 페이지네이션 -->
          <div class="flex justify-between items-center mt-8">
            <div class="text-sm text-gray-700 dark:text-white">
              총
              <span class="font-medium dark:text-white">{{
                filteredTechnicians.length
              }}</span>명의 기사  
            </div>
            <div class="flex gap-2">
              <button @click="prevTechnicianPage" :disabled="currentTechnicianPage === 1"
                class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <i class="fas fa-chevron-left"></i>
              </button>
              <button v-for="page in totalTechnicianPages" :key="page" @click="goToTechnicianPage(page)" :class="[
                'px-3 py-1 border rounded',
                currentTechnicianPage === page
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'border-gray-300 hover:bg-gray-50',
              ]" class="dark:text-white">
                {{ page }}
              </button>
              <button @click="nextTechnicianPage" :disabled="currentTechnicianPage === totalTechnicianPages"
                class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 페이지네이션 -->
    <div class="w-full px-4 py-4 md:flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div class="justify-between hidden">
        <button @click="prevPage" :disabled="currentPage === 1"
          class="relative inline-flex md:hidden items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          이전
        </button>
        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="ml-3 relative inline-flex md:hidden items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          다음
        </button>
      </div>

      <div
        class="w-full flex justify-between items-center max-[768px]:flex-1 max-[768px]:flex max-[768px]:items-center max-[768px]:justify-center sm:justify-between">
        <!-- 총~표시 -->
        <div class="hidden sm:block">
          <p class="text-sm text-gray-700 dark:text-white">
            총 <span class="font-medium">{{ totalItems }}</span>개 예약
            <span class="font-medium">{{
              (currentPage - 1) * itemsPerPage + 1
              }}</span>-
            <span class="font-medium">{{
              Math.min(currentPage * itemsPerPage, totalItems)
              }}</span>개 표시
          </p>
        </div>

        <!-- 페이지네이션부분 -->
        <div class="flex gap-2 dark:text-white">
          <!-- 처음 페이지로 이동 -->
          <button @click="goToFirstPage" :disabled="currentPage === 1"
            class="px-3 py-1 border border-gray-300 rounded dark:text-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            &laquo;
          </button>

          <!-- 이전 페이지 -->
          <button @click="prevPage" :disabled="currentPage === 1"
            class="px-3 py-1 border border-gray-300 rounded dark:text-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            <i class="fas fa-chevron-left"></i>
          </button>

          <!-- 5개 페이지 번호만 표시 -->
          <button v-for="page in displayedPages" :key="page" @click="goToPage(page)" class="px-3 py-1 border rounded"
            :class="[
              currentPage === page
                ? 'bg-indigo-600  text-white border-indigo-600'
                : 'border-gray-300  text-gray-500 dark:text-gray-300 hover:bg-gray-50 hover:text-gray-700',
            ]">
            {{ page }}
          </button>

          <!-- 다음 페이지 -->
          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            <i class="fas fa-chevron-right"></i>
          </button>

          <!-- 마지막 페이지로 이동 -->
          <button @click="goToLastPage" :disabled="currentPage === totalPages"
            class="px-3 py-1 border border-gray-300 rounded dark:text-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            &raquo;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DateRangePicker from "./DateRangePicker.vue"
import SearchSelect from "./SearchSelect.vue";
import SearchDateSelect from "./SearchDateSelect.vue";
import { ref, computed, nextTick, watch } from "vue";
import { reactive } from "vue";
import { format, addDays, subMonths } from "date-fns";
import { useAppStore } from "@/stores/useAppStore";
import { storeToRefs } from 'pinia';
const appStore = useAppStore();
const props = defineProps({
  reservations: {
    type: Array,
    required: true
  }
})

// reservations는 ref로 되어 있으니 storeToRefs로 분리하거나 직접 접근 가능
const { reservations } = storeToRefs(appStore);

const selectedReservation = ref(null);
const showCancelModal = ref(false);
const reservationToCancel = ref(null);
const searchQuery = ref("");
const statusFilter = ref("all");

// 기준 설정
const date = ref("today");
const pickup = ref("all");
const area = ref("all");
const status = ref("all");
const sortBy = ref("date-desc");
const startDate = ref("")
const endDate = ref("")
// 필터
const filteredReservations = computed(() => {
  let result = [...props.reservations]

  // 날짜 필터
  if (startDate.value || endDate.value) {
    const start = startDate.value ? new Date(startDate.value) : null
    const end = endDate.value ? new Date(endDate.value) : null
    if (start) start.setHours(0, 0, 0, 0)
    if (end) end.setHours(23, 59, 59, 999)

    result = result.filter(r => {
      const resDate = new Date(r.date)
      if (start && end) return resDate >= start && resDate <= end
      if (start) return resDate >= start
      if (end) return resDate <= end
      return true
    })
  }

  return result
})

// 기준일 선택
const dateOptions = [
  { value: "today", label: "오늘" },
  { value: "week", label: "일주일" },
  { value: "month", label: "한달" },
  { value: "all", label: "전체" },
];
// 날짜선택
const item = ref({
  rangeType: "today",        // 선택된 기간 (today/week/month/all)
  pickup: "all",             // 선택된 픽업위치
  area: "all",               // 선택된 담당지역
});


// 픽업위치
const pickupOptions = [
  { value: "all", label: "픽업위치" },
  { value: "숙소", label: "숙소" },
  { value: "대구공항", label: "대구공항" },
  { value: "동대구역", label: "동대구역" },
  { value: "서대구역", label: "서대구역" },
];


// 담당지역
const areaOptions = [
  { value: "all", label: "담당지역" },
  { value: "gu1", label: "동구, 군위군" },
  { value: "gu2", label: "서구, 중구, 북구" },
  { value: "gu3", label: "중구, 수성구" },
  { value: "gu4", label: "달서구, 달성군" },
];
// 운반상태
const statusOptions = [
  { value: "all", label: "운반상태" },
  { value: "waiting", label: "대기중" },
  { value: "in_progress", label: "운반중" },
  { value: "completed", label: "완료" },
  { value: "cancelled", label: "취소" },
];


const formatDate1 = (date) => format(date, "MM/dd");

const items = reactive([
  {
    rangeType: "today",
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date()),
  },
]);
// 날짜 비교용 함수
function isDateInRange(resDate, filterDate) {
  const today = new Date();
  const res = new Date(resDate);

  if (filterDate === 'all') return true;
  if (filterDate === 'today') {
    return (
      res.getFullYear() === today.getFullYear() &&
      res.getMonth() === today.getMonth() &&
      res.getDate() === today.getDate()
    );
  }
  if (filterDate === 'tomorrow') {
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    return (
      res.getFullYear() === tomorrow.getFullYear() &&
      res.getMonth() === tomorrow.getMonth() &&
      res.getDate() === tomorrow.getDate()
    );
  }
  return true;
}

const index = 0
// 날짜 설정 오늘 일주일 한달 전체
const onRangeChange = (index) => {
  console.log('Range changed for index:', index)
}
// 픽업 위치 변경 핸들러
function onPickupChange() {
  console.log("픽업위치 변경:", pickup.value);
}


// 검색 버튼 클릭 핸들러
function onSearch() {
  if (!items[index].startDate || !items[index].endDate) {
    alert("시작일과 종료일을 모두 선택해주세요.");
    return;
  }

  const filterPayload = {
    startDate: items[index].startDate,
    endDate: items[index].endDate,
    rangeType: items[index].rangeType,
    pickup: pickup.value,
    status: statusFilter.value,
    date: date.value,
  };

  console.log("🔍 검색 필터:", filterPayload);
}



function formatDate(date) {
  return format(date, 'yyyy-MM-dd') // 예: 2025-05-28
}
function updateDateRange(index) {
  const item = items.value[index]
  const today = new Date()

  switch (item.rangeType) {
    case 'today':
      item.startDate = formatDate(today)
      item.endDate = formatDate(today)
      break
    case 'week':
      item.startDate = formatDate(addDays(today, -7))
      item.endDate = formatDate(today)
      break
    case 'month':
      item.startDate = formatDate(subMonths(today, 1))
      item.endDate = formatDate(today)
      break
    case 'all':
      item.startDate = ''
      item.endDate = ''
      break
  }
}
// 오늘/주/한달/전체 선택 변경 핸들러
function onDateChange(selectedValue) {
  date.value = selectedValue;
  items[index].rangeType = selectedValue;
  updateDateRange(index);
}
// 지역별 담당구역
const pickupArea = reactive([
  {
    atArea: "all",
  },
]);
// 지역별 담당구역
const workerArea = reactive([
  {
    dutyArea: "all",
  },
]);

// 기사 검색 관련 상태
const showTechnicianSearchModal = ref(false);
const technicianSearchFilters = ref({
  type: "all",
  settlementRate: "all",
  area: "all",
  keyword: "",
});

// 기사 목록 (실제로는 API에서 가져와야 함)
const technicians = ref([
  {
    id: 1,
    name: "김지훈",
    type: "executive",
    phone: "010-1111-2222",
    settlementRate: 80,
    area: "gu1",
  },
  {
    id: 2,
    name: "이수민",
    type: "employee",
    phone: "010-3333-4444",
    settlementRate: 75,
    area: "gu2",
  },
  {
    id: 3,
    name: "박서준",
    type: "executive",
    phone: "010-5555-6666",
    settlementRate: 85,
    area: "gu3",
  },
  {
    id: 4,
    name: "한예슬",
    type: "employee",
    phone: "010-7777-8888",
    settlementRate: 70,
    area: "gu4",
  },
  {
    id: 5,
    name: "정우성",
    type: "executive",
    phone: "010-9999-0000",
    settlementRate: 90,
    area: "gu1",
  },
  {
    id: 6,
    name: "김태희",
    type: "employee",
    phone: "010-2222-3333",
    settlementRate: 75,
    area: "gu2",
  },
  {
    id: 7,
    name: "이준호",
    type: "executive",
    phone: "010-4444-5555",
    settlementRate: 80,
    area: "gu3",
  },
  {
    id: 8,
    name: "유인나",
    type: "employee",
    phone: "010-6666-7777",
    settlementRate: 85,
    area: "gu4",
  },
  {
    id: 9,
    name: "이병헌",
    type: "executive",
    phone: "010-8888-9999",
    settlementRate: 70,
    area: "gu1",
  },
  {
    id: 10,
    name: "한가인",
    type: "employee",
    phone: "010-0000-1111",
    settlementRate: 90,
    area: "gu2",
  },
  {
    id: 11,
    name: "정해인",
    type: "executive",
    phone: "010-8888-9999",
    settlementRate: 70,
    area: "gu1",
  },
  {
    id: 12,
    name: "남주혁",
    type: "employee",
    phone: "010-0000-1111",
    settlementRate: 90,
    area: "gu4",
  },
  {
    id: 13,
    name: "송중기",
    type: "executive",
    phone: "010-8888-9999",
    settlementRate: 70,
    area: "gu2",
  },
  {
    id: 14,
    name: "고아라",
    type: "employee",
    phone: "010-0000-1111",
    settlementRate: 90,
    area: "gu3",
  },
  {
    id: 15,
    name: "전지현",
    type: "employee",
    phone: "010-0000-1111",
    settlementRate: 90,
    area: "gu4",
  },
]);

// 기사 페이지네이션 관련 상태
const currentTechnicianPage = ref(1);
const techniciansPerPage = ref(5);
const technicianSearch = ref("");

// 필터링된 기사 목록
const filteredTechnicians = computed(() => {
  return technicians.value.filter((tech) => {
    const matchesType =
      technicianSearchFilters.value.type === "all" ||
      tech.type === technicianSearchFilters.value.type;
    const matchesRate =
      technicianSearchFilters.value.settlementRate === "all" ||
      tech.settlementRate.toString() ===
      technicianSearchFilters.value.settlementRate;
    const matchesArea =
      technicianSearchFilters.value.area === "all" ||
      tech.area === technicianSearchFilters.value.area;
    const matchesKeyword =
      !technicianSearchFilters.value.keyword ||
      tech.name.includes(technicianSearchFilters.value.keyword) ||
      tech.phone.includes(technicianSearchFilters.value.keyword);

    return matchesType && matchesRate && matchesArea && matchesKeyword;
  });
});

// 페이지네이션 계산
const totalTechnicianPages = computed(() => {
  return Math.ceil(filteredTechnicians.value.length / techniciansPerPage.value);
});

const paginatedTechnicians = computed(() => {
  const start = (currentTechnicianPage.value - 1) * techniciansPerPage.value;
  const end = start + techniciansPerPage.value;
  return filteredTechnicians.value.slice(start, end);
});

// 페이지 이동 함수
const goToTechnicianPage = (page) => {
  if (page >= 1 && page <= totalTechnicianPages.value) {
    currentTechnicianPage.value = page;
  }
};

const nextTechnicianPage = () => {
  if (currentTechnicianPage.value < totalTechnicianPages.value) {
    currentTechnicianPage.value++;
  }
};

const prevTechnicianPage = () => {
  if (currentTechnicianPage.value > 1) {
    currentTechnicianPage.value--;
  }
};

// 기사 유형 텍스트 변환
const getTechnicianTypeText = (type) => {
  const typeMap = {
    executive: "임원",
    employee: "사원",
  };
  return typeMap[type] || type;
};

// 지역 텍스트 변환
const getAreaText = (area) => {
  const areaMap = {
    gu1: "동구, 군위군",
    gu2: "서구, 중구, 북구",
    gu3: "중구, 수성구",
    gu4: "달서구, 달성군",
  };
  return areaMap[area] || area;
};

// 기사 검색 모달 열기/닫기
const openTechnicianSearchModal = () => {
  showTechnicianSearchModal.value = true;
  document.body.style.overflow = "hidden";
};

const closeTechnicianSearchModal = () => {
  showTechnicianSearchModal.value = false;
  document.body.style.overflow = "";
};

// 기사 선택
const selectTechnician = (technician) => {
  selectedReservation.value.technician = technician;
  technicianSearch.value = technician.name;
  closeTechnicianSearchModal();
};

const handlePhotoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!selectedReservation.value.photos) {
        selectedReservation.value.photos = [];
      }
      selectedReservation.value.photos.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

const removePhoto = (index) => {
  selectedReservation.value.photos.splice(index, 1);
};

const saveReservation = () => {
  // 필수 항목 검증
  const requiredFields = [
    "status",
    "location",
    "customerName",
    "phone",
    "bagCount",
    "specialRequests",
    "preferredDateTime",
    "createdAt",
    "technician",
  ];

  const missingFields = requiredFields.filter(
    (field) => !selectedReservation.value[field]
  );

  if (missingFields.length > 0) {
    alert("필수 항목을 모두 입력해주세요.");
    return;
  }
  if (
    !customerName &&
    !phone &&
    !date &&
    !time &&
    !startLocation &&
    !endLocation &&
    !area &&
    !status &&
    !workerId
  ) {
    errors.value.general = "필수 항목이 모두 입력되지 않았습니다.";
  }

  // 저장 로직 구현
  console.log("저장된 예약 정보:", selectedReservation.value);
  closeModal();
};

const formattedPreferredDate = computed(() => {
  if (!selectedReservation.value.preferredDateTime) return "";
  return format(
    new Date(selectedReservation.value.preferredDateTime),
    "MM-dd HH:mm"
  );
});

// 페이지네이션 관련 상태
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalItems = ref(120);

// 페이지네이션 계산
// 총 페이지 수
const totalPages = computed(() =>
  Math.ceil(filteredReservations.value.length / itemsPerPage.value)
);


// 페이지 이동 함수들
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

const goToFirstPage = () => {
  currentPage.value = 1;
};

const goToLastPage = () => {
  currentPage.value = totalPages.value;
};
// 현재 페이지 데이터
const pagedReservations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredReservations.value.slice(start, start + itemsPerPage.value);
});
// 표시할 페이지 번호 배열 (최대 5개)
// 1~totalPages 범위에서 현재 페이지 중심으로 최대 5페이지 번호 표시
const displayedPages = computed(() => {
  const total = totalPages.value;
  let start = Math.max(currentPage.value - 2, 1);
  let end = start + 4;

  if (end > total) {
    end = total;
    start = Math.max(end - 4, 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});




const getStatusText = (status) => {
  const statusMap = {
    waiting: "대기중",
    in_progress: "운반중",
    completed: "완료",
    cancelled: "취소",
  };
  return statusMap[status] || status;
};

const getStatusClass = (status) => {
  const statusClasses = {
    대기중: "bg-yellow-100 text-yellow-800",
    운반중: "bg-blue-100 text-blue-800",
    완료: "bg-green-100 text-green-800",
    취소: "bg-red-100 text-red-800",
  };
  return statusClasses[status] || "bg-gray-100 text-gray-800";
};

const showReservationDetails = (reservation) => {
  // 기존 예약 데이터를 복사하여 새로운 객체 생성
  selectedReservation.value = {
    ...reservation,
    // 기본값 설정
    cafeName: reservation.cafeName || "",
    businessNumber: reservation.businessNumber || "",
    modelName: reservation.modelName || "",
    estimatedPrice: reservation.estimatedPrice || "",
    createdAt: reservation.createdAt || new Date().toISOString().slice(0, 16),
    preferredDateTime:
      reservation.preferredDateTime || new Date().toISOString().slice(0, 16),
    photos: reservation.photos || [],
    requirements: reservation.requirements || "",
    status: reservation.status || "",
    memo: reservation.memo || "",
    technician: reservation.technician || null,
  };

  // 모달이 즉시 표시되도록 함
  nextTick(() => {
    document.body.style.overflow = "hidden";
  });
};

const closeModal = () => {
  selectedReservation.value = null;
  showCancelModal.value = false;
  document.body.style.overflow = "";
};

const confirmCancel = (reservation) => {
  reservationToCancel.value = reservation;
  showCancelModal.value = true;
};

const closeCancelModal = () => {
  showCancelModal.value = false;
  reservationToCancel.value = null;
};

const cancelReservation = () => {
  if (reservationToCancel.value) {
    const index = reservations.value.findIndex(
      (r) => r.id === reservationToCancel.value.id
    );
    if (index !== -1) {
      reservations.value[index].status = "cancelled";
    }
  }
  closeCancelModal();
};

// 한글이슈
function handleInput(event) {
  searchQuery.value = event.target.value;
}
</script>

<style scoped>
@media screen and (max-width: 1070px) {
  th {
    padding-left: 6px !important;
    padding-right: 6px !important;
    text-align: center;
  }

  td {
    text-align: center;
    padding-left: 6px !important;
    padding-right: 6px !important;
  }
}

@media screen and (max-width: 800px) {
  .aaa {
    display: none;
  }

  .bbb {
    display: block;
  }
}

@media screen and (max-width: 500px) {
  .statusNor {
    display: none;
  }

  .statusRound {
    display: block;
  }

  .statusTd {
    display: none;
  }

  .num {
    font-size: 12px;
  }

  .bbb {
    font-size: 12px;
  }
}
</style>
