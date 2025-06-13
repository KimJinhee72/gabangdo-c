<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 ">
    <div class="mx-auto space-y-6">
      <!-- 헤더 -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">매출 관리</h1>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">실시간 매출 현황과 수익 분석을 확인할 수 있습니다.</p>
        </div>
        <div class="flex gap-2">
          <button @click="showDateRangeModal = true"
            class="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
            <i class="fas fa-calendar mr-2"></i>
            기간 설정
          </button>
          <button @click="showReportModal = true"
            class="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <i class="fas fa-file-alt mr-2"></i>
            매출 보고서
          </button>
        </div>
      </div>

      <!-- 선택된 기간 표시 -->
      <div v-if="selectedDateRange.start && selectedDateRange.end"
        class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <i class="fas fa-info-circle text-blue-600 mr-2"></i>
            <span class="text-blue-800 dark:text-blue-200">
              {{ isAllPeriod ? '전체 기간' : `선택된 기간: ${formatDate(selectedDateRange.start)} ~
              ${formatDate(selectedDateRange.end)}` }}
              <span class="ml-2 text-sm text-blue-600">({{ getDaysDifference() }}일간)</span>
            </span>
          </div>
          <button @click="resetDateRange"
            class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <!-- 데이터 로딩 상태 -->
      <div v-if="isLoadingData"
        class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div class="flex items-center">
          <i class="fas fa-spinner fa-spin text-yellow-600 mr-2"></i>
          <span class="text-yellow-800 dark:text-yellow-200">선택된 기간의 데이터를 불러오는 중...</span>
        </div>
      </div>

      <!-- 통계 카드 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
                {{ getStatTitle('revenue') }}
              </h3>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{
                formatCurrency(filteredStats.totalRevenue) }}</p>
              <div class="flex items-center mt-1">
                <i v-if="filteredStats.revenueGrowth > 0" class="fas fa-arrow-up text-green-500 text-sm mr-1"></i>
                <i v-else class="fas fa-arrow-down text-red-500 text-sm mr-1"></i>
                <span :class="filteredStats.revenueGrowth > 0 ? 'text-green-600' : 'text-red-600'" class="text-sm">
                  {{ filteredStats.revenueGrowth }}%
                </span>
              </div>
            </div>
            <div class="p-3 rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
              <i class="fas fa-dollar-sign text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
                {{ getStatTitle('orders') }}
              </h3>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ filteredStats.totalOrders }}건</p>
              <div class="flex items-center mt-1">
                <i class="fas fa-arrow-up text-green-500 text-sm mr-1"></i>
                <span class="text-sm text-green-600">+{{ filteredStats.ordersGrowth }}%</span>
              </div>
            </div>
            <div class="p-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
              <i class="fas fa-chart-bar text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">평균 주문 금액</h3>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{
                formatCurrency(filteredStats.avgOrderAmount) }}</p>
              <span class="text-sm text-green-600">+{{ filteredStats.avgGrowth }}%</span>
            </div>
            <div class="p-3 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
              <i class="fas fa-credit-card text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">활성 고객 수</h3>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ filteredStats.activeCustomers }}</p>
              <span class="text-sm text-green-600">+{{ filteredStats.customersGrowth }}명</span>
            </div>
            <div class="p-3 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300">
              <i class="fas fa-users text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- 차트 섹션 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 매출 현황 -->
        <MonthlySale class="!dark:bg-gray-600" />

        <!-- 픽업지역별 매출 분포 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">픽업위치별 매출 분포</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ getChartDescription('trend') }} (픽업위치별 매출 비중)</p>
          </div>
          <div class="p-6">
            <div style="height: 300px;">
              <Pie :data="filteredChartData.service" :options="pieChartOptions" />
            </div>
          </div>
        </div>
      </div>

      <!-- 매출 추이 차트 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ getChartTitle('trend') }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 dark:text-white">{{ getChartDescription('trend') }}</p>
        </div>
        <div class="p-6">
          <div style="height: 300px;">
            <Bar :data="filteredChartData.trend" :options="barChartOptions" />
          </div>
        </div>
      </div>


      <!-- 거래 내역 (기간 필터링 적용) -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">거래 내역</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ selectedDateRange.start ? '선택된 기간 내' : '최근' }} 거래들을 확인할 수 있습니다.
                (총 {{ filteredTransactions.length }}건)
              </p>
            </div>
            <div class="text-sm text-gray-500">
              총 매출: {{formatCurrency(filteredTransactions.reduce((sum, t) => sum + t.amount, 0))}}
            </div>
          </div>
          <!-- 검색 및 필터 -->
          <div class="bg-white shadow dark:bg-gray-800 dark:shadow-none rounded-lg  p-4 pt-8">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <div class="relative">
                  <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                  <input type="text" v-model="searchQuery" placeholder="고객명 또는 거래번호로 검색"
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
                </div>
              </div>
              <div class="flex gap-2">
                <select v-model="statusFilter"
                  class="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
                  <option value="all">전체 상태</option>
                  <option value="completed">완료</option>
                  <option value="processing">처리중</option>
                  <option value="cancelled">취소</option>
                  <option value="refunded">환불</option>
                </select>
                <button
                  class="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                  <i class="fas fa-filter mr-2"></i>
                  필터
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="transaction in paginatedTransactions" :key="transaction.id"
              @click="openCreditedList(transaction)"
              class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors">
              <div class="flex items-center space-x-4">
                <div class="p-2 rounded-full bg-green-100 dark:bg-green-900">
                  <i class="fas fa-dollar-sign text-green-600 dark:text-green-300"></i>
                </div>
                <div>
                  <div class="flex items-center space-x-2">
                    <span class="font-medium text-gray-900 dark:text-white">{{ transaction.customerName }}</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{{ transaction.id }}</span>
                  </div>
                  <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{{ transaction.service }}</span>
                    <span class="font-semibold text-gray-900 dark:text-white">
                      {{ formatCurrency(transaction.amount) }}
                    </span>
                    <span class="dark:text-gray-400">{{ formatDateTime(transaction.date) }}</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <span :class="getPaymentMethodClass(transaction.paymentMethod)"
                  class="w-16 h-6 px-2 py-1 text-xs rounded-full text-center">
                  {{ transaction.paymentMethod }}
                </span>
                <span :class="getStatusClass(transaction.status)"
                  class="w-16 h-6 px-2 py-1 text-xs rounded-full text-center">
                  {{ transaction.status }}
                </span>
              </div>
            </div>
          </div>

          <!-- 페이지네이션 -->
          <div v-if="totalPages > 1" class="flex justify-center items-center space-x-2 mt-6">
            <button @click="currentPage--" :disabled="currentPage === 1"
              class="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
              이전
            </button>
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ currentPage }} / {{ totalPages }}
            </span>
            <button @click="currentPage++" :disabled="currentPage === totalPages"
              class="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
              다음
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 기간 설정 모달 -->
    <div v-if="showDateRangeModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">기간 설정</h3>
            <button @click="showDateRangeModal = false" class="text-gray-400 hover:text-gray-500">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="p-6 space-y-4">
          <!-- 빠른 선택 버튼들 -->
          <div class="grid grid-cols-3 gap-2">
            <button @click="setQuickDateRange('all')"
              class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white font-medium">
              전체 기간
            </button>
            <button @click="setQuickDateRange('today')"
              class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white">
              오늘
            </button>
            <button @click="setQuickDateRange('week')"
              class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white">
              이번 주
            </button>
            <button @click="setQuickDateRange('month')"
              class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white">
              이번 달
            </button>
            <button @click="setQuickDateRange('quarter')"
              class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white">
              분기
            </button>
            <button @click="setQuickDateRange('year')"
              class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white">
              올해
            </button>
          </div>

          <!-- 사용자 정의 기간 -->
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">시작일</label>
              <input type="date" v-model="tempDateRange.start"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">종료일</label>
              <input type="date" v-model="tempDateRange.end"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
          </div>
        </div>
        <div class="px-6 py-4 bg-gray-50 dark:bg-gray-800 flex justify-end space-x-3">
          <button @click="showDateRangeModal = false"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600">
            취소
          </button>
          <button @click="applyDateRange"
            class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            적용
          </button>
        </div>
      </div>
    </div>

    <!-- 매출 보고서 모달 (이전과 동일) -->
    <div v-if="showReportModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">매출 보고서 생성</h3>
            <button @click="showReportModal = false" class="text-gray-400 hover:text-gray-500">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="p-6 space-y-4">
          <!-- 현재 선택된 기간 표시 -->
          <div v-if="selectedDateRange.start && selectedDateRange.end"
            class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <div class="text-sm text-blue-800 dark:text-blue-200">
              <i class="fas fa-info-circle mr-1"></i>
              보고서 기간: {{ formatDate(selectedDateRange.start) }} ~ {{ formatDate(selectedDateRange.end) }}
            </div>
          </div>

          <!-- 보고서 유형 선택 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">보고서 유형</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input type="radio" v-model="reportType" value="summary" class="mr-2">
                <span class="text-sm text-gray-700 dark:text-gray-300">요약 보고서</span>
              </label>
              <label class="flex items-center">
                <input type="radio" v-model="reportType" value="detailed" class="mr-2">
                <span class="text-sm text-gray-700 dark:text-gray-300">상세 보고서</span>
              </label>
              <label class="flex items-center">
                <input type="radio" v-model="reportType" value="comparison" class="mr-2">
                <span class="text-sm text-gray-700 dark:text-gray-300">비교 분석 보고서</span>
              </label>
            </div>
          </div>

          <!-- 포함할 데이터 선택 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">포함할 데이터</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input type="checkbox" v-model="reportIncludes.sales" class="mr-2">
                <span class="text-sm text-gray-700 dark:text-gray-300">매출 현황</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" v-model="reportIncludes.transactions" class="mr-2">
                <span class="text-sm text-gray-700 dark:text-gray-300">거래 내역</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" v-model="reportIncludes.charts" class="mr-2">
                <span class="text-sm text-gray-700 dark:text-gray-300">차트 및 그래프</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" v-model="reportIncludes.analysis" class="mr-2">
                <span class="text-sm text-gray-700 dark:text-gray-300">분석 및 인사이트</span>
              </label>
            </div>
          </div>

          <!-- 파일 형식 선택 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">파일 형식</label>
            <div class="flex space-x-4">
              <label class="flex items-center">
                <input type="radio" v-model="reportFormat" value="pdf" class="mr-2">
                <span class="text-sm text-gray-700 dark:text-gray-300">PDF</span>
              </label>
              <label class="flex items-center">
                <input type="radio" v-model="reportFormat" value="excel" class="mr-2">
                <span class="text-sm text-gray-700 dark:text-gray-300">Excel</span>
              </label>
              <label class="flex items-center">
                <input type="radio" v-model="reportFormat" value="csv" class="mr-2">
                <span class="text-sm text-gray-700 dark:text-gray-300">CSV</span>
              </label>
            </div>
          </div>
        </div>
        <div class="px-6 py-4 bg-gray-50 dark:bg-gray-800 flex justify-end space-x-3">
          <button @click="showReportModal = false"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600">
            취소
          </button>
          <button @click="generateReport" :disabled="isGeneratingReport"
            class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50">
            <i v-if="isGeneratingReport" class="fas fa-spinner fa-spin mr-2"></i>
            {{ isGeneratingReport ? '생성 중...' : '보고서 생성' }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- 고객 결제 상세 모달 -->
  <template v-if="isModalOpen">
    <div class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 p-8 rounded-lg w-96">
        <h2 class="text-lg font-semibold mb-4 dark:text-gray-300">거래 상세 정보</h2>

        <div class="space-y-2 text-sm">
          <div class="flex">
            <strong class="w-20  text-gray-700 dark:text-gray-300">고객 이름:</strong>
            <span class="text-left dark:text-gray-300">{{ selectedTransaction.customerName }}</span>
          </div>
          <div class="flex">
            <strong class="w-20 text-gray-700 dark:text-gray-300">서비스 명:</strong>
            <span class="text-left dark:text-gray-300">{{ selectedTransaction.service }}</span>
          </div>
          <div class="flex">
            <strong class="w-20 text-gray-700 dark:text-gray-300">결제 금액:</strong>
            <span class="text-left dark:text-gray-300">{{ formatCurrency(selectedTransaction.amount) }}</span>
          </div>
          <div class="flex">
            <strong class="w-20 text-gray-700 dark:text-gray-300">거래 일시:</strong>
            <span class="text-left dark:text-gray-300">{{ formatDateTime(selectedTransaction.date) }}</span>
          </div>
          <div class="flex">
            <strong class="w-20 text-gray-700 dark:text-gray-300">결제 수단:</strong>
            <span :class="getPaymentMethodClass(selectedTransaction.paymentMethod)" class="text-left rounded">{{
              selectedTransaction.paymentMethod }}</span>
          </div>
          <div class="flex">
            <strong class="w-20 text-gray-700 dark:text-gray-300">결재 상태:</strong>
            <span :class="getStatusClass(selectedTransaction.status)" class="text-left rounded">{{
              selectedTransaction.status }}</span>
          </div>
        </div>

        <button @click="isModalOpen = false"
          class="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full text-center">
          닫기
        </button>
      </div>
    </div>
  </template>

</template>

<script setup lang="ts">
import { useAppStore } from '../../stores/useAppStore'
import { ref, computed, reactive, watch, nextTick, onMounted } from 'vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import MonthlySale from './components/MonthlySale.vue'
import { Pie, Bar } from 'vue-chartjs'
import {
  Chart,
  LineElement,
  PointElement,
} from 'chart.js'


Chart.register(
  ChartDataLabels,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

// Chart.js 등록
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels)

// 반응형 데이터
const searchQuery = ref('')
const statusFilter = ref('all')
const isLoadingData = ref(false)
const currentPage = ref(1)
const itemsPerPage = 5

// 모달 상태
const showDateRangeModal = ref(false)
const showReportModal = ref(false)
const isGeneratingReport = ref(false)

// 고객 결제 상세 모달
const isModalOpen = ref(false)
const selectedTransaction = ref(null)

function openCreditedList(transaction) {
  selectedTransaction.value = transaction
  isModalOpen.value = true
}


// 기간 설정 관련
const selectedDateRange = ref({
  start: '',
  end: ''
})

const tempDateRange = ref({
  start: '',
  end: ''
})

// 보고서 설정
const reportType = ref('summary')
const reportFormat = ref('pdf')
const reportIncludes = ref({
  sales: true,
  transactions: true,
  charts: true,
  analysis: false
})


// 전체 데이터 (실제로는 API에서 가져올 데이터)
const allTransactions = ref([
  // 기본 20개 데이터 (날짜 6월 이전, service 포함)
  {
    id: 'TXN-001',
    customerName: '김철수',
    service: '대구공항',
    bagCount: "2",
    bagSize: "extrasizebag-1,largebag-1",
    amount: 36000, // 20000*1 + 16000*1
    date: '2025-01-15 10:30',
    status: '완료',
    paymentMethod: '카드',
  },
  {
    id: 'TXN-002',
    customerName: '박영희',
    service: '동대구역',
    bagCount: "3",
    bagSize: "mediumbag-2,smallbag-1",
    amount: 294000, // 140000*2 + 12000*1
    date: '2025-01-20 09:15',
    status: '완료',
    paymentMethod: '현금',
  },
  {
    id: 'TXN-003',
    customerName: '이민수',
    service: '서대구역',
    bagCount: "1",
    bagSize: "smallbag-1",
    amount: 12000,
    date: '2025-02-05 08:45',
    status: '완료',
    paymentMethod: '카드',
  },
  {
    id: 'TXN-004',
    customerName: '최지혜',
    service: '숙소',
    bagCount: "4",
    bagSize: "extrasizebag-2,largebag-1,smallbag-1",
    amount: 72000, // 20000*2 + 16000*1 + 12000*1
    date: '2025-02-10 16:20',
    status: '완료',
    paymentMethod: '계좌이체',
  },
  {
    id: 'TXN-005',
    customerName: '정유진',
    service: '대구공항',
    bagCount: "2",
    bagSize: "mediumbag-1,largebag-1",
    amount: 156000, // 140000*1 + 16000*1
    date: '2025-03-01 14:10',
    status: '처리중',
    paymentMethod: '카드',
  },
  {
    id: 'TXN-006',
    customerName: '홍길동',
    service: '동대구역',
    bagCount: "3",
    bagSize: "largebag-2,smallbag-1",
    amount: 44000, // 16000*2 + 12000*1
    date: '2025-03-15 11:30',
    status: '완료',
    paymentMethod: '카드',
  },
  {
    id: 'TXN-007',
    customerName: '김영수',
    service: '서대구역',
    bagCount: "1",
    bagSize: "extrasizebag-1",
    amount: 20000,
    date: '2025-04-02 13:45',
    status: '완료',
    paymentMethod: '현금',
  },
  {
    id: 'TXN-008',
    customerName: '이영희',
    service: '숙소',
    bagCount: "5",
    bagSize: "mediumbag-3,smallbag-2",
    amount: 444000, // 140000*3 + 12000*2
    date: '2025-04-18 16:00',
    status: '완료',
    paymentMethod: '카드',
  },
  {
    id: 'TXN-009',
    customerName: '박민수',
    service: '대구공항',
    bagCount: "2",
    bagSize: "largebag-2",
    amount: 32000,
    date: '2025-05-05 09:20',
    status: '완료',
    paymentMethod: '계좌이체',
  },
  {
    id: 'TXN-010',
    customerName: '최수진',
    service: '동대구역',
    bagCount: "3",
    bagSize: "extrasizebag-1,mediumbag-2",
    amount: 300000, // 20000*1 + 140000*2
    date: '2025-05-25 15:30',
    status: '완료',
    paymentMethod: '카드',
  },
  {
    id: 'TXN-011',
    customerName: '조하나',
    service: '서대구역',
    bagCount: "1",
    bagSize: "smallbag-1",
    amount: 12000,
    date: '2025-06-01 12:10',
    status: '완료',
    paymentMethod: '현금',
  },
  {
    id: 'TXN-012',
    customerName: '서준',
    service: '숙소',
    bagCount: "2",
    bagSize: "extrasizebag-1,largebag-1",
    amount: 36000,
    date: '2025-06-10 09:40',
    status: '처리중',
    paymentMethod: '카드',
  },
  {
    id: 'TXN-013',
    customerName: '강민',
    service: '대구공항',
    bagCount: "4",
    bagSize: "mediumbag-2,smallbag-2",
    amount: 304000,
    date: '2025-06-15 14:25',
    status: '완료',
    paymentMethod: '계좌이체',
  },
  {
    id: 'TXN-014',
    customerName: '윤서',
    service: '동대구역',
    bagCount: "3",
    bagSize: "largebag-3",
    amount: 48000,
    date: '2025-06-20 08:50',
    status: '완료',
    paymentMethod: '카드',
  },
  {
    id: 'TXN-015',
    customerName: '한결',
    service: '서대구역',
    bagCount: "5",
    bagSize: "extrasizebag-2,largebag-1,smallbag-2",
    amount: 88000,
    date: '2025-06-25 10:15',
    status: '완료',
    paymentMethod: '현금',
  },
  {
    id: 'TXN-016',
    customerName: '김하늘',
    service: '숙소',
    bagCount: "2",
    bagSize: "mediumbag-2",
    amount: 280000,
    date: '2025-06-27 11:00',
    status: '완료',
    paymentMethod: '카드',
  },
  {
    id: 'TXN-017',
    customerName: '이준',
    service: '대구공항',
    bagCount: "3",
    bagSize: "extrasizebag-1,largebag-2",
    amount: 52000,
    date: '2025-06-28 15:30',
    status: '완료',
    paymentMethod: '계좌이체',
  },
  {
    id: 'TXN-018',
    customerName: '박서연',
    service: '동대구역',
    bagCount: "1",
    bagSize: "extrasizebag-1",
    amount: 20000,
    date: '2025-06-29 09:45',
    status: '완료',
    paymentMethod: '카드',
  },
  {
    id: 'TXN-019',
    customerName: '최민준',
    service: '서대구역',
    bagCount: "2",
    bagSize: "largebag-2",
    amount: 32000,
    date: '2025-06-29 16:20',
    status: '완료',
    paymentMethod: '현금',
  },
  {
    id: 'TXN-020',
    customerName: '한지민',
    service: '숙소',
    bagCount: "4",
    bagSize: "mediumbag-3,smallbag-1",
    amount: 432000,
    date: '2025-06-30 14:10',
    status: '완료',
    paymentMethod: '계좌이체',
  },

  // 나머지 100개 랜덤 생성 (날짜 2025-01-01 ~ 2025-06-30, service 랜덤)
  ...Array.from({ length: 100 }).map((_, i) => {
    const idNum = i + 21;
    const id = `TXN-${String(idNum).padStart(3, '0')}`;

    const customers = [
      '김철수', '박영희', '이민수', '최지혜', '정유진', '홍길동',
      '김영수', '이영희', '박민수', '최수진', '조하나', '서준',
      '강민', '윤서', '한결', '김하늘', '이준', '박서연',
      '최민준', '한지민', '서연', '동현', '민재', '수빈',
    ];
    const statuses = ['완료', '처리중', '취소'];
    const paymentMethods = ['카드', '현금', '계좌이체'];
    const services = ['대구공항', '동대구역', '서대구역', '숙소'];

    const year = 2025;
    const month = Math.floor(Math.random() * 6) + 1; // 1~6월 (6월까지)
    const day = Math.floor(Math.random() * 28) + 1;
    const hour = Math.floor(Math.random() * 9) + 8;
    const minute = Math.floor(Math.random() * 60);

    const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

    const customerName = customers[Math.floor(Math.random() * customers.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    const service = services[Math.floor(Math.random() * services.length)];

    const bagSizes = ['extrasizebag', 'largebag', 'mediumbag', 'smallbag'];
    const priceMap = {
      extrasizebag: 20000,
      largebag: 16000,
      mediumbag: 140000,
      smallbag: 12000,
    };

    const totalBags = Math.floor(Math.random() * 5) + 1; // 1~5개 가방
    const numSizesUsed = Math.floor(Math.random() * Math.min(3, totalBags)) + 1;

    let counts = new Array(numSizesUsed).fill(1);
    let remain = totalBags - numSizesUsed;
    while (remain > 0) {
      counts[Math.floor(Math.random() * numSizesUsed)]++;
      remain--;
    }

    let selectedSizes = [];
    while (selectedSizes.length < numSizesUsed) {
      const candidate = bagSizes[Math.floor(Math.random() * bagSizes.length)];
      if (!selectedSizes.includes(candidate)) selectedSizes.push(candidate);
    }

    const bagSizeArr = selectedSizes.map((size, i) => `${size}-${counts[i]}`);
    const bagSizeStr = bagSizeArr.join(',');

    let amount = 0;
    for (let i = 0; i < numSizesUsed; i++) {
      amount += priceMap[selectedSizes[i]] * counts[i];
    }
    const extra = Math.floor(Math.random() * 5) * 1000;
    amount += extra;

    return {
      id,
      customerName,
      service,
      bagCount: totalBags.toString(),
      bagSize: bagSizeStr,
      amount,
      date,
      status,
      paymentMethod,
    };
  }),
]);

// 기간에 따른 데이터 필터링
const filteredTransactions = computed(() => {
  let result = [...allTransactions.value]

  // 기간 필터링
  if (selectedDateRange.value.start && selectedDateRange.value.end) {
    const startDate = new Date(selectedDateRange.value.start)
    const endDate = new Date(selectedDateRange.value.end)
    endDate.setHours(23, 59, 59, 999) // 종료일 끝까지 포함

    result = result.filter(transaction => {
      const transactionDate = new Date(transaction.date)
      return transactionDate >= startDate && transactionDate <= endDate
    })
  }

  // 검색 필터링
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      (t) =>
        t.customerName.toLowerCase().includes(query) ||
        t.id.toLowerCase().includes(query)
    )
  }

  // 상태 필터링
  if (statusFilter.value !== 'all') {
    const statusMap = {
      completed: '완료',
      processing: '처리중',
      cancelled: '취소',
      refunded: '환불'
    } as Record<string, string>
    result = result.filter((t) => t.status === statusMap[statusFilter.value])
  }

  return result
})

// 페이지네이션
const totalPages = computed(() => Math.ceil(filteredTransactions.value.length / itemsPerPage))
const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredTransactions.value.slice(start, end)
})

