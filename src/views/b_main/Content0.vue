<template>
  <div class="wrap">
    <!-- 페이드 슬라이드 배경 -->
    <div class="slider">
      <div
        v-for="(img, index) in images"
        :key="index"
        class="slide"
        :class="{ active: index === currentIndex }"
        :style="{ backgroundImage: `url(${img})` }"></div>

      <!-- 배경 위 글씨 -->
      <div class="inner">
        <div class="container1">
          <div class="contain1">
            <div class="charHead">
              <img src="/images/yr/mainImg/yongdalHead.png" alt="" />
            </div>
            <div class="sLetter">
              <p>무거운 가방?</p>
              <p>이리도 내가 들게</p>
            </div>
          </div>

          <div class="contain2">
            <p>가방도</p>
          </div>
          <div class="contain3">
            <p>대구 짐옮김이 전문 No.1</p>
          </div>
          <div class="contain4">
            <router-link to="/yeyak">
              <button class="btn1">
                <p>예약하기</p>
                <!-- <img src="/public/images/yr/mainImg/arrowW.png" alt="" /> -->
              </button>
            </router-link>
            <router-link to="/bangbeob2">
              <button class="btn2">서비스안내</button>
            </router-link>
          </div>
        </div>
        <div class="contain5 flex gap-[50px] mt-[70px]">
          <div class="flex items-center space-x-4">
            <div
              class="w-[60px] h-[60px] bg-blue-600 rounded-full flex flex-1 items-center justify-center">
              <MapPin class="w-[35px] h-[35px] text-white" />
            </div>
            <div>
              <h4
                class="text-white font-semibold text-base text-[22px] pb-[5px]">
                어디든 픽업
              </h4>
              <p class="text-m text-white">지하철, 기차, 공항 어디든지</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div
              class="w-[60px] h-[60px] bg-blue-600 rounded-full flex flex-1 items-center justify-center">
              <Clock4 class="w-[35px] h-[35px] text-white" />
            </div>
            <div>
              <h4
                class="text-white font-semibold text-base text-[22px] pb-[5px]">
                실시간 추적
              </h4>
              <p class="text-m text-white">짐의 위치를 실시간으로 확인</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div
              class="w-[60px] h-[60px] bg-blue-600 rounded-full flex flex-1 items-center justify-center">
              <Shield class="w-[35px] h-[35px] text-white" />
            </div>
            <div>
              <h4
                class="text-white font-semibold text-base text-[22px] pb-[5px]">
                안전보장
              </h4>
              <p class="text-m text-white">보험가입으로 안전하게 보관</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- container2 등 다른 섹션은 여기 아래에 이어서 -->
    <!-- 컨테인2 -->
    <div class="container2">
      <div class="inner">
        <div class="section1">
          <!-- 이미지 -->
          <div class="section1-1">
            <img src="/images/yongdal1.png" alt="" />
          </div>
          <!-- 텍스트 -->
          <div class="section1-2">
            <p>쉽고 가벼운 여행도</p>
            <span>원하는 곳에 짐맡기고<br />편하게 이동하자</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 컨테인3 -->
    <div class="container3">
      <div class="inner">
        <div class="section3">
          <!-- 왼쪽 텍스트 -->
          <div class="section3-1">
            <p>짐보관도 부담없이</p>
            <span>지하철, 기차, 공항<br />어디든지 짐 맡기자</span>
          </div>
          <!-- 오른쪽 이미지 -->
          <div class="section3-2">
            <img src="/images/yongdal3.png" alt="" />
          </div>
        </div>
      </div>
    </div>

    <!-- 컨테인4 -->
    <div class="container4">
      <div class="inner">
        <div class="section4">
          <!-- 이미지 -->
          <div class="section4-1">
            <img src="/images/yongdal4.png" alt="" />
          </div>
          <!-- 텍스트 -->
          <div class="section4-2">
            <p>실시간 배송조회도</p>
            <span>짐이 어디있는지 한눈에<br />실시간 확인하기</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 배너 및 메뉴 이동 섹션 -->
    <div class="banner-section">
      <div class="inner-container">
        <!-- 왼쪽 배너 이미지 -->
        <div class="banner-image">
          <img
            :src="images1[currentIndex1]"
            alt="가방도 배너"
            class="fade-image" />
        </div>

        <!-- 오른쪽 메뉴 이동 및 예약 버튼 -->
        <div class="menu-box">
          <!-- 2x2 메뉴 -->
          <div class="menu-grid">
            <router-link to="/bangbeob2">
              <div class="menu-item">
                <p class="menu-title">이용안내</p>
                <p class="menu-desc">짐운송, 짐안내 이용안내 확인하기</p>
              </div>
            </router-link>
            <router-link to="/yogeum">
              <div class="menu-item">
                <p class="menu-title">이용요금</p>
                <p class="menu-desc">짐운송 이용요금 확인하기</p>
              </div>
            </router-link>
            <router-link to="/sotong2">
              <div class="menu-item">
                <p class="menu-title">이용후기</p>
                <p class="menu-desc">고객 이용후기 확인하기</p>
              </div>
            </router-link>
            <router-link to="/yh_festival">
              <div class="menu-item">
                <p class="menu-title">축제안내</p>
                <p class="menu-desc">대구시 축제 확인하기</p>
              </div>
            </router-link>
          </div>

          <!-- 예약 버튼 -->
          <router-link to="/yeyak">
            <button class="reserve-button">예약하기</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- 모달창 -->
  <Modal v-if="showModal" @close="showModal = false" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Clock4, MapPin, Shield } from "lucide-vue-next";
