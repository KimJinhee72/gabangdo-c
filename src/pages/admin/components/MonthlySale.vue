<template>
  <!-- 매출 현황 -->
  <div class="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow">
    <div
      class="p-6 border-b border-gray-200 dark:border-gray-700 dark:text-white">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ getChartTitle("period") }}
      </h3>
      <p class="text-sm text-gray-600 dark:text-white">
        {{ getChartDescription("period") }}
      </p>
    </div>
    <div class="p-6">
      <div style="height: 300px">
        <Pie :data="filteredChartData.period" :options="pieChartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from "vue";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "vue-chartjs";

import { Chart, LineElement, PointElement } from "chart.js";

Chart.register(ChartDataLabels);
Chart.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

// Chart.js 등록
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels
);

// 반응형 데이터
const searchQuery = ref("");
const statusFilter = ref("all");
const isLoadingData = ref(false);
const currentPage = ref(1);
const itemsPerPage = 5;

// 모달 상태
const showDateRangeModal = ref(false);
const showReportModal = ref(false);
const isGeneratingReport = ref(false);

// 기간 설정 관련
const selectedDateRange = ref({
  start: "",
  end: "",
});

// 전체 데이터 (실제로는 API에서 가져올 데이터)
const allTransactions = ref([
  // 기본 20개 데이터 (날짜 6월 이전, service 포함)
  {
    id: "TXN-001",
    customerName: "김철수",
    service: "대구공항",
    bagCount: "2",
    bagSize: "extrasizebag-1,largebag-1",
    amount: 36000, // 20000*1 + 16000*1
    date: "2025-01-15 10:30",
    status: "완료",
    paymentMethod: "카드",
  },
  {
    id: "TXN-002",
    customerName: "박영희",
    service: "동대구역",
    bagCount: "3",
    bagSize: "mediumbag-2,smallbag-1",
    amount: 294000, // 140000*2 + 12000*1
    date: "2025-01-20 09:15",
    status: "완료",
    paymentMethod: "현금",
  },
  {
    id: "TXN-003",
    customerName: "이민수",
    service: "서대구역",
    bagCount: "1",
    bagSize: "smallbag-1",
    amount: 12000,
    date: "2025-02-05 08:45",
    status: "완료",
    paymentMethod: "카드",
  },
  {
    id: "TXN-004",
    customerName: "최지혜",
    service: "숙소",
    bagCount: "4",
    bagSize: "extrasizebag-2,largebag-1,smallbag-1",
    amount: 72000, // 20000*2 + 16000*1 + 12000*1
    date: "2025-02-10 16:20",
    status: "완료",
    paymentMethod: "계좌이체",
  },
  {
    id: "TXN-005",
    customerName: "정유진",
    service: "대구공항",
    bagCount: "2",
    bagSize: "mediumbag-1,largebag-1",
    amount: 156000, // 140000*1 + 16000*1
    date: "2025-03-01 14:10",
    status: "처리중",
    paymentMethod: "카드",
  },
  {
    id: "TXN-006",
    customerName: "홍길동",
    service: "동대구역",
    bagCount: "3",
    bagSize: "largebag-2,smallbag-1",
    amount: 44000, // 16000*2 + 12000*1
    date: "2025-03-15 11:30",
    status: "완료",
    paymentMethod: "카드",
  },
  {
    id: "TXN-007",
    customerName: "김영수",
    service: "서대구역",
    bagCount: "1",
    bagSize: "extrasizebag-1",
    amount: 20000,
    date: "2025-04-02 13:45",
    status: "완료",
    paymentMethod: "현금",
  },
  {
    id: "TXN-008",
    customerName: "이영희",
    service: "숙소",
    bagCount: "5",
    bagSize: "mediumbag-3,smallbag-2",
    amount: 444000, // 140000*3 + 12000*2
    date: "2025-04-18 16:00",
    status: "완료",
    paymentMethod: "카드",
  },
  {
    id: "TXN-009",
    customerName: "박민수",
    service: "대구공항",
    bagCount: "2",
    bagSize: "largebag-2",
    amount: 32000,
    date: "2025-05-05 09:20",
    status: "완료",
    paymentMethod: "계좌이체",
  },
  {
    id: "TXN-010",
    customerName: "최수진",
    service: "동대구역",
    bagCount: "3",
    bagSize: "extrasizebag-1,mediumbag-2",
    amount: 300000, // 20000*1 + 140000*2
    date: "2025-05-25 15:30",
    status: "완료",
    paymentMethod: "카드",
  },
  {
    id: "TXN-011",
    customerName: "조하나",
    service: "서대구역",
    bagCount: "1",
    bagSize: "smallbag-1",
    amount: 12000,
    date: "2025-06-01 12:10",
    status: "완료",
    paymentMethod: "현금",
  },
  {
    id: "TXN-012",
    customerName: "서준",
    service: "숙소",
    bagCount: "2",
    bagSize: "extrasizebag-1,largebag-1",
    amount: 36000,
    date: "2025-06-10 09:40",
    status: "처리중",
    paymentMethod: "카드",
  },
  {
    id: "TXN-013",
    customerName: "강민",
    service: "대구공항",
    bagCount: "4",
    bagSize: "mediumbag-2,smallbag-2",
    amount: 304000,
    date: "2025-06-15 14:25",
    status: "완료",
    paymentMethod: "계좌이체",
  },
  {
    id: "TXN-014",
    customerName: "윤서",
    service: "동대구역",
    bagCount: "3",
    bagSize: "largebag-3",
    amount: 48000,
    date: "2025-06-20 08:50",
    status: "완료",
    paymentMethod: "카드",
  },
  {
    id: "TXN-015",
    customerName: "한결",
    service: "서대구역",
    bagCount: "5",
    bagSize: "extrasizebag-2,largebag-1,smallbag-2",
    amount: 88000,
    date: "2025-06-25 10:15",
    status: "완료",
    paymentMethod: "현금",
  },
  {
    id: "TXN-016",
    customerName: "김하늘",
    service: "숙소",
    bagCount: "2",
    bagSize: "mediumbag-2",
    amount: 280000,
    date: "2025-06-27 11:00",
    status: "완료",
    paymentMethod: "카드",
  },
  {
    id: "TXN-017",
    customerName: "이준",
    service: "대구공항",
    bagCount: "3",
    bagSize: "extrasizebag-1,largebag-2",
    amount: 52000,
    date: "2025-06-28 15:30",
    status: "완료",
    paymentMethod: "계좌이체",
  },
  {
    id: "TXN-018",
    customerName: "박서연",
    service: "동대구역",
    bagCount: "1",
    bagSize: "extrasizebag-1",
    amount: 20000,
    date: "2025-06-29 09:45",
    status: "완료",
    paymentMethod: "카드",
  },
  {
    id: "TXN-019",
    customerName: "최민준",
    service: "서대구역",
    bagCount: "2",
    bagSize: "largebag-2",
    amount: 32000,
    date: "2025-06-29 16:20",
    status: "완료",
    paymentMethod: "현금",
  },
  {
    id: "TXN-020",
    customerName: "한지민",
    service: "숙소",
    bagCount: "4",
    bagSize: "mediumbag-3,smallbag-1",
    amount: 432000,
    date: "2025-06-30 14:10",
    status: "완료",
    paymentMethod: "계좌이체",
  },

  // 나머지 100개 랜덤 생성 (날짜 2025-01-01 ~ 2025-06-30, service 랜덤)
  ...Array.from({ length: 100 }).map((_, i) => {
    const idNum = i + 21;
    const id = `TXN-${String(idNum).padStart(3, "0")}`;

    const customers = [
      "김철수",
      "박영희",
      "이민수",
      "최지혜",
      "정유진",
      "홍길동",
      "김영수",
      "이영희",
      "박민수",
      "최수진",
      "조하나",
      "서준",
      "강민",
      "윤서",
      "한결",
      "김하늘",
      "이준",
      "박서연",
      "최민준",
      "한지민",
      "서연",
      "동현",
      "민재",
      "수빈",
    ];
    const statuses = ["완료", "처리중", "취소"];
    const paymentMethods = ["카드", "현금", "계좌이체"];
    const services = ["대구공항", "동대구역", "서대구역", "숙소"];

    const year = 2025;
    const month = Math.floor(Math.random() * 6) + 1; // 1~6월 (6월까지)
    const day = Math.floor(Math.random() * 28) + 1;
    const hour = Math.floor(Math.random() * 9) + 8;
    const minute = Math.floor(Math.random() * 60);

    const date = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")} ${String(hour).padStart(2, "0")}:${String(
      minute
    ).padStart(2, "0")}`;

    const customerName =
      customers[Math.floor(Math.random() * customers.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const paymentMethod =
      paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    const service = services[Math.floor(Math.random() * services.length)];

    const bagSizes = ["extrasizebag", "largebag", "mediumbag", "smallbag"];
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
    const bagSizeStr = bagSizeArr.join(",");

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
  let result = [...allTransactions.value];

  // 기간 필터링
  if (selectedDateRange.value.start && selectedDateRange.value.end) {
    const startDate = new Date(selectedDateRange.value.start);
    const endDate = new Date(selectedDateRange.value.end);
    endDate.setHours(23, 59, 59, 999); // 종료일 끝까지 포함

    result = result.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  }

  // 검색 필터링
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (t) =>
        t.customerName.toLowerCase().includes(query) ||
        t.id.toLowerCase().includes(query)
    );
  }

  // 상태 필터링
  if (statusFilter.value !== "all") {
    const statusMap = {
      completed: "완료",
      processing: "처리중",
      cancelled: "취소",
      refunded: "환불",
    } as Record<string, string>;
    result = result.filter((t) => t.status === statusMap[statusFilter.value]);
  }

  return result;
});

// 기간별 통계 계산
const filteredStats = computed(() => {
  const transactions = filteredTransactions.value;
  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalOrders = transactions.length;
  const avgOrderAmount =
    totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const activeCustomers = new Set(transactions.map((t) => t.customerName)).size;

  // 이전 기간과의 비교를 위한 더미 데이터
  const revenueGrowth = 12.5;
  const ordersGrowth = 8.3;
  const avgGrowth = 5.2;
  const customersGrowth = 15;

  return {
    totalRevenue,
    totalOrders,
    avgOrderAmount,
    activeCustomers,
    revenueGrowth,
    ordersGrowth,
    avgGrowth,
    customersGrowth,
  };
});

// 기간별 차트 데이터 생성
const filteredChartData = computed(() => {
  const transactions = filteredTransactions.value;
  const trend = generateTrendData(transactions);

  // 기간별 매출 분석
  const periodData = generatePeriodData(transactions);

  // 서비스별 매출 분석
  const serviceData = generateServiceData(transactions);

  // 추이 데이터 생성
  const trendData = generateTrendData(transactions);

  //   글자를 흰색으로 설정
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return {
    period: {
      labels: periodData.map((item) => item.label),
      datasets: [
        {
          backgroundColor: [
            "#3B82F6",
            "#EF4444",
            "#10B981",
            "#F59E0B",
            "#8B5CF6",
            "#EC4899",
          ],
          data: periodData.map((item) => item.amount),
        },
      ],
    },
    service: {
      labels: serviceData.map((item) => item.service),
      color: prefersDark ? '#FFFFFF' : '#000000',
      datasets: [
        {
          color: prefersDark ? '#FFFFFF' : '#000000',
          backgroundColor: [
            "#3B82F6",
            "#EF4444",
            "#10B981",
            "#F59E0B",
            "#8B5CF6",
          ],
          data: serviceData.map((item) => item.amount),
        },
      ],
    },
    trend: {
      labels: trendData.map((item) => item.period),
      datasets: [
        {
          type: "bar",
          label: "매출액",
          backgroundColor: "#3B82F6",
          data: trendData.map((item) => item.revenue),
          yAxisID: "y",
          datalabels: {
            color: "#3B82F6",
            anchor: "end",
            align: "top",
            font: {
              weight: "bold",
            },
            formatter: (value) => value.toLocaleString(),
          },
        },
        {
          type: "line",
          label: "주문 건수",
          data: trendData.map((item) => item.orders),
          borderColor: "#10B981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          pointBackgroundColor: "#10B981",
          pointBorderColor: "#10B981",
          pointRadius: 4,
          tension: 0.4,
          fill: false,
          yAxisID: "y1",
          datalabels: {
            color: "#10B981", // 초록색
            anchor: "end",
            align: "top",
            font: {
              weight: "bold",
            },
            formatter: (value) => `${value}건`,
          },
        },
      ],
    },
  };
});

// 기간별 데이터 생성 함수
const generatePeriodData = (transactions: any[]) => {
  if (!selectedDateRange.value.start || !selectedDateRange.value.end) {
    // 기본 월별 데이터
    const monthlyData = [
      { label: "1월", amount: 0 },
      { label: "2월", amount: 0 },
      { label: "3월", amount: 0 },
      { label: "4월", amount: 0 },
      { label: "5월", amount: 0 },
      { label: "6월", amount: 0 },
    ];

    transactions.forEach((t) => {
      const month = new Date(t.date).getMonth();
      if (month < 6) {
        monthlyData[month].amount += t.amount;
      }
    });

    return monthlyData.filter((item) => item.amount > 0);
  }

  // 선택된 기간에 따른 동적 데이터 생성
  const startDate = new Date(selectedDateRange.value.start);
  const endDate = new Date(selectedDateRange.value.end);
  const daysDiff = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysDiff <= 7) {
    // 일별 데이터
    return generateDailyData(transactions, startDate, endDate);
  } else if (daysDiff <= 31) {
    // 주별 데이터
    return generateWeeklyData(transactions, startDate, endDate);
  } else {
    // 월별 데이터
    return generateMonthlyData(transactions, startDate, endDate);
  }
};

const generateDailyData = (
  transactions: any[],
  startDate: Date,
  endDate: Date
) => {
  const dailyData: any[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split("T")[0];
    const dayTransactions = transactions.filter((t) =>
      t.date.startsWith(dateStr)
    );
    const amount = dayTransactions.reduce((sum, t) => sum + t.amount, 0);

    if (amount > 0) {
      dailyData.push({
        label: `${currentDate.getMonth() + 1}/${currentDate.getDate()}`,
        amount,
      });
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dailyData;
};

const generateWeeklyData = (
  transactions: any[],
  startDate: Date,
  endDate: Date
) => {
  const weeklyData: any[] = [];
  let weekStart = new Date(startDate);
  let weekNum = 1;

  while (weekStart <= endDate) {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const weekTransactions = transactions.filter((t) => {
      const tDate = new Date(t.date);
      return tDate >= weekStart && tDate <= weekEnd;
    });

    const amount = weekTransactions.reduce((sum, t) => sum + t.amount, 0);

    if (amount > 0) {
      weeklyData.push({
        label: `${weekNum}주차`,
        amount,
      });
    }

    weekStart.setDate(weekStart.getDate() + 7);
    weekNum++;
  }

  return weeklyData;
};

const generateMonthlyData = (
  transactions: any[],
  startDate: Date,
  endDate: Date
) => {
  const monthlyData: any[] = [];
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  for (
    let year = startDate.getFullYear();
    year <= endDate.getFullYear();
    year++
  ) {
    const startMonth =
      year === startDate.getFullYear() ? startDate.getMonth() : 0;
    const endMonth = year === endDate.getFullYear() ? endDate.getMonth() : 11;

    for (let month = startMonth; month <= endMonth; month++) {
      const monthTransactions = transactions.filter((t) => {
        const tDate = new Date(t.date);
        return tDate.getFullYear() === year && tDate.getMonth() === month;
      });

      const amount = monthTransactions.reduce((sum, t) => sum + t.amount, 0);

      if (amount > 0) {
        monthlyData.push({
          label: `${year === new Date().getFullYear() ? "" : year + "년 "}${
            months[month]
          }`,
          amount,
        });
      }
    }
  }

  return monthlyData;
};

const generateServiceData = (transactions: any[]) => {
  const serviceMap = new Map();

  transactions.forEach((t) => {
    const current = serviceMap.get(t.service) || 0;
    serviceMap.set(t.service, current + t.amount);
  });

  return Array.from(serviceMap.entries()).map(([service, amount]) => ({
    service,
    amount,
  }));
};

const generateTrendData = (transactions: any[]) => {
  const defaultData = [
    { period: "1주", revenue: 1800000, orders: 45 },
    { period: "2주", revenue: 2100000, orders: 52 },
    { period: "3주", revenue: 1950000, orders: 48 },
    { period: "4주", revenue: 2300000, orders: 58 },
    { period: "5주", revenue: 2050000, orders: 51 },
    { period: "6주", revenue: 2400000, orders: 62 },
  ];

  // 날짜 범위 없을 때 기본 주차 데이터 반환
  if (!selectedDateRange.value.start || !selectedDateRange.value.end) {
    return defaultData;
  }

  const startDate = new Date(selectedDateRange.value.start);
  const endDate = new Date(selectedDateRange.value.end);
  const daysDiff = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // 일별 추이 (1주 이하)
  if (daysDiff <= 7) {
    return generateDailyTrend(transactions, startDate, endDate);
  }

  // 주별 추이 (8일 이상)
  return generateWeeklyTrend(transactions, startDate, endDate);
};

const generateDailyTrend = (transactions: any[], start: Date, end: Date) => {
  const result: { period: string; revenue: number; orders: number }[] = [];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dayKey = d.toISOString().split("T")[0];

    const filtered = transactions.filter((tx) => tx.date === dayKey);
    const revenue = filtered.reduce((sum, tx) => sum + tx.amount, 0);
    const orders = filtered.length;

    result.push({
      period: `${d.getMonth() + 1}/${d.getDate()}`,
      revenue,
      orders,
    });
  }

  return result;
};

const generateWeeklyTrend = (transactions: any[], start: Date, end: Date) => {
  const result: { period: string; revenue: number; orders: number }[] = [];
  let weekIndex = 1;

  for (let d = new Date(start); d <= end; ) {
    const weekStart = new Date(d);
    const weekEnd = new Date(d);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const filtered = transactions.filter((tx) => {
      const txDate = new Date(tx.date);
      return txDate >= weekStart && txDate <= weekEnd;
    });

    const revenue = filtered.reduce((sum, tx) => sum + tx.amount, 0);
    const orders = filtered.length;

    result.push({
      period: `${weekIndex}주`,
      revenue,
      orders,
    });

    d.setDate(d.getDate() + 7);
    weekIndex++;
  }

  return result;
};
const isDarkMode = ref(false); // 실제 상태와 연동하세요
// 차트 옵션
const pieChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {   
    datalabels: {
      color: "#6B7280",
      font: {
        weight: "normal",
        size: 10,
      },
      formatter: (value, context) => {
        const label = context.chart.data.labels[context.dataIndex];
        return [label, formatCurrency(value)];
      },
      anchor: "center",
      align: "center",
    },
    legend: {
      position: "bottom",
      labels: {
        color: isDarkMode ? "#ffffff" : "#374151",
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.label}: ${formatCurrency(context.parsed)}`;
        },
      },
    },
  },
});