// 기간별 통계 계산
const filteredStats = computed(() => {
  const transactions = filteredTransactions.value
  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0)
  const totalOrders = transactions.length
  const avgOrderAmount = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0
  const activeCustomers = new Set(transactions.map(t => t.customerName)).size

  // 이전 기간과의 비교를 위한 더미 데이터
  const revenueGrowth = 12.5
  const ordersGrowth = 8.3
  const avgGrowth = 5.2
  const customersGrowth = 15

  return {
    totalRevenue,
    totalOrders,
    avgOrderAmount,
    activeCustomers,
    revenueGrowth,
    ordersGrowth,
    avgGrowth,
    customersGrowth
  }
})

// 기간별 차트 데이터 생성
const filteredChartData = computed(() => {
  const transactions = filteredTransactions.value
  const trend = generateTrendData(transactions)

  // 기간별 매출 분석
  const periodData = generatePeriodData(transactions)

  // 서비스별 매출 분석
  const serviceData = generateServiceData(transactions)

  // 추이 데이터 생성
  const trendData = generateTrendData(transactions)

  return {
    period: {
      labels: periodData.map(item => item.label),

      datasets: [{
        backgroundColor: ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'],
        data: periodData.map(item => item.amount),
      }]
    },
    service: {
      labels: serviceData.map(item => item.service),
      datasets: [{
        backgroundColor: ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'],
        data: serviceData.map(item => item.amount),
      }]
    },
    trend: {
      labels: trendData.map(item => item.period),
      datasets: [
        {
          type: 'bar',
          label: '매출액',
          backgroundColor: '#3B82F6',
          data: trendData.map(item => item.revenue),
          yAxisID: 'y',
          datalabels: {
            color: '#3B82F6',
            anchor: 'end',
            align: 'top',
            font: {
              weight: 'bold',
            },
            formatter: value => value.toLocaleString()
          }
        },
        {
          type: 'line',
          label: '주문 건수',
          data: trendData.map(item => item.orders),
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          pointBackgroundColor: '#10B981',
          pointBorderColor: '#10B981',
          pointRadius: 4,
          tension: 0.4,
          fill: false,
          yAxisID: 'y1',
          datalabels: {
            color: '#10B981', // 초록색
            anchor: 'end',
            align: 'top',
            font: {
              weight: 'bold',
            },
            formatter: value => `${value}건`
          }
        }
      ]
    }
  }
})


