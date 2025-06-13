<template>
  <div class="widthAllBg">
    <div class="blockgr"></div>
    <div class="inner">
      <!-- 그라데이션 구분 -->

      <div class="title">
        <h2>고객님들의</h2>
        <h2>이용후기</h2>
        <router-link to="/Sotong2">
          <button>View More</button>
        </router-link>
        <div class="grayLine"></div>
      </div>
      <swiper
        :slides-per-view="3.5"
        :space-between="30"
        :modules="[Pagination]"
        :breakpoints="{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }"
        class="mySwiper">
        <!-- 리뷰카드1 -->
        <swiper-slide>
          <div class="Reviews">
            <!-- 사진 -->
            <div class="cardImg">
              <img src="/public/images/carrier2.png" alt="" />
            </div>
            <!-- 이름 -->
            <div class="name">
              <p>김 * *</p>
            </div>
            <!-- 후기 -->
            <div class="Review">
              <p>출장길 짐때문에 이동이 번거로울 뻔했는데</p>
              <p>지인의 추천으로 써보니 좋았습니다.</p>
            </div>
          </div>
        </swiper-slide>
        <!-- 리뷰카드2 -->
        <swiper-slide>
          <div class="Reviews">
            <!-- 사진 -->
            <div class="cardImg">
              <img src="/public/images/carrier3.png" alt="" />
            </div>
            <!-- 이름 -->
            <div class="name">
              <p>하 * *</p>
            </div>
            <!-- 후기 -->
            <div class="Review">
              <p>부모님 데리고 가족여행을 대구로 왔는데</p>
              <p>짐이 너무 많은거에요!! 덕분에 짐 덜었습니다ㅎㅎ</p>
            </div>
          </div>
        </swiper-slide>
        <!-- 리뷰카드3 -->
        <swiper-slide>
          <div class="Reviews">
            <!-- 사진 -->
            <div class="cardImg">
              <img src="/public/images/carrier5.png" alt="" />
            </div>
            <!-- 이름 -->
            <div class="name">
              <p>권 * *</p>
            </div>
            <!-- 후기 -->
            <div class="Review">
              <p>이번 여행때 차가없어서 고민이 많았는데</p>
              <p>
                친구의 추천으로 알게되었습니다. 한번씩 가벼운 여행을 하고 싶을때
                추천드립니다.
              </p>
            </div>
          </div>
        </swiper-slide>
        <!-- 리뷰카드4 -->
        <swiper-slide>
          <div class="Reviews">
            <!-- 사진 -->
            <div class="cardImg">
              <img src="/public/images/carrier6.png" alt="" />
            </div>
            <!-- 이름 -->
            <div class="name">
              <p>하 * *</p>
            </div>
            <!-- 후기 -->
            <div class="Review">
              <p>부모님 데리고 가족여행을 대구로 왔는데</p>
              <p>짐이 너무 많은거에요!! 덕분에 짐 덜었습니다ㅎ</p>
            </div>
          </div>
        </swiper-slide>
        <!-- 리뷰카드5 -->
        <swiper-slide>
          <div class="Reviews">
            <!-- 사진 -->
            <div class="cardImg">
              <img src="/public/images/carrier4.png" alt="" />
            </div>
            <!-- 이름 -->
            <div class="name">
              <p>우 * *</p>
            </div>
            <!-- 후기 -->
            <div class="Review">
              <p>즐거운여행!!</p>
              <p>가벼운 여행!!</p>
            </div>
          </div>
        </swiper-slide>
        <!-- 리뷰카드6 -->
        <swiper-slide>
          <div class="Reviews">
            <!-- 사진 -->
            <div class="cardImg">
              <img src="/public/images/carrier1.png" alt="" />
            </div>
            <!-- 이름 -->
            <div class="name">
              <p>나 * *</p>
            </div>
            <!-- 후기 -->
            <div class="Review">
              <p>대구 여행길 짐이 많아 고민이었는데</p>
              <p>덕분에 편하게 여행했습니다.</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
// import '@/style.css';
import { Pagination } from "swiper/modules";
</script>
<style lang="scss" scoped>
@use "/src/assets/Variables" as *;

.widthAllBg {
  margin-top: 150px;

  @media screen and (max-width: 635px) {
    margin-top: 80px;
  }

  .inner {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;

    @media screen and (max-width: 1024px) {
      flex-direction: column;
    }

    .title {
      width: 35%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      @media screen and (max-width: 1024px) {
        width: 100%;
        margin-bottom: 40px;
      }

      h2 {
        font-size: 35px;
        text-align: center;
        font-family: $font-family;
        padding-bottom: 5px;

        @media screen and (max-width: 635px) {
          font-size: 28px;
        }
      }

      button {
        border: 1px solid #8b8b8b;
        border-radius: 30px;
        font-size: 20px;
        padding: 5px 15px;
        color: #8b8b8b;
        margin-top: 50px;

        @media screen and (max-width: 635px) {
          font-size: 16px;
          margin-top: 30px;
        }

        &:hover {
          background-color: #8b8b8b;
          color: #fff;
        }
      }

      .grayLine {
        width: 80px;
        height: 5px;
        background-color: #8b8b8b;
        margin-top: 212px;

        @media screen and (max-width: 1024px) {
          display: none;
        }
      }
    }

    :deep(.swiper) {
      width: 65%;
      padding: 20px 0;

      @media screen and (max-width: 1024px) {
        width: 100%;
      }

      @media screen and (max-width: 635px) {
        padding: 10px 0;
      }
    }

    :deep(.swiper-slide) {
      height: auto;
    }

    .Reviews {
      width: 100%;
      height: auto;
      min-height: 430px;
      border: 3px solid #f0f0f0;
      padding: 4%;
      border-radius: 15px;
      display: flex;
      flex-direction: column;

      @media screen and (max-width: 1024px) {
        min-height: 400px;
      }

      @media screen and (max-width: 635px) {
        min-height: 380px;
        padding: 3%;
      }

      .cardImg {
        position: relative;
        width: 100%;
        padding-top: 75%; // 4:3 비율 유지
        margin-bottom: 15px;

        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 5px;
          object-fit: cover;
          object-position: center;
        }
      }

      .name {
        font-size: 24px;
        margin: 10px 0;
        flex-shrink: 0;

        @media screen and (max-width: 635px) {
          font-size: 20px;
          margin: 8px 0;
        }
      }

      .Review {
        font-size: 15px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        @media screen and (max-width: 635px) {
          font-size: 14px;
        }

        p {
          font-family: "Pretendard";
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.4;
        }
      }
    }
  }
}
</style>
