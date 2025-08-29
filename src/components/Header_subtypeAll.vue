<template>
  <header>
    <div class="header">
      <div class="inner">
        <!-- 데스크탑 메뉴 -->
        <div class="hd_wideMenu">
          <!-- 로고 :좌영역 -->
          <router-link to="/" class="hd_logo">
            <img src="/images/logo_new.png" alt="로고" />
          </router-link>
          <!-- 메인탭메뉴(방법도/요금도/예약도/소통도/여행도) :중간영역 -->
          <nav v-if="!isMobile" class="hd_menu">
            <!-- 메인메뉴  -->
            <ul @mouseenter="showAllSubMenu = true" @mouseleave="showAllSubMenu = false">
              <li v-for="(item, index) in menuItems" :key="index" @click="handleMenuClick(item)">
                <router-link v-if="!item.sub" :to="item.to" :class="{ mainMenu: item.label === '예약도' }">
                  <span class="menu-label">{{ item.label }}</span>
                </router-link>
                <a v-else href="#" :class="{ mainMenu: item.label === '예약도' }">
                  {{ item.label }}
                </a>
              </li>
            </ul>
          </nav>
          <!--  가방조회/로그인: 오른쪽 영역-->
          <!-- 가방/로그인 아이콘 -->
          <div class="hd_right">
            <div class="hd_mobileRight">
              <router-link to="/delivery">
                <img src="/images/cr/delivery.png" alt="가방조회이미지" class="icon-square" />
              </router-link>
              <router-link to="/yeyaklookup">
                <img src="/images/cr/lookup.png" alt="예약조회이미지" class="icon-square" />
              </router-link>
              <router-link to="/login" class="loginA">
                <img src="/images/cr/login.png" alt="로그인이미지" class="icon-square" />
                <!-- 고객로그인 -->
                <div v-if="username && username !== ''" class="customer">
                  <h6>{{ username }}님</h6>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <!--1230px 및 모바일 메뉴 -->
        <div class="hd_mobileMenu">
          <!-- 헤더 아이콘 영역 -->
          <nav class="hd_hambar1 hd_extra1" :class="{ show: layoutStore.isMenuOpen }">
            <!-- 햄버거바 -->
            <a href="#" class="hd_hambar" @click.prevent="toggleExtra">
              <img src="/images/geen/bar_humburger_icon.png" alt="햄버거메뉴" />
            </a>
            <!-- 로고 -->
            <router-link to="/" class="hd_logo">
              <img src="/images/logo_new.png" alt="로고" />
            </router-link>
            <!-- 가방/로그인 아이콘 -->
            <div class="hd_mobileRight">
              <router-link to="/delivery">
                <img src="/images/cr/delivery.png" alt="가방조회이미지" class="icon-square" />
              </router-link>
              <router-link to="/yeyaklookup">
                <img src="/images/cr/lookup.png" alt="예약조회이미지" class="icon-square" />
              </router-link>
              <router-link to="/login" class="loginA">
                <img src="/images/cr/login.png" alt="로그인이미지" class="icon-square" />
                <!-- 고객로그인 -->
                <div v-if="username && username !== ''" class="customer">
                  <h6>{{ username }}님</h6>
                </div>
              </router-link>

            </div>
            <!-- 1230px 및 모바일에서 열리는 메뉴 파랑바탕-->
            <div class="hd_menu1" :class="{ show: layoutStore.isMenuOpen, leave: isLeaving }" v-show="shortMenu"
              @mouseleave="handleMouseLeave" @mouseenter="clearLeave" @click="toggleExtra">
              <span @click.prevent="closeMobileMenu" role="button"> <img src="/images/geen/1/Vector.svg"
                  style="margin: 20px auto;" alt="닫기"> </span>
              <ul>
                <li v-for="(item, index) in menuItems" :key="index" class="menuLi">
                  <router-link v-if="!item.sub" :to="item.to" @click="handleMenuClick(item)">
                    <img :src="item.image" :alt="item.label" class="menu-icon" />
                    <span>{{ item.label }}</span>
                  </router-link>
                  <div v-else>
                    <a href="#" @click.prevent="toggleMobileSub(index)">
                      {{ item.label }}
                    </a>
                    <ul v-if="openedMobileMenu === index" class="subMenu show">
                      <li v-for="(sub, idx) in item.sub" :key="idx">
                        <router-link :to="sub.to" @click="handleMenuClick(item)">{{ sub.label }}</router-link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
    <!-- 전체 서브메뉴 바탕 -->
    <div :class="{ show: showAllSubMenu }" class="hd_subMenubg"></div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useLayoutStore } from "@/stores/useLayoutStore";
import { storeToRefs } from "pinia";