// 기간별 데이터 생성 함수
const generatePeriodData = (transactions: any[]) => {
  if (!selectedDateRange.value.start || !selectedDateRange.value.end) {
    // 기본 월별 데이터
    const monthlyData = [
      { label: '1월', amount: 0 },
      { label: '2월', amount: 0 },
      { label: '3월', amount: 0 },
      { label: '4월', amount: 0 },
      { label: '5월', amount: 0 },
      { label: '6월', amount: 0 },
    ]

    transactions.forEach(t => {
      const month = new Date(t.date).getMonth()
      if (month < 6) {
        monthlyData[month].amount += t.amount
      }
    })

    return monthlyData.filter(item => item.amount > 0)
  }

  // 선택된 기간에 따른 동적 데이터 생성
  const startDate = new Date(selectedDateRange.value.start)
  const endDate = new Date(selectedDateRange.value.end)
  const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

  if (daysDiff <= 7) {
    // 일별 데이터
    return generateDailyData(transactions, startDate, endDate)
  } else if (daysDiff <= 31) {
    // 주별 데이터
    return generateWeeklyData(transactions, startDate, endDate)
  } else {
    // 월별 데이터
    return generateMonthlyData(transactions, startDate, endDate)
  }
}

const generateDailyData = (transactions: any[], startDate: Date, endDate: Date) => {
  const dailyData: any[] = []
  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0]
    const dayTransactions = transactions.filter(t => t.date.startsWith(dateStr))
    const amount = dayTransactions.reduce((sum, t) => sum + t.amount, 0)

    if (amount > 0) {
      dailyData.push({
        label: `${currentDate.getMonth() + 1}/${currentDate.getDate()}`,
        amount
      })
    }

    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dailyData
}