watch(
  isDarkMode,
  (dark) => {
    pieChartOptions.value = {
      ...pieChartOptions.value,
      plugins: {
        ...pieChartOptions.value.plugins,
        datalabels: {
          ...pieChartOptions.value.plugins?.datalabels,
          color: "#eee", // ✅ 여기서 dark 사용
        },
        legend: {
          ...pieChartOptions.value.plugins?.legend,
          labels: {
            ...pieChartOptions.value.plugins?.legend?.labels,
            color: isDarkMode ? "#666" : "#000000", // ✅ 여기서도 dark 사용
          },
        },
      },
    };
  },
  { immediate: true } // 초기 렌더링 시에도 적용되도록
);

const barChartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#fff",
        usePointStyle: true,
      },
    },
    tooltip: {
      callbacks: {
        label(context: any) {
          if (context.dataset.label === "매출액") {
            return `매출액: ${formatCurrency(context.parsed.y)}`;
          } else {
            return `주문 건수: ${context.parsed.y}건`;
          }
        },
      },
    },
  },
  scales: {
    y: {
      type: "linear",
      position: "left",
      beginAtZero: true,
      grid: {
        color: "#6B7280",
      },
      ticks: {
        color: "#6B7280",
      },
      title: {
        display: true,
        text: "매출액",
        color: "#6B7280",
      },
    },
    y1: {
      type: "linear",
      position: "right",
      beginAtZero: true,
      grid: {
        drawOnChartArea: false,
      },
      ticks: {
        color: "#6B7280",
      },
      title: {
        display: true,
        text: "주문 건수",
        color: "#6B7280",
      },
    },
    x: {
      grid: {
        color: "#6B7280",
      },
      ticks: {
        color: "#6B7280",
      },
    },
  },
});