import Modal from "../b_main/Modal.vue";
const showModal = ref(false);
const images = [
  "/images/yr/mainImg/attraction1.png",
  "/images/yr/mainImg/attraction2.jpg",
  // "/images/yr/mainImg/attraction3.jpg",
  "/images/yr/mainImg/attraction4.jpg",
  "/images/yr/mainImg/attraction5.jpg",
  "/images/yr/mainImg/attraction6.jpg",
];

const currentIndex = ref(0);

onMounted(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
  }, 4000); // 4초마다 이미지 전환
});

// 이미지 배열
const images1 = [
  "/images/yr/mainImg/banner2.png",
  "/images/yr/mainImg/banner3.png",
  "/images/yr/mainImg/banner1.png",
];

// 현재 보여줄 이미지 index
const currentIndex1 = ref(0);
let intervalId = null;

// 3초마다 이미지 변경
onMounted(() => {
  intervalId = setInterval(() => {
    currentIndex1.value = (currentIndex1.value + 1) % images1.length;
  }, 3000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style scoped lang="scss">
.wrap {
  margin-top: 70px;

  @media screen and (max-width: 635px) {
    margin-top: 50px;
  }

  .slider {
    position: relative;
    width: 100%;
    height: 93vh;
    overflow: hidden;

    @media screen and (max-width: 635px) {
      height: 100vh;
    }

    .slide {
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      opacity: 0;
      transition: opacity 1s ease-in-out;
    }

    .slide.active {
      opacity: 1;
      z-index: 1;
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.3)
      );
      z-index: 1;
      pointer-events: none;
    }

    .inner {
      position: relative;
      z-index: 2;
      max-width: 1200px;
      margin: 160px auto;
      padding: 0 20px;

      @media screen and (max-width: 1024px) {
        margin: 120px auto;
      }

      @media screen and (max-width: 635px) {
        margin: 80px auto;
        padding: 0 15px;
      }

      .container1 {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;

        .contain1 {
          display: flex;
          gap: 15px;
          align-items: center;

          @media screen and (max-width: 768px) {
            gap: 10px;
          }

          @media screen and (max-width: 635px) {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          img {
            width: 80px;
            height: 80px;
            transition: transform 0.3s ease;

            @media screen and (max-width: 768px) {
              width: 70px;
              height: 70px;
            }

            @media screen and (max-width: 635px) {
              width: 60px;
              height: 60px;
            }

            &:hover {
              transform: scale(1.05);
            }
          }

          .sLetter {
            p {
              color: #fff;
              font-size: 35px;
              line-height: 1.25;
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

              @media screen and (max-width: 768px) {
                font-size: 28px;
              }

              @media screen and (max-width: 635px) {
                font-size: 24px;
              }
            }
          }
        }

        .contain2 {
          p {
            color: #279bf3;
            font-size: 110px;
            font-weight: 700;
            padding-bottom: 30px;
            line-height: 1;
            margin-top: 20px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;

            @media screen and (max-width: 1024px) {
              font-size: 80px;
            }

            @media screen and (max-width: 768px) {
              font-size: 70px;
            }

            @media screen and (max-width: 635px) {
              font-size: 50px;
              padding-bottom: 20px;
              margin-top: 10px;
            }

            &:hover {
              transform: scale(1.02);
            }
          }
        }

        .contain3 {
          color: #fff;
          font-size: 32px;
          padding-bottom: 18px;
          line-height: 1.25;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);

          @media screen and (max-width: 768px) {
            font-size: 26px;
          }

          @media screen and (max-width: 635px) {
            font-size: 20px;
            padding-bottom: 12px;
          }
        }

        .contain4 {
          color: #fff;
          font-size: 30px;
          display: flex;
          gap: 15px;

          @media screen and (max-width: 768px) {
            gap: 12px;
            font-size: 24px;
          }

          @media screen and (max-width: 635px) {
            flex-direction: column;
            gap: 10px;
            font-size: 18px;
          }

          .btn1,
          .btn2 {
            margin-top: 15px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.8);
            padding: 12px 42px;
            border-radius: 8px;
            color: #fff;
            font-size: 22px;
            cursor: pointer;
            width: auto;
            transition: all 0.3s ease;

            @media screen and (max-width: 768px) {
              padding: 10px 35px;
              font-size: 20px;
            }

            @media screen and (max-width: 635px) {
              padding: 10px 25px;
              font-size: 18px;
              width: 100%;
              text-align: center;
            }

            &:hover {
              transform: translateY(-2px);
              background-color: #fff;
              color: #279bf3;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            &:active {
              transform: translateY(0);
            }
          }
        }
      }

      .contain5 {
        @media screen and (max-width: 1024px) {
          gap: 30px;
        }

        @media screen and (max-width: 768px) {
          gap: 25px;
          margin-top: 50px;
        }

        @media screen and (max-width: 635px) {
          flex-direction: column;
          gap: 20px;
          margin-top: 40px;
        }

        .flex {
          @media screen and (max-width: 635px) {
            width: 100%;
          }

          .w-\[60px\] {
            @media screen and (max-width: 768px) {
              width: 50px;
              height: 50px;
            }

            @media screen and (max-width: 635px) {
              width: 45px;
              height: 45px;
            }
          }

          .w-\[35px\] {
            @media screen and (max-width: 768px) {
              width: 28px;
              height: 28px;
            }

            @media screen and (max-width: 635px) {
              width: 25px;
              height: 25px;
            }
          }

          .text-\[22px\] {
            @media screen and (max-width: 768px) {
              font-size: 20px;
            }

            @media screen and (max-width: 635px) {
              font-size: 18px;
            }
          }

          .text-m {
            @media screen and (max-width: 768px) {
              font-size: 14px;
            }

            @media screen and (max-width: 635px) {
              font-size: 13px;
            }
          }
        }
      }
    }
  }

  // 컨텐츠 섹션 공통 스타일
  .container2,
  .container3,
  .container4 {
    .inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;

      @media screen and (max-width: 635px) {
        padding: 0 15px;
      }

      .section1,
      .section3,
      .section4 {
        padding: 80px 0;
        display: flex;
        align-items: center;
        gap: 40px;

        @media screen and (max-width: 1024px) {
          padding: 60px 0;
          gap: 30px;
        }

        @media screen and (max-width: 768px) {
          padding: 40px 0;
          flex-direction: column;
          text-align: center;
          gap: 25px;
        }

        @media screen and (max-width: 635px) {
          padding: 30px 0;
          gap: 20px;
        }

        .section1-1,
        .section3-2,
        .section4-1 {
          background-color: #f0f0f0;
          width: 20%;
          border-radius: 300px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.3s ease;

          @media screen and (max-width: 768px) {
            width: 40%;
          }

          @media screen and (max-width: 635px) {
            width: 50%;
          }

          &:hover {
            transform: scale(1.05);
          }

          img {
            width: 70%;
            transition: transform 0.3s ease;

            &:hover {
              transform: scale(1.1);
            }
          }
        }

        .section1-2,
        .section3-1,
        .section4-2 {
          flex: 1;
          padding: 0 5%;

          @media screen and (max-width: 768px) {
            padding: 0;
          }

          p {
            color: #279bf3;
            font-size: 45px;
            padding-bottom: 3%;
            font-weight: 500;
            transition: transform 0.3s ease;

            @media screen and (max-width: 1024px) {
              font-size: 38px;
            }

            @media screen and (max-width: 768px) {
              font-size: 32px;
            }

            @media screen and (max-width: 635px) {
              font-size: 28px;
            }

            &:hover {
              transform: translateX(5px);
            }
          }

          span {
            color: #6f6f6f;
            font-size: 25px;
            line-height: 1.4;

            @media screen and (max-width: 1024px) {
              font-size: 22px;
            }

            @media screen and (max-width: 768px) {
              font-size: 20px;
            }

            @media screen and (max-width: 635px) {
              font-size: 18px;
            }
          }
        }
      }
    }
  }

  // 배너 및 메뉴 섹션
  .banner-section {
    background-color: #ffffff;
    width: 100%;
    padding: 40px 0;

    @media screen and (max-width: 768px) {
      padding: 30px 0;
    }

    @media screen and (max-width: 635px) {
      padding: 20px 0;
    }
  }

  .inner-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 30px;
    padding: 0 20px;

    @media screen and (max-width: 1024px) {
      gap: 20px;
    }

    @media screen and (max-width: 768px) {
      flex-direction: column;
      gap: 25px;
    }

    @media screen and (max-width: 635px) {
      padding: 0 15px;
      gap: 20px;
    }
  }

  .banner-image {
    flex: 1;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .menu-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media screen and (max-width: 768px) {
      gap: 15px;
    }
  }

  .menu-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;

    @media screen and (max-width: 635px) {
      gap: 10px;
    }
  }

  .menu-item {
    background-color: #f8f8f8;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    cursor: pointer;

    @media screen and (max-width: 768px) {
      padding: 20px;
    }

    @media screen and (max-width: 635px) {
      padding: 15px;
    }

    &:hover {
      transform: translateY(-3px);
      background-color: #f0f0f0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .menu-title {
      font-weight: 600;
      margin-bottom: 8px;
      color: #222;
      font-size: 25px;

      @media screen and (max-width: 768px) {
        font-size: 22px;
      }

      @media screen and (max-width: 635px) {
        font-size: 20px;
        margin-bottom: 6px;
      }
    }

    .menu-desc {
      font-size: 14px;
      color: #666;
      line-height: 1.4;

      @media screen and (max-width: 635px) {
        font-size: 13px;
      }
    }
  }

  .reserve-button {
    background-color: #279bf3;
    color: #ffffff;
    font-size: 30px;
    font-weight: bold;
    padding: 25px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    box-shadow: 0 4px 12px rgba(39, 155, 243, 0.2);
    border: none;

    @media screen and (max-width: 768px) {
      font-size: 26px;
      padding: 20px;
    }

    @media screen and (max-width: 635px) {
      font-size: 22px;
      padding: 18px;
    }

    &:hover {
      background-color: #357acc;
      transform: translateY(-3px);
      box-shadow: 0 6px 16px rgba(39, 155, 243, 0.3);
    }

    &:active {
      transform: translateY(-1px);
    }
  }
}
</style>