const generateWeeklyData = (transactions: any[], startDate: Date, endDate: Date) => {
  const weeklyData: any[] = []
  let weekStart = new Date(startDate)
  let weekNum = 1

  while (weekStart <= endDate) {
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 6)

    const weekTransactions = transactions.filter(t => {
      const tDate = new Date(t.date)
      return tDate >= weekStart && tDate <= weekEnd
    })

    const amount = weekTransactions.reduce((sum, t) => sum + t.amount, 0)

    if (amount > 0) {
      weeklyData.push({
        label: `${weekNum}주차`,
        amount
      })
    }

    weekStart.setDate(weekStart.getDate() + 7)
    weekNum++
  }

  return weeklyData
}

const generateMonthlyData = (transactions: any[], startDate: Date, endDate: Date) => {
  const monthlyData: any[] = []
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

  for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year++) {
    const startMonth = year === startDate.getFullYear() ? startDate.getMonth() : 0
    const endMonth = year === endDate.getFullYear() ? endDate.getMonth() : 11

    for (let month = startMonth; month <= endMonth; month++) {
      const monthTransactions = transactions.filter(t => {
        const tDate = new Date(t.date)
        return tDate.getFullYear() === year && tDate.getMonth() === month
      })

      const amount = monthTransactions.reduce((sum, t) => sum + t.amount, 0)

      if (amount > 0) {
        monthlyData.push({
          label: `${year === new Date().getFullYear() ? '' : year + '년 '}${months[month]}`,
          amount
        })
      }
    }
  }

  return monthlyData
}