import writingIcon from '@/assets/images/writing.svg?components';
import yogeumIcon from '@/assets/images/yogeum.svg?components';
import yeyakIcon from '@/assets/images/yeyak.svg?components';
import sotongIcon from '@/assets/images/sotong.svg?components';
import yeohaengIcon from '@/assets/images/yeohaeng.svg?components';
// 햄버거메뉴
const menuItems = [
  { label: "방법도", to: "/bangbeob2", image: writingIcon },
  { label: "요금도", to: "/yogeum", image: yogeumIcon },
  { label: "예약도", to: "/yeyak", image: yeyakIcon },
  { label: "소통도", to: "/sotong", image: sotongIcon },
  { label: "여행도", to: "/yeohaeng", image: yeohaengIcon },
];
const route = useRoute();
// query로 전달된 username 사용
// const username = route.query.username || "";
const username = ref(null);

onMounted(() => {
  // 페이지가 마운트될 때 쿼리 확인
  if (route.query.username) {
    username.value = route.query.username;
  }
});

// 모바일 여부 체크용
const isLeaving = ref(false); // 트랜지션 상태
const leaveTimeout = ref(null);
const isMobile = ref(window.innerWidth < 896);
const router = useRouter();
const authStore = useAuthStore();
// 햄버거 메뉴 토글 상태
const shortMenu = ref(false);

// 마우스를 메뉴 밖으로 벗어났을 때
function handleMouseLeave() {
  isLeaving.value = true;
  leaveTimeout.value = setTimeout(() => {
    shortMenu.value = false;
    isLeaving.value = false;
  }, 300); // CSS 전환 시간과 동일하게 맞춤
}
function closeMobileMenu() {
  isLeaving.value = true;
  setTimeout(() => {
    shortMenu.value = false;
    isLeaving.value = false;
  }, 300);
}

const handleMenuClick = (item) => {
  if (isMobile.value) {
    shortMenu.value = false;
    openedMobileMenu.value = null;
  }
};
// 마우스가 다시 들어왔을 때
function clearLeave() {
  clearTimeout(leaveTimeout.value);
  isLeaving.value = false;
}

// 컴포넌트 해제 전에 타이머 제거
onBeforeUnmount(() => {
  clearTimeout(leaveTimeout.value);
});

const { isLoggedIn, userName } = storeToRefs(authStore);
const logout = () => {
  authStore.logout();
  router.push("/");
};
const openedMobileMenu = ref(null); // 모바일에서 열린 submenu 인덱스

const toggleMobileSub = (index) => {
  openedMobileMenu.value = openedMobileMenu.value === index ? null : index;
};

// 메뉴 호버
const showAllSubMenu = ref(false); // 현재 열린 서브메뉴 li의 index

//
const layoutStore = useLayoutStore();

function toggleExtra() {
  layoutStore.toggleMenu();
  toggleShortMenu(); // shortMenu 토글
}
// 햄버거 메뉴 열릴 때 body 스크롤 방지
watch(shortMenu, (val) => {
  document.body.style.overflow = val ? "hidden" : "auto";
  document.body.classList.toggle("modal-open", val);
  if (!val) {
    openedMobileMenu.value = null;
  }
});
function toggleShortMenu() {
  shortMenu.value = !shortMenu.value;
}

// 창 크기 변경 시 모바일 여부 확인 + 창이 커지면 메뉴 닫기
const updateScreenSize = () => {
  const width = window.innerWidth;
  isMobile.value = width <= 896;

  // 화면이 896 이상이면 메뉴 강제 닫기
  if (width > 896) {
    shortMenu.value = false;
  }
};

// 이벤트 리스너 등록
onMounted(() => {
  window.addEventListener("resize", updateScreenSize);
  updateScreenSize(); // 최초 진입 시 확인
});

