import { defineStore } from "pinia";
import { ref, computed } from "vue";
 

export const useAppStore = defineStore("app", () => {
  
  // 다크모드 설정 (기본값: true)
  const isDarkMode = ref(true);

  // 전역 설정
  const settings = ref({
    emailNotifications: true,
    pushNotifications: true,
    cancelNotifications: true,
    darkMode: true,
    colorTheme: "#3498db",
    autoSave: true,
    language: "ko",
  });

  // 기본 데이터 배열들
  const customerNames = [
    "김철수", "박영희", "이민수", "최지혜", "정유진", "한상훈", "오민지", "서현우",
    "윤지아", "강동원", "조하늘", "임수빈", "황지은", "신동혁", "채은비", "문준호",
    "배수현", "이서윤", "정다은", "김태호", "서민재", "강지훈", "송예린", "박지민",
    "김하늘", "유준서", "차은우", "이윤지", "안지호", "전민지", "홍지수", "한채원",
    "서준호", "김나연", "오지훈", "윤서현", "박지우", "장민재", "임채원", "최윤서",
    "이민재", "정서윤", "홍민기", "강수현", "조민재", "서은지", "박준영", "김수민",
    "한민재", "송지현", "이준호", "배서윤", "정민우", "오하늘", "윤민지", "차준호",
    "김예린", "서지훈", "박민서", "임하늘", "최준호", "강서윤", "이채원", "홍서현",
    "한민서", "배준영", "정서연", "오민준", "윤서윤", "차민재", "김지우", "서하늘",
    "박수현", "임민재", "최서윤", "이준영", "강예린", "조서현", "배민서", "한채원",
    "송준호", "김서윤", "서민우", "박지훈", "임수연", "최민재", "이하늘", "윤준서",
    "차서윤", "김민서", "서준영", "박채원", "정수민", "오민재", "홍채원", "한서윤",
    "배준호", "강민서", "이채윤", "조준영", "송서윤", "서민서", "박준서", "임서윤",
    "최민서", "김서영", "윤민우", "차서현", "한지민", "배민재", "정서윤", "오준호",
    "김도현", "이수진", "박민호", "최예은", "정재훈", "한소영", "오성민", "윤채영",
    "강태우", "송미래", "임도윤", "배하린", "홍준석", "한예진", "서도영", "김채린",
    "이태민", "박소은", "정하윤", "최도현"
  ];

  const locations = ["대구공항", "동대구역", "서대구역", "숙소"];
  const location1Mapping = {
    "대구공항": "공항",
    "동대구역": "역", 
    "서대구역": "역",
    "숙소": "숙소"
  };

  const statusOptions = ["대기중", "완료", "취소", "운반중"];
  const workerNames = [
    "김지훈", "이수민", "박서준", "한예슬", "정우성", "김태희", "이준호", "유인나",
    "이병헌", "한가인", "정해인", "고아라", "남주혁", "전지현", "송중기"
  ];
  const types = ["출국 운반", "입국 운반"];
  const terminals = ["제1터미널", "제2터미널"];
  const specialRequestsOptions = [
    "", "특별 취급 가방 1개 포함", "파손주의", "빠른 처리 요청", "휠체어 포함", "고가 장비 포함"
  ];
  const paymentMethods = ["카드", "현금", "계좌이체"];

  // 유틸리티 함수들
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pad(num, size) {
    return String(num).padStart(size, '0');
  }

  function formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  function formatDateTime(date) {
    const dateStr = formatDate(date);
    const hour = pad(getRandomInt(8, 20), 2);
    const minute = pad(getRandomInt(0, 59), 2);
    return `${dateStr} ${hour}:${minute}`;
  }

  // 가방 크기별 가격 매핑
  const bagPrices = {
    "extrasizebag": 20000,
    "largebag": 16000, 
    "mediumbag": 140000,
    "smallbag": 12000
  };

  // 130명 고객 데이터 생성 (12명 비활성화)
  function generateCustomers() {
    const customers = [];
    const favoriteItemsOptions = [
      ["소형 가방"], ["중형 가방"], ["대형 가방"], ["특별 취급 가방"],
      ["소형 가방", "중형 가방"], ["대형 가방", "특별 취급 가방"],
      ["중형 가방", "대형 가방"], ["소형 가방", "대형 가방"]
    ];
    
    const tagsOptions = [
      ["VIP"], ["단골"], ["신규"], ["정기이용"], ["이벤트"], ["취급주의"], ["휴면"],
      ["VIP", "정기이용"], ["단골", "이벤트"], ["신규", "온라인"], ["VIP", "이벤트"]
    ];

    const notesOptions = [
      "VIP 고객, 정기 이용", "단골 고객, 취급 주의 가방 있음", "새 고객, 온라인 예약 선호",
      "이벤트 참여 적극적", "빠른 서비스 선호", "특별 요청 많음", "친절한 고객",
      "정시 픽업 중요", "가격 민감", "서비스 만족도 높음", "추천 고객 많음",
      "3개월 미이용", "6개월 미이용", "1년 미이용", "연락 두절", "서비스 불만족"
    ];

    for (let i = 0; i < 130; i++) {
      const name = customerNames[i % customerNames.length];
      const isInactive = i < 12; // 처음 12명을 비활성화로 설정
      
      // 비활성화 고객은 낮은 예약 횟수와 지출액
      const reservationCount = isInactive ? getRandomInt(0, 2) : getRandomInt(1, 15);
      const totalSpent = isInactive ? 
        getRandomInt(0, 500000) : 
        getRandomInt(200000, 3000000);
      
      // 가입일 (2023년 ~ 2024년)
      const joinYear = getRandomInt(2023, 2024);
      const joinMonth = getRandomInt(1, 12);
      const joinDay = getRandomInt(1, 28);
      const joinDate = `${joinYear}-${pad(joinMonth, 2)}-${pad(joinDay, 2)}`;
      
      // 마지막 방문일
      let lastVisitYear, lastVisitMonth, lastVisitDay;
      if (isInactive) {
        // 비활성화 고객은 3개월 이상 미방문
        lastVisitYear = 2024;
        lastVisitMonth = getRandomInt(1, 9); // 1월~9월 (3개월 이상 전)
        lastVisitDay = getRandomInt(1, 28);
      } else {
        // 활성 고객은 최근 방문
        lastVisitYear = getRandomInt(2024, 2025);
        lastVisitMonth = lastVisitYear === 2025 ? getRandomInt(1, 5) : getRandomInt(10, 12);
        lastVisitDay = getRandomInt(1, 28);
      }
      const lastVisit = `${lastVisitYear}-${pad(lastVisitMonth, 2)}-${pad(lastVisitDay, 2)}`;

      // 이메일 생성
      const emailPrefix = name.replace(/[가-힣]/g, (char) => {
        const code = char.charCodeAt(0) - 44032;
        const initial = Math.floor(code / 588);
        const medial = Math.floor((code % 588) / 28);
        const final = code % 28;
        
        const initials = ['g','kk','n','d','tt','r','m','b','pp','s','ss','','j','jj','ch','k','t','p','h'];
        const medials = ['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe','yo','u','wo','we','wi','yu','eu','yi','i'];
        const finals = ['','g','kk','gs','n','nj','nh','d','l','lg','lm','lb','ls','lt','lp','lh','m','b','bs','s','ss','ng','j','ch','k','t','p','h'];
        
        return initials[initial] + medials[medial] + finals[final];
      });
      const email = `${emailPrefix}${getRandomInt(1, 999)}@example.com`;

      customers.push({
        id: i + 1,
        name,
        email,
        phone: `010-${getRandomInt(1000, 9999)}-${pad(getRandomInt(1000, 9999), 4)}`,
        status: isInactive ? "inactive" : "active",
        reservationCount,
        avatar: "https://via.placeholder.com/50",
        joinDate,
        lastVisit,
        totalSpent,
        favoriteItems: favoriteItemsOptions[i % favoriteItemsOptions.length],
        notes: isInactive ? 
          notesOptions[getRandomInt(11, 14)] : // 비활성화 관련 메모
          notesOptions[getRandomInt(0, 10)],   // 일반 메모
        tags: isInactive ? 
          ["휴면"] : 
          tagsOptions[i % tagsOptions.length]
      });
    }

    return customers;
  }

  // 120개 예약 데이터 생성
  function generateReservations() {
    const reservations = [];
    const startDate = new Date(2025, 0, 1); // 2025-01-01부터 시작

    for (let i = 0; i < 120; i++) {
      const id = `#${1001 + i}`;
      const customerName = customerNames[i % customerNames.length];
      const phone = `010-${getRandomInt(1000, 9999)}-${pad(1001 + i, 4)}`;
      const location = locations[i % locations.length];
      const location1 = location1Mapping[location];
      const bagCount = String(getRandomInt(1, 5));
      
      // 날짜를 6개월에 걸쳐 분산
      const daysToAdd = Math.floor(i * (180 / 120)); // 180일을 120개로 분산
      const date = new Date(startDate.getTime() + daysToAdd * 86400000);
      const dateStr = formatDate(date);
      const time = `${pad(getRandomInt(8, 20), 2)}:${pad(getRandomInt(0, 59), 2)}`;
      
      const status = statusOptions[i % statusOptions.length];
      const worker = workerNames[i % workerNames.length];
      const specialRequests = specialRequestsOptions[i % specialRequestsOptions.length];
      const type = types[i % types.length];
      const terminal = terminals[i % terminals.length];

      reservations.push({
        id,
        customerName,
        phone,
        bagCount,
        location,
        location1,
        date: dateStr,
        time,
        status,
        worker,
        specialRequests,
        memo: "",
        type,
        terminal
      });
    }

    return reservations;
  }

  // 120개 거래 데이터 생성 (예약과 연동)
  function generateTransactions(reservations) {
    const transactions = [];
    
    reservations.forEach((reservation, index) => {
      const id = `TXN-${pad(index + 1, 3)}`;
      
      // 가방 크기 랜덤 생성
      const bagSizes = ["extrasizebag", "largebag", "mediumbag", "smallbag"];
      const bagCount = parseInt(reservation.bagCount);
      const selectedBags = [];
      
      for (let i = 0; i < bagCount; i++) {
        selectedBags.push(bagSizes[getRandomInt(0, bagSizes.length - 1)]);
      }
      
      // 가격 계산
      let amount = selectedBags.reduce((sum, bagType) => sum + bagPrices[bagType], 0);
      // 추가 요금 (랜덤)
      amount += getRandomInt(0, 5) * 1000;
      
      // 가방 크기 문자열 생성
      const bagSizeCount = {};
      selectedBags.forEach(bag => {
        bagSizeCount[bag] = (bagSizeCount[bag] || 0) + 1;
      });
      const bagSize = Object.entries(bagSizeCount)
        .map(([size, count]) => `${size}-${count}`)
        .join(',');

      const dateTime = formatDateTime(new Date(reservation.date));
      const status = reservation.status === "취소" ? "취소" : 
                   reservation.status === "운반중" ? "처리중" : "완료";
      const paymentMethod = paymentMethods[index % paymentMethods.length];

      transactions.push({
        id,
        customerName: reservation.customerName,
        service: reservation.location,
        bagCount: reservation.bagCount,
        bagSize,
        amount,
        date: dateTime,
        status,
        paymentMethod
      });
    });

    return transactions;
  }

  // 예약 데이터 생성
  const reservations = ref(generateReservations());
  
  // 거래 데이터 생성 (예약 기반)
  const allTransactions = ref(generateTransactions(reservations.value));

  // 130명 고객 데이터 생성 (12명 비활성화)
  const customers = ref(generateCustomers());

  // 기사 데이터
  const workers = ref([
    {
      id: "#C001", name: "김지훈", phone: "010-1234-5678", phone1: "1234-5678",
      rating: 4.8, status: "활동중", reservations: "11건", memo: "",
      joinDate: "2024-01-15", lastActivity: "2025-05-15", 
      area: "동, 군위", areaGroup: "gu1"
    },
    {
      id: "#C002", name: "이수민", phone: "010-8765-4321", phone1: "8765-4321",
      rating: 4.5, status: "활동중", reservations: "10건", memo: "",
      joinDate: "2024-01-20", lastActivity: "2025-05-14",
      area: "서, 중, 북", areaGroup: "gu2"
    },
    {
      id: "#C003", name: "박서준", phone: "010-5555-6666", phone1: "5555-6666",
      rating: 4.2, status: "대기중", reservations: "0건", memo: "",
      joinDate: "2024-01-25", lastActivity: "2025-04-20",
      area: "중, 수성", areaGroup: "gu3"
    },
    {
      id: "#C004", name: "한예슬", phone: "010-7777-8888", phone1: "7777-8888",
      rating: 4.9, status: "활동중", reservations: "11건", memo: "",
      joinDate: "2024-02-01", lastActivity: "2025-05-18",
      area: "달서, 달성", areaGroup: "gu4"
    },
    {
      id: "#C005", name: "정우성", phone: "010-9999-0000", phone1: "9999-0000",
      rating: 4.6, status: "활동중", reservations: "9건", memo: "",
      joinDate: "2024-02-05", lastActivity: "2025-05-10",
      area: "동, 군위", areaGroup: "gu1"
    },
    {
      id: "#C006", name: "김태희", phone: "010-1111-2222", phone1: "1111-2222",
      rating: 4.7, status: "활동중", reservations: "10건", memo: "",
      joinDate: "2024-02-10", lastActivity: "2025-05-09",
      area: "서, 중, 북", areaGroup: "gu2"
    },
    {
      id: "#C007", name: "이준호", phone: "010-3333-4444", phone1: "3333-4444",
      rating: 4.4, status: "활동중", reservations: "9건", memo: "",
      joinDate: "2024-02-15", lastActivity: "2025-05-08",
      area: "중, 수성", areaGroup: "gu3"
    },
    {
      id: "#C008", name: "유인나", phone: "010-5555-7777", phone1: "5555-7777",
      rating: 4.8, status: "활동중", reservations: "10건", memo: "",
      joinDate: "2024-02-20", lastActivity: "2025-05-07",
      area: "달서, 달성", areaGroup: "gu4"
    },
    {
      id: "#C009", name: "이병헌", phone: "010-7777-9999", phone1: "7777-9999",
      rating: 4.3, status: "대기중", reservations: "0건", memo: "",
      joinDate: "2024-02-25", lastActivity: "2025-04-15",
      area: "동, 군위", areaGroup: "gu1"
    },
    {
      id: "#C010", name: "한가인", phone: "010-9999-1111", phone1: "9999-1111",
      rating: 4.9, status: "활동중", reservations: "10건", memo: "",
      joinDate: "2024-03-01", lastActivity: "2025-05-06",
      area: "서, 중, 북", areaGroup: "gu2"
    },
    {
      id: "#C011", name: "정해인", phone: "010-2222-3333", phone1: "2222-3333",
      rating: 4.5, status: "활동중", reservations: "10건", memo: "",
      joinDate: "2024-03-05", lastActivity: "2025-05-05",
      area: "중, 수성", areaGroup: "gu3"
    },
    {
      id: "#C012", name: "고아라", phone: "010-4444-5555", phone1: "4444-5555",
      rating: 4.7, status: "활동중", reservations: "10건", memo: "",
      joinDate: "2024-03-10", lastActivity: "2025-05-04",
      area: "달서, 달성군", areaGroup: "gu4"
    },
    {
      id: "#C013", name: "남주혁", phone: "010-6666-7777", phone1: "6666-7777",
      rating: 4.2, status: "대기중", reservations: "0건", memo: "",
      joinDate: "2024-03-15", lastActivity: "2025-04-18",
      area: "동, 군위", areaGroup: "gu1"
    },
    {
      id: "#C014", name: "전지현", phone: "010-8888-9999", phone1: "8888-9999",
      rating: 4.8, status: "활동중", reservations: "10건", memo: "",
      joinDate: "2024-03-20", lastActivity: "2025-05-03",
      area: "서, 중, 북", areaGroup: "gu2"
    },
    {
      id: "#C015", name: "송중기", phone: "010-0000-1111", phone1: "0000-1111",
      rating: 4.6, status: "활동중", reservations: "10건", memo: "",
      joinDate: "2024-03-25", lastActivity: "2025-05-02",
      area: "중, 수성", areaGroup: "gu3"
    }
  ]);

  // 통계 계산
  const dashboardStats = computed(() => {
    const totalReservations = reservations.value.length;
    const completedReservations = reservations.value.filter(r => r.status === "완료").length;
    const waitingReservations = reservations.value.filter(r => r.status === "대기중").length;
    const activeWorkers = workers.value.filter(w => w.status === "활동중").length;
    const totalWorkers = workers.value.length;
    const activeCustomers = customers.value.filter(c => c.status === "active").length;
    const inactiveCustomers = customers.value.filter(c => c.status === "inactive").length;
    const totalCustomers = customers.value.length;
    const totalRevenue = allTransactions.value.reduce((sum, t) => sum + t.amount, 0);
    const avgRating = workers.value.reduce((sum, w) => sum + w.rating, 0) / workers.value.length;

    return {
      totalReservations,
      completedReservations,
      waitingReservations,
      activeWorkers,
      totalWorkers,
      activeCustomers,
      inactiveCustomers,
      totalCustomers,
      totalRevenue,
      avgRating: avgRating.toFixed(1),
      revenueGrowth: 12.5,
      reservationGrowth: 8.3,
      workerGrowth: 2,
      customerGrowth: 15
    };
  });

  // Actions
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    settings.value.darkMode = isDarkMode.value;
    updateTheme();
  };

  const updateTheme = () => {
    if (isDarkMode.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const updateSettings = (newSettings) => {
    Object.assign(settings.value, newSettings);
    if (newSettings.darkMode !== undefined) {
      isDarkMode.value = newSettings.darkMode;
      updateTheme();
    }
  };

  // CRUD Actions
  const addReservation = (reservation) => {
    const newId = `#${1000 + reservations.value.length + 1}`;
    reservations.value.push({ ...reservation, id: newId });
  };

  const updateReservation = (id, updates) => {
    const index = reservations.value.findIndex(r => r.id === id);
    if (index !== -1) {
      Object.assign(reservations.value[index], updates);
    }
  };

  const deleteReservation = (id) => {
    const index = reservations.value.findIndex(r => r.id === id);
    if (index !== -1) {
      reservations.value.splice(index, 1);
    }
  };

  const addWorker = (worker) => {
    const newId = `#W${String(workers.value.length + 1).padStart(3, "0")}`;
    workers.value.push({ ...worker, id: newId });
  };

  const updateWorker = (id, updates) => {
    const index = workers.value.findIndex(w => w.id === id);
    if (index !== -1) {
      Object.assign(workers.value[index], updates);
    }
  };

  const deleteWorker = (id) => {
    const index = workers.value.findIndex(w => w.id === id);
    if (index !== -1) {
      workers.value.splice(index, 1);
    }
  };

  const addCustomer = (customer) => {
    const newId = customers.value.length + 1;
    customers.value.push({
      ...customer,
      id: newId,
      reservationCount: 0,
      avatar: "https://via.placeholder.com/50",
      joinDate: new Date().toISOString().split("T")[0],
      lastVisit: new Date().toISOString().split("T")[0],
      totalSpent: 0,
      favoriteItems: [],
      notes: "",
      tags: ["신규"]
    });
  };

  const updateCustomer = (id, updates) => {
    const index = customers.value.findIndex(c => c.id === id);
    if (index !== -1) {
      Object.assign(customers.value[index], updates);
    }
  };

  const deleteCustomer = (id) => {
    const index = customers.value.findIndex(c => c.id === id);
    if (index !== -1) {
      customers.value.splice(index, 1);
    }
  };

  const addTransaction = (transaction) => {
    const newId = `TXN-${String(allTransactions.value.length + 1).padStart(3, "0")}`;
    allTransactions.value.push({ ...transaction, id: newId });
  };

  // 초기화 시 다크모드 적용
  updateTheme();

  return {
    // State
    isDarkMode,
    settings,
    reservations,
    allTransactions,
    workers,
    customers,
    dashboardStats,

    // Actions
    toggleDarkMode,
    updateSettings,
    updateTheme,
    addReservation,
    updateReservation,
    deleteReservation,
    addWorker,
    updateWorker,
    deleteWorker,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addTransaction
  };
});