const generateServiceData = (transactions: any[]) => {
  const serviceMap = new Map()

  transactions.forEach(t => {
    const current = serviceMap.get(t.service) || 0
    serviceMap.set(t.service, current + t.amount)
  })

  return Array.from(serviceMap.entries()).map(([service, amount]) => ({
    service,
    amount
  }))
}

const generateTrendData = (transactions: any[]) => {
  const defaultData = [
    { period: '1주', revenue: 1800000, orders: 45 },
    { period: '2주', revenue: 2100000, orders: 52 },
    { period: '3주', revenue: 1950000, orders: 48 },
    { period: '4주', revenue: 2300000, orders: 58 },
    { period: '5주', revenue: 2050000, orders: 51 },
    { period: '6주', revenue: 2400000, orders: 62 },
  ]

  // 날짜 범위 없을 때 기본 주차 데이터 반환
  if (!selectedDateRange.value.start || !selectedDateRange.value.end) {
    return defaultData
  }

  const startDate = new Date(selectedDateRange.value.start)
  const endDate = new Date(selectedDateRange.value.end)
  const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

  // 일별 추이 (1주 이하)
  if (daysDiff <= 7) {
    return generateDailyTrend(transactions, startDate, endDate)
  }

  // 주별 추이 (8일 이상)
  return generateWeeklyTrend(transactions, startDate, endDate)
}