// 유틸리티 함수들
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(amount);
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("ko-KR");
};

const getDaysDifference = (): number => {
  if (!selectedDateRange.value.start || !selectedDateRange.value.end) return 0;
  const start = new Date(selectedDateRange.value.start);
  const end = new Date(selectedDateRange.value.end);
  return (
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
  );
};

const getChartTitle = (type: string): string => {
  if (!selectedDateRange.value.start || !selectedDateRange.value.end) {
    return type === "period" ? "매출 현황" : "주간 매출 추이";
  }

  if (isAllPeriod.value) {
    return type === "period" ? "전체 기간 매출 현황" : "전체 기간 매출 추이";
  }

  const days = getDaysDifference();
  if (type === "period") {
    if (days === 1) return "일별 매출 현황";
    if (days <= 7) return "일별 매출 현황";
    if (days <= 31) return "주별 매출 현황";
    return "매출 현황";
  } else {
    if (days <= 7) return "일별 매출 추이";
    return "주별 매출 추이";
  }
};

const getChartDescription = (type: string): string => {
  if (!selectedDateRange.value.start || !selectedDateRange.value.end) {
    return type === "period"
      ? "최근 6개월간 매출 추이를 확인할 수 있습니다."
      : "최근 6주간의 매출과 주문 건수 추이를 확인할 수 있습니다.";
  }

  if (isAllPeriod.value) {
    return `전체 기간의 ${
      type === "period" ? "매출 분포" : "매출 추이"
    }를 확인할 수 있습니다.`;
  }

  return `선택된 기간(${formatDate(
    selectedDateRange.value.start
  )} ~ ${formatDate(selectedDateRange.value.end)})의 ${
    type === "period" ? "매출 분포" : "매출 추이"
  }를 확인할 수 있습니다.`;
};

// 기간 변경 시 페이지 초기화
watch(
  selectedDateRange,
  () => {
    currentPage.value = 1;
  },
  { deep: true }
);

// 전체 기간인지 확인
const isAllPeriod = computed(() => {
  if (
    !selectedDateRange.value.start ||
    !selectedDateRange.value.end ||
    allTransactions.value.length === 0
  ) {
    return false;
  }

  const oldestTransaction = allTransactions.value.reduce((oldest, current) => {
    return new Date(current.date) < new Date(oldest.date) ? current : oldest;
  }, allTransactions.value[0]);

  const oldestDate = oldestTransaction.date.split(" ")[0];
  const today = new Date().toISOString().split("T")[0];

  return (
    selectedDateRange.value.start === oldestDate &&
    selectedDateRange.value.end === today
  );
});
</script>