// 이벤트 리스너 해제
onUnmounted(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>
<script>
export default {
  name: "HeaderComponent",
};
</script>
<style lang="scss" scoped>
@use "/src/assets/Variables" as *;

.header {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 70px;
  z-index: 999999;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  a,
  .router-link-active,
  .router-link-exact-active {
    color: black !important;
    text-decoration: none;
  }

  a:hover {
    color: black; // hover 시에도 동일하게 유지
  }
}

header .inner {
  max-width: 1300px;
  margin-top: 5px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hd_wideMenu {
  width: 100%;
  height: 6cap;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px auto;
}

body.modal-open {
  position: fixed;
  width: 100%;
  overflow: hidden;
}

// 로고
.hd_logo {
  width: 110px;

  img {
    margin: 8px 0px 8px 50px;
    width: 90px;
  }
}

.hd_mobileMenu {
  width: 100%;
  display: none;
}

// 메뉴
.hd_menu {
  width: 500px;
  height: 70px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 16px;

  ul {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;

    li {
      position: relative;
      flex: 1;
      text-align: center;

      &:hover .subMenu {
        display: flex; // hover 중에는 항상 보이게
      }

      a {
        display: inline-block;
        padding: 5px 15px;
        transition: all 0.3s ease;
        border-radius: 5px;
        font-weight: normal;
      }

      a:hover {
        color: #279bf4 !important;
        font-weight: bold;
      }

      .subMenu {
        width: 100%;
        height: 100px;
        line-height: 50px;
        display: none;
        flex-direction: column;
        position: absolute;
        top: 56px;
        left: 0;
        z-index: 10;
        padding: 10px 0;

        li {
          height: 40px;

          a {
            display: flex; // 플렉스 박스로 설정
            align-items: center; // 수직 가운데 정렬
            justify-content: center;
            width: 100%;
            height: 20px;
            padding: 0;
          }
        }
      }

      .subMenu.show {
        display: flex;
      }
    }
  }
}

.icon-square {
  width: 80%;
  /* 가로 길이 */
  height: 80%;
  /* 세로 길이 (width와 동일) */
  object-fit: contain;
  /* 원본 비율 유지하면서 빈 공간이 생기면 여백 처리 */
  /* object-fit: cover; */
  /* 꽉 채워서 자르려면 이 옵션을 사용 */
}

.hd_menu1 {
  position: fixed;
  top: 0;
  left: 0;
  width: 80px; // 폭 80px
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 12px !important;
  border-radius: 10px;
  color: #fff;
  z-index: 9;
  opacity: 0;
  transform: translateX(-100%); // 처음엔 왼쪽 밖으로 숨김
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
  background-color: #279bf4;

  &.show {
    opacity: 1;
    transform: translateX(0); // 슬라이드 인
    pointer-events: auto;
  }

  .menuLi {
    margin: 20px auto;

    .menu-icon {
      width: 24px;
      height: 24px;
      margin: auto;

    }

      .menuLi:nth-child(1):hover .menu-icon {
      content: url('/public/images/writing.png');
    }

    .menuLi:nth-child(2):hover .menu-icon {
      content: url('/public/images/shopping-cart-dollar.png');
    }

    .menuLi:nth-child(3):hover .menu-icon {
      content: url('/public/images/devices-up.png');
    }

    .menuLi:nth-child(4):hover .menu-icon {
      content: url('/public/images/replace-user.png');
    }
    .menuLi:nth-child(5):hover .menu-icon {
      content: url('/public/images/building-airport.png');
    }
  }
}

// show 상태일 때 내부 콘텐츠 밀기
.inner1230 {
  margin-left: 80px;
}

span {
  height: 30px;
  text-align: right;
  color: #fff;
  cursor: pointer;
}

ul {
  margin: 50px 0;

  li {
    width: 100%;

    a {
      display: block;
      width: 100% !important;
      height: 80%;
      line-height: 35px;
      padding: 18px 10px;
      color: #fff;
      text-align: center;
      box-sizing: border-box;
      border-radius: 10px;

    }

    a:hover {
      font-weight: bold;
      border-radius: 10px;

      span {
        color: #000 !important;
      }
    }
  }
}

.subMenu {
  li {
    a {
      line-height: 50px;
      text-align: right;
      font-size: 18px;
      padding: 5px;
    }
  }
}


.hd_menu1 .subMenu.show {
  display: flex;
  flex-direction: column;
}

.menu-label {
  display: inline-block;
  /* 너비 적용을 위해 */
  // height: 50px; /* 원하는 만큼 조정 */
}

// delivery/login icon
.hd_extra {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100% !important;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 9;

  img {
    font-weight: 600;
  }
}

.hd_extra>div>a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  border: 1px solid transparent;
}

// 로그인
.hd_myPage {
  position: relative;
}

.hd_afterlogindropPage_content {
  display: none;
  position: absolute;
  right: 0;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 0.5rem 0;
}

.hd_afterlogindropPage:hover .hd_afterlogindropPage_content {
  display: block;
}

.hd_afterlogindropPage_content a {
  display: block;
  padding: 0.5rem 1rem;
  color: #333;
  text-decoration: none;
}

.hd_afterlogindropPage_content a:hover {
  background-color: #f5f5f5;
}

.user-name {
  color: $main-color;
}

// 반응형후 delivery/login icon
.hd_extra1 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100% !important;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 9;

  img {
    font-weight: 600;
    max-width: none !important;
  }
}

.hd_hambar,
.hd_hambar>img {
  width: 36px;
}

.hd_man,
.hd_man img {
  width: 29px !important;
  height: 30px !important;
  margin-bottom: 5px;
  font-weight: bold;
}

.hd_right {
  display: flex;

  .hd_mobileRight {
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    a:nth-child(3) {
      img {
        width: 68%;
      }
    }


  }
}

.loginA {
  position: relative;

  .customer {
    position: absolute;
    top: 25px;
    right: -60px;

    h6 {
      width: 100px;

    }
  }
}
</style>