const generateDailyTrend = (transactions: any[], start: Date, end: Date) => {
  const result: { period: string; revenue: number; orders: number }[] = []

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dayKey = d.toISOString().split('T')[0]

    const filtered = transactions.filter(tx => tx.date === dayKey)
    const revenue = filtered.reduce((sum, tx) => sum + tx.amount, 0)
    const orders = filtered.length

    result.push({
      period: `${d.getMonth() + 1}/${d.getDate()}`,
      revenue,
      orders,
    })
  }

  return result
}

const generateWeeklyTrend = (transactions: any[], start: Date, end: Date) => {
  const result: { period: string; revenue: number; orders: number }[] = []
  let weekIndex = 1

  for (let d = new Date(start); d <= end;) {
    const weekStart = new Date(d)
    const weekEnd = new Date(d)
    weekEnd.setDate(weekEnd.getDate() + 6)

    const filtered = transactions.filter(tx => {
      const txDate = new Date(tx.date)
      return txDate >= weekStart && txDate <= weekEnd
    })

    const revenue = filtered.reduce((sum, tx) => sum + tx.amount, 0)
    const orders = filtered.length

    result.push({
      period: `${weekIndex}주`,
      revenue,
      orders,
    })

    d.setDate(d.getDate() + 7)
    weekIndex++
  }

  return result
}
// 차트 옵션
const barChartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#444',
        usePointStyle: true,
      },
    },
    tooltip: {
      callbacks: {
        label(context: any) {
          if (context.dataset.label === '매출액') {
            return `매출액: ${formatCurrency(context.parsed.y)}`
          } else {
            return `주문 건수: ${context.parsed.y}건`
          }
        }
      }
    }
  },
  scales: {
    y: {
      type: 'linear',
      position: 'left',
      beginAtZero: true,
      grid: {
        color: '#444',
      },
      ticks: {
        color: '#444',
      },
      title: {
        display: true,
        text: '매출액',
        color: '#444',
      },
    },
    y1: {
      type: 'linear',
      position: 'right',
      beginAtZero: true,
      grid: {
        drawOnChartArea: false,
      },
      ticks: {
        color: '#444',
      },
      title: {
        display: true,
        text: '주문 건수',
        color: '#444',
      },
    },
    x: {
      grid: {
        color: '#444',
      },
      ticks: {
        color: '#444',
      },
    }
  }
})

const barChartData = ref({
  labels: ['1월', '2월', '3월', '4월', '5월'],
  datasets: [
    {
      label: '매출액',
      data: [1000000, 1500000, 1200000, 1800000, 1300000],
      backgroundColor: '#4BC0C0',
      yAxisID: 'y',
    },
    {
      label: '주문 건수',
      data: [120, 140, 110, 160, 130],
      backgroundColor: '#FF6384',
      yAxisID: 'y1',
    }
  ]
})
// 도넛 차트
const pieChartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      color: '#FFFFFF',
      font: {
        weight: 'normal',
      },
      formatter: (value, context) => {
        const label = context.chart.data.labels[context.dataIndex]
        return [label, formatCurrency(value)]
      },
      anchor: 'center',   // 데이터 라벨을 중간에 붙임
      align: 'center',    // 중간 정렬
      offset: 10       // 도넛에서 얼마나 떨어질지 (px)
    },
    legend: {
      position: 'bottom',
      labels: {
        color: '#aaa',
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.label}: ${formatCurrency(context.parsed)}`
        }
      }
    }
  },
})
const pieChartData = reactive({
  labels: ['A', 'B', 'C'],
  datasets: [
    {
      data: [10, 20, 30],
      backgroundColor: ['#f00', '#0f0', '#00f'],
    }
  ]
})

// 픽업별 도넛차트 속 글자색 다크시 흰색
const chartInstance = ref(null)

// 다크모드 당겨오기
 const appStore = useAppStore()
const isDarkMode = computed(() => appStore.isDarkMode)

// watch
// barchart darkmode
watch(isDarkMode, async (dark) => {
  console.log('다크모드 변경됨:', dark)
  const colorMain = dark ? '#aaa' : '#444'
  const legendColor = dark ? '#fff' : '#444'

  const scales = barChartOptions.scales
  barChartOptions.plugins.legend.labels.color = legendColor

  scales.x.ticks.color = colorMain
  scales.x.grid.color = colorMain

  scales.y.ticks.color = colorMain
  scales.y.grid.color = colorMain
  scales.y.title.color = colorMain

  scales.y1.ticks.color = colorMain
  scales.y1.title.color = colorMain

  await nextTick()

  if (chartInstance.value) {
    chartInstance.value.destroy()
  }

  const ctx = document.getElementById('barChart')
  if (!ctx) return

  chartInstance.value = new Chart(ctx, {
    type: 'bar',
    data: barChartData,
    options: barChartOptions,
  })
}, { immediate: true })

// dounught darkmode
 watch(isDarkMode, async (dark) => {
  // 픽업위치별 도넛 차트 다크 옵션 업데이트
  pieChartOptions.plugins.datalabels.color = dark ? '#ffffff' : '#ffffff'
  pieChartOptions.plugins.legend.labels.color = dark ? '#aaa' : '#444'


  await nextTick()

  // 기존 차트 제거
  if (chartInstance.value) {
    chartInstance.value.destroy()
  }

  // 새 차트 생성
 const ctx = document.getElementById('myChart')
if (!ctx) {
  console.warn('myChart element not found')
  return
}
  chartInstance.value = new Chart(ctx, {
    type: 'doughnut',
    data: pieChartData,
    options: pieChartOptions,
    plugins: [ChartDataLabels],
  })
}, { immediate: true })

// 기간 설정 함수들
const setQuickDateRange = (period: string) => {
  const today = new Date()
  const formatDate = (date: Date) => date.toISOString().split('T')[0]

  switch (period) {
    case 'all':
      // 전체 기간 - 가장 오래된 거래부터 오늘까지
      const oldestTransaction = allTransactions.value.reduce((oldest, current) => {
        return new Date(current.date) < new Date(oldest.date) ? current : oldest
      }, allTransactions.value[0])

      if (oldestTransaction) {
        tempDateRange.value.start = oldestTransaction.date.split(' ')[0] // 날짜 부분만 추출
        tempDateRange.value.end = formatDate(today)
      } else {
        // 거래가 없는 경우 올해 전체
        tempDateRange.value.start = formatDate(new Date(today.getFullYear(), 0, 1))
        tempDateRange.value.end = formatDate(today)
      }
      break
    case 'today':
      tempDateRange.value.start = formatDate(today)
      tempDateRange.value.end = formatDate(today)
      break
    case 'week':
      const weekStart = new Date(today)
      weekStart.setDate(today.getDate() - today.getDay())
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6)
      tempDateRange.value.start = formatDate(weekStart)
      tempDateRange.value.end = formatDate(weekEnd)
      break
    case 'month':
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
      const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      tempDateRange.value.start = formatDate(monthStart)
      tempDateRange.value.end = formatDate(monthEnd)
      break
    case 'quarter':
      const quarterStart = new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1)
      const quarterEnd = new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3 + 3, 0)
      tempDateRange.value.start = formatDate(quarterStart)
      tempDateRange.value.end = formatDate(quarterEnd)
      break
    case 'year':
      const yearStart = new Date(today.getFullYear(), 0, 1)
      const yearEnd = new Date(today.getFullYear(), 11, 31)
      tempDateRange.value.start = formatDate(yearStart)
      tempDateRange.value.end = formatDate(yearEnd)
      break
  }
}

const applyDateRange = async () => {
  isLoadingData.value = true
  selectedDateRange.value = { ...tempDateRange.value }
  showDateRangeModal.value = false
  currentPage.value = 1 // 페이지 초기화

  // 데이터 로딩 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 1000))
  isLoadingData.value = false
}

const resetDateRange = () => {
  selectedDateRange.value = { start: '', end: '' }
  currentPage.value = 1
}

// 보고서 생성 함수
const generateReport = async () => {
  isGeneratingReport.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 2000))

    const reportData = {
      type: reportType.value,
      dateRange: selectedDateRange.value,
      format: reportFormat.value,
      includes: reportIncludes.value,
      stats: filteredStats.value,
      transactionCount: filteredTransactions.value.length,
      generatedAt: new Date().toISOString()
    }

    console.log('보고서 생성 완료:', reportData)
    alert(`${reportFormat.value.toUpperCase()} 형식의 보고서가 생성되었습니다.\n기간: ${selectedDateRange.value.start || '전체'} ~ ${selectedDateRange.value.end || '현재'}\n거래 건수: ${filteredTransactions.value.length}건`)

    showReportModal.value = false
  } catch (error) {
    console.error('보고서 생성 실패:', error)
    alert('보고서 생성 중 오류가 발생했습니다.')
  } finally {
    isGeneratingReport.value = false
  }
}

// 유틸리티 함수들
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount)
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('ko-KR')
}

const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString)
  return new Date(dateString).toLocaleString('ko-KR')
}

const getDaysDifference = (): number => {
  if (!selectedDateRange.value.start || !selectedDateRange.value.end) return 0
  const start = new Date(selectedDateRange.value.start)
  const end = new Date(selectedDateRange.value.end)
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
}

const getStatTitle = (type: string): string => {
  if (!selectedDateRange.value.start || !selectedDateRange.value.end) {
    return type === 'revenue' ? '전체 매출' : '전체 주문'
  }

  if (isAllPeriod.value) {
    return type === 'revenue' ? '전체 매출' : '전체 주문'
  }

  const days = getDaysDifference()
  if (days === 1) return type === 'revenue' ? '선택일 매출' : '선택일 주문'
  if (days <= 7) return type === 'revenue' ? '주간 매출' : '주간 주문'
  if (days <= 31) return type === 'revenue' ? '월간 매출' : '월간 주문'
  return type === 'revenue' ? '기간 매출' : '기간 주문'
}

const getChartTitle = (type: string): string => {
  if (!selectedDateRange.value.start || !selectedDateRange.value.end) {
    return type === 'period' ? '매출 현황' : '매출 추이'
  }

  if (isAllPeriod.value) {
    return type === 'period' ? '전체 기간 매출 현황' : '전체 기간 매출 추이'
  }

  const days = getDaysDifference()
  if (type === 'period') {
    if (days === 1) return '일별 매출 현황'
    if (days <= 7) return '주별 매출 현황'
    if (days <= 31) return '월별 매출 현황'
    return '매출 현황'
  } else {
    if (days === 1) return '일별 매출 추이'
    if (days <= 7) return '주별 매출 추이'
      if (days <= 31) return '월별 매출 추이'
    return '매출 추이'
  }
}

const getChartDescription = (type: string): string => {
  if (!selectedDateRange.value.start || !selectedDateRange.value.end) {
    return type === 'period' ? '최근 6개월간 매출 현황를 확인할 수 있습니다.' : '최근 6주간의 매출과 주문 건수 추이를 확인할 수 있습니다.'
  }

  if (isAllPeriod.value) {
    return `전체 기간의 ${type === 'period' ? '매출 분포' : '매출 추이'}를 확인할 수 있습니다.`
  }

  return `선택된 기간(${formatDate(selectedDateRange.value.start)} ~ ${formatDate(selectedDateRange.value.end)})의 ${type === 'period' ? '매출 분포' : '매출 추이'}를 확인할 수 있습니다.`
}

const getStatusClass = (status: string): string => {
  const statusClasses = {
    '완료': 'bg-green-100 text-green-800',
    '처리중': 'bg-blue-100 text-blue-800',
    '취소': 'bg-red-100 text-red-800',
    '환불': 'bg-yellow-100 text-yellow-800',
  } as Record<string, string>
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getPaymentMethodClass = (method: string): string => {
  const methodClasses = {
    '카드': 'bg-purple-100 text-purple-800',
    '현금': 'bg-green-100 text-green-800',
    '계좌이체': 'bg-blue-100 text-blue-800',
  } as Record<string, string>
  return methodClasses[method] || 'bg-gray-100 text-gray-800'
}

// 기간 변경 시 페이지 초기화
watch(selectedDateRange, () => {
  currentPage.value = 1
}, { deep: true })

// 전체 기간인지 확인
const isAllPeriod = computed(() => {
  if (!selectedDateRange.value.start || !selectedDateRange.value.end || allTransactions.value.length === 0) {
    return false
  }

  const oldestTransaction = allTransactions.value.reduce((oldest, current) => {
    return new Date(current.date) < new Date(oldest.date) ? current : oldest
  }, allTransactions.value[0])

  const oldestDate = oldestTransaction.date.split(' ')[0]
  const today = new Date().toISOString().split('T')[0]

  return selectedDateRange.value.start === oldestDate && selectedDateRange.value.end === today
})

</script>

<style scoped>
.fas {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}
</style>
