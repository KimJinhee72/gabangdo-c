<script setup>
import { computed, ref, onMounted, onUnmounted, onBeforeUnmount } from "vue";

import Tab from "../../components/Tab.vue";
import bb_container1 from "../../components/bb_container1.vue";
import ProgressStepper from "../yeyak/ProgressStepper.vue";
const showStepper = ref(true);
const stepIndex = ref(1);

//스텝퍼
const headerHeight = document.querySelector(".header")?.offsetHeight || 0;
const offset = 100;
const selectors = ["#step1", "#step2", "#step3", "#step4"];

function scrollToSection(idx) {
  stepIndex.value = idx;
  const sel = selectors[idx - 1];
  const el = document.querySelector(sel);
  if (!el) return;
  const top =
    el.getBoundingClientRect().top + window.scrollY - headerHeight - offset;
  window.scrollTo({ top, behavior: "smooth" });
}
// 스크롤할 때 현재 위치에 맞는 인덱스 계산
function updateActiveOnScroll() {
  const scrollY = window.scrollY + headerHeight + offset + 1;
  let current = 1;

  for (let i = 0; i < selectors.length; i++) {
    const el = document.querySelector(selectors[i]);
    if (!el) continue;
    // 섹션의 실제 문서 상단 위치
    const sectionTop = el.offsetTop;
    if (scrollY >= sectionTop) {
      current = i + 1;
    } else {
      break;
    }
  }

  // 맨 아래에 도달하면 마지막
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 5) {
    current = selectors.length;
  }

  stepIndex.value = current;
}
onMounted(() => {
  // 초기값 세팅
  updateActiveOnScroll();
  // 스크롤 리스너 등록
  window.addEventListener("scroll", updateActiveOnScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateActiveOnScroll);
});
</script>

<template>
  <!-- 전체 -->
  <div class="wrap_total">
    <div class="bb_inner">
      <!-- 스텝퍼 네비바 -->
      <ProgressStepper
        v-show="showStepper"
        :steps="['전달방법', '요금안내', '무인보관함', '유의사항']"
        :selectors="['#step1', '#step2', '#step3', '#step4']"
        :stepIndex="stepIndex"
        @go="scrollToSection"
        class="sticky-stepper hide-controls custom-stepper" />
      <div ref="step1" id="step1" class="step-container">
        <div class="title">
          <p class="title1">가방전달 방법</p>
          <p class="title2">출발지별 안내사항</p>
        </div>
        <bb_container1 />
      </div>
    </div>
    <!-- 구분선 -->
    <div class="line"></div>
    <!-- 짐보관 이용안내 -->
    <div ref="step2" id="step2" class="step-container">
      <div class="bb_container2">
        <div class="bb_inner">
          <!-- 타이틀 2 -->
          <div class="bb_title2">
            <!-- 제목 스타일 -->
            <!-- 제목 -->
            <div class="bb_title_txt2">
              <h1>짐보관 요금안내</h1>
              <p>사이즈별 가격책정</p>
            </div>
          </div>
          <!-- 이용안내 전체 -->
          <div class="bb_luggageNotice">
            <!-- 이용안내_요금안내 -->
            <div class="bb_luggagepriceInfo bb_luggagePlusMinus">
              <!-- 요금안내_위 -->
              <div class="bb_priceInfoTop">
                <!-- 운영시간 -->
                <div class="bb_priceInfoTime">
                  <p>운영시간 : 05시 - 00시</p>
                  <div class="bb_priceInfoDetail">
                    <ul>
                      <li>*역마다 차이가 있을 수 있습니다.</li>
                      <li>*기차역의 경우 오후 11시에 마감됩니다.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <!-- 세부사항 -->
              <!-- 요금안내_아래 -->
              <div class="bb_priceInfoBottom">
                <!-- 파란배경글씨 -->
                <div class="bb_priceInfoMenu">
                  <ul>
                    <li class="bb_leftTum">구분</li>
                    <li class="bb_left">
                      기본요금<br />
                      <p class="small">(시작 - 4시간이내)</p>
                    </li>
                    <li class="bb_left">
                      추가요금<br />
                      <p class="small">(4시간이후 12시간마다)</p>
                    </li>
                  </ul>
                </div>
                <!-- 세부글씨 -->
                <div class="bb_priceInfoMenuDetail">
                  <ul class="bb_infowrap">
                    <li class="bb_left">
                      <div class="bb_leftTum1">소형</div>
                      <div class="bb_leftbottum">45cm X 56cm X 30cm</div>
                    </li>
                    <li class="bb_middleTum">2,000원</li>
                    <li class="bb_rightTum">2,000원</li>
                  </ul>
                  <ul class="bb_infowrap">
                    <li class="bb_left">
                      <div class="bb_leftTum1">중형</div>
                      <div class="bb_leftbottum">45cm X 56cm X 45cm</div>
                    </li>
                    <li class="bb_middleTum">3,000원</li>
                    <li class="bb_rightTum">3,000원</li>
                  </ul>
                  <ul class="bb_infowrap">
                    <li class="bb_left">
                      <div class="bb_leftTum1">대형</div>
                      <div class="bb_leftbottum">45cm X 56cm X 60cm</div>
                    </li>
                    <li class="bb_middleTum">4,000원</li>
                    <li class="bb_rightTum">4,000원</li>
                  </ul>
                  <ul class="bb_infowrap">
                    <li class="bb_left">
                      <div class="bb_leftTum1">특대형</div>
                      <div class="bb_leftbottum">45cm X 56cm X 90cm</div>
                    </li>
                    <li class="bb_middleTum">5,000원</li>
                    <li class="bb_rightTum">5,000원</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- 이용안내_요금안내 / 모바일일때 -->
            <div class="bb_luggagepriceInfo bb_luggagePlus">
              <!-- 요금안내_위 -->
              <div class="bb_priceInfoTop">
                <!-- 운영시간 -->
                <div class="bb_priceInfoTime">
                  <p>운영시간 05시 - 00시</p>
                </div>
                <!-- 세부사항 -->
                <div class="bb_priceInfoDetail">
                  <ul>
                    <li>*역마다 차이가 있을 수 있습니다.</li>
                    <li>*기차역의 경우 오후 11시에 마감됩니다.</li>
                  </ul>
                </div>
              </div>
              <!-- 요금안내_아래 -->
              <div class="bb_priceInfoBottom">
                <!-- 파란배경글씨 -->
                <div class="bb_priceInfoMenu">
                  <ul>
                    <li class="bb_leftTum">구분</li>
                  </ul>
                </div>
                <!-- 세부글씨 -->
                <div class="bb_priceInfoMenuDetail">
                  <ul>
                    <li class="bb_red bb_someMore">소형</li>
                    <li class="bb_blue bb_someMore">중형</li>
                    <li class="bb_green bb_someMore">대형</li>
                    <li class="bb_purple">특대형</li>
                  </ul>
                </div>
                <div class="bb_priceInfoMenu">
                  <ul>
                    <li class="bb_leftTum">요금 (시작 - 4시간이내)</li>
                  </ul>
                </div>
                <!-- 세부글씨 -->
                <div class="bb_priceInfoMenuDetail">
                  <ul>
                    <li class="bb_red">2,000</li>
                    <li class="bb_blue">3,000</li>
                    <li class="bb_green">4,000</li>
                    <li class="bb_purple">5,000</li>
                  </ul>
                </div>
                <div class="bb_priceInfoMenu">
                  <ul>
                    <li class="bb_leftTum">요금(4시간이후 12시간마다)</li>
                  </ul>
                </div>
                <!-- 세부글씨 -->
                <div class="bb_priceInfoMenuDetail">
                  <ul>
                    <li class="bb_red">2,000원</li>
                    <li class="bb_blue">3,000원</li>
                    <li class="bb_green">4,000원</li>
                    <li class="bb_purple">5,000원</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- 이용안내_수화물규격 -->
            <div class="bb_luggageImgNotice">
              <!-- 수화물 S -->
              <div class="bb_luggage">
                <!-- 큰글씨 -->
                <div class="bb_luggageTitleM">
                  <p>소형</p>
                </div>
                <!-- 소제목 -->
                <div class="bb_luggageTitle">
                  <p>기내용 캐리어, 소형 배낭등</p>
                </div>
                <!-- 그림 -->
                <div class="bb_luggageimg">
                  <img
                    src="/images/yr/page2/size4.png"
                    class="bb_smaller"
                    alt="sSize" />
                </div>
                <!-- 디테일 -->
                <div class="bb_luggagedetail">
                  <p>좌우 45cm X 깊이 56cm X 높이 30cm</p>
                </div>
              </div>
              <!-- 수화물 M -->
              <div class="bb_luggage">
                <!-- 큰글씨 -->
                <div class="bb_luggageTitleM">
                  <p>중형</p>
                </div>
                <!-- 소제목 -->
                <div class="bb_luggageTitle">
                  <p>화물용 캐리어, 등산가방 등</p>
                </div>
                <!-- 그림 -->
                <div class="bb_luggageimg">
                  <img
                    src="/images/yr/page2/size4.png"
                    alt="sSize"
                    class="bb_smaller" />
                </div>
                <!-- 디테일 -->
                <div class="bb_luggagedetail">
                  <p>좌우 45cm X 깊이 56cm X 높이 45cm</p>
                </div>
              </div>
              <!-- 수화물 L -->
              <div class="bb_luggage">
                <!-- 큰글씨 -->
                <div class="bb_luggageTitleM">
                  <p>대형</p>
                </div>
                <!-- 소제목 -->
                <div class="bb_luggageTitle">
                  <p>대형 캐리어, 골프백, 대형배낭 등</p>
                </div>
                <!-- 그림 -->
                <div class="bb_luggageimg">
                  <img
                    src="/images/yr/page2/size4.png"
                    alt="sSize"
                    class="bb_smaller" />
                </div>
                <!-- 디테일 -->
                <div class="bb_luggagedetail">
                  <p>좌우 45cm X 깊이 56cm X 높이 60cm</p>
                </div>
              </div>
              <!-- 수화물 XL -->
              <div class="bb_luggage">
                <!-- 큰글씨 -->
                <div class="bb_luggageTitleM">
                  <p>특대형</p>
                </div>
                <!-- 소제목 -->
                <div class="bb_luggageTitle">
                  <p>기타 물품 및 표시 외 사이즈</p>
                </div>
                <!-- 그림 -->
                <div class="bb_luggageimg">
                  <img
                    src="/images/yr/page2/size4.png"
                    alt="sSize"
                    class="bb_smaller" />
                </div>
                <!-- 디테일 -->
                <div class="bb_luggagedetail">
                  <p>좌우 45cm X 깊이 56cm X 높이 90cm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 구분선 -->
    <div class="line"></div>
    <!-- 무인보관함 위치안내 -->
    <div ref="step3" id="step3" class="step-container">
      <div class="bb_container3">
        <div class="bb_inner">
          <!-- 타이틀 3 -->
          <div class="bb_title3">
            <!-- 제목 스타일 -->
            <!-- <div class="bb_titleLine"></div> -->
            <!-- 제목 -->
            <div class="bb_title_txt3">
              <h1>무인보관함 위치안내</h1>
            </div>
          </div>
          <!-- 탭버튼 지하철, 기차, 공항 -->
          <Tab />
        </div>
      </div>
      <div class="bb_container4">
        <div class="bb_container3">
          <div class="bb_inner bb_centerLine">
            <!-- 공지 왼쪽 -->
            <div class="bb_contain3Left">
              <!-- 용달씨 그림 -->
              <div class="bb_yongdal">
                <img src="/images/yr/page2/2p_character.png" alt="" />
              </div>
              <p class="bb_sizeControll">확인해주세요!</p>
            </div>

            <!-- 공지 오른쪽 -->
            <div class="bb_contain3Right">
              <!-- 유의사항_위 -->
              <div class="bb_noteTop">
                <ul class="bb_notice1">
                  <li>
                    • 보관 후 7일이 지난 물품은 관리자의 요청에 따라 이동될 수
                    있습니다.
                  </li>
                  <li>
                    • 보관함 이용 시 문이 잘 닫혔는지 꼭 확인해 주십시오. 문을
                    닫지 않아 발생하는 사고에 대한 책임을 지지 않습니다.
                  </li>
                  <li>
                    • 보관함보다 큰 물품, 귀중훔, 위험물, 동식물 등 부패할 수
                    있는 음식물은 보관할 수 없습니다.
                  </li>
                  <li>
                    • 천재지변, 전쟁, 사용자 과실, 기타 불가항력적인 이유로
                    발생하는 손해에 대해서는 책임을 지지 않습니다.
                    <span class="indent"
                      >단, 보관함 자체에 결함으로 발생한 과실에 대해서는 검증 후
                      보상해 드립니다.</span
                    >
                  </li>
                  <li>
                    • 유사시 보관함 관리를 위해 보관함을 임시로 열어 점검할 수
                    있습니다.
                  </li>
                  <li>
                    • 보관함 이용중 발생한 문제는 고객센터 또는 현장 관리자에게
                    신고해 주십시오.
                  </li>
                </ul>
                <!-- 이용약관 상세보기 버튼 -->
                <div class="bb_noticeButton">
                  <button>이용약관 상세보기</button>
                </div>
              </div>
              <!-- 유의사항_아래 -->
              <div class="bb_noteDown1">
                <h2 class="bb_noticeSubtitle">보관금지 물품</h2>
                <ul class="bb_notice2">
                  <li>
                    <p class="bb_stron1">현금보관금지 :</p>
                    공공기관에서는 보관함에 현금을 넣어두라고 요구하지 않습니다.
                  </li>
                  <li>
                    <p class="bb_stron1">음식물보관금지 :</p>
                    음식물 보관 시 부패나 악취로 인해 사전에 경고 없이
                    폐기처분될 수 있습니다.
                  </li>
                </ul>
              </div>
              <div
                class="bb_noteDown2"
                style="list-style: none; padding-left: 0">
                <h2 class="bb_noticeSubtitle">보관함 이용 협조 안내</h2>
                <ul class="bb_notice2">
                  <li>
                    • 다른 사용자를 위해 보관된 물품은 꼭 찾아가 주세요.<br />
                    <p class="bb_Strong2">30일 이후로는 폐기 예정</p>
                    입니다.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 구분선 -->
    <div class="line"></div>
    <!-- 유의사항2 -->
    <div ref="step4" id="step4" class="step-container">
      <div class="bb_container5">
        <div class="bb_innerBottom">
          <div class="bb_title3">
            <!-- 제목 스타일 -->
            <!-- <div class="bb_titleLine"></div> -->
            <!-- 제목 -->
            <div class="bb_title_txt3">
              <h1>가방분실 / 파손시 유의사항</h1>
            </div>
          </div>
        </div>
        <div class="bb_container4Bg">
          <div class="bb_inner">
            <!-- 타이틀3 -->

            <!-- 유의사항 긴글 -->
            <div class="bb_notice">
              <h3>기본 보상 제공</h3>
              <p>
                서비스 이용 중 가방이 분실되거나 심각한 손상이 발생한 경우,
                <br />최대 30만 원까지 보상됩니다.
              </p>
              <h3>추가 보장 옵션 (선택 사항)</h3>
              <p>
                고객이 추가 보험 옵션을 선택할 경우, 기본 보상 외 추가 금액 보장
                가능<br />
                (상세 조건은 보험 상품에 따라 다름).
              </p>
              <h3>보험 적용 제외 사항</h3>
              <ul>
                <li>• 고객의 부주의로 인해 발생한 분실 또는 손상</li>
                <li>
                  • 가방 내부 물품의 파손, 분실 (가방 자체가 아닌 내용물 손상은
                  보상 불가)
                </li>
              </ul>

              <h3 class="_bbTum">안전한 운송 시스템</h3>
              <p>
                모든 가방은 철저하게 관리되며,<br />
                실시간 추적을 통해 더욱 안전하게 보관 및 배송됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "/src/assets/Main.scss" as *;
@use "/src/assets/Variables.scss" as *;

// 스텝퍼
:deep(.stepper) {
  display: flex;
  flex-direction: column;
  z-index: 6500;
}

.sticky-stepper {
  position: fixed;
  top: 120px;
  left: 0;
  width: 80px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 6500;
  padding: 10px;
  color: #555;
  &.custom-stepper {
    // only on your custom one
    left: calc(47.5% - 600px);
    width: 120px;

    &.hide-controls {
      // hide the nav & circles only when .hide-controls is present
      ::v-deep .step-nav,
      ::v-deep .circle {
        display: none !important;
      }
    }

    // style all your labels
    ::v-deep .label {
      margin-top: 6px;
      font-size: 17px;
      cursor: pointer;
      padding: 5px 10px;
      transition: background 0.2s;

      &:hover {
        border-bottom: 2px solid rgba($sub-color, 0.3);
        color: #555;
        font-weight: bold;
      }
    }

    // active-step styles
    ::v-deep .step.active .label {
      border-bottom: 2px solid rgba($sub-color, 0.3);
      color: #555;
      font-weight: bold;
    }
  }
}
.bb_inner {
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  // 컨테이너1
  .title {
    margin: 0 auto;
    text-align: center;
    margin-bottom: 30px;
    .title1 {
      font-family: $font-ownglyph;
      font-size: 40px;
    }
    .title2 {
      font-family: $font-ownglyph;
      font-size: 25px;
      color: #5a5a5a;
      img {
        width: 100%;
        height: auto; // 비율 유지
      }
    }
    .bb_span {
      font-size: 20px;
    }
    span.bb_spanPlus {
      font-size: 20px;
    }
  }
  .arrow {
    position: relative;
    padding: 90px 0 120px 0;
  }
  .bb_kakao {
    display: flex;
    background-color: #f4f4f4;
    border-radius: 80px;
    width: 45%;
    position: relative;
    margin-top: 20px;
    cursor: pointer;
    .bb_kakaoIcon {
      padding: 3px;

      img {
        border-radius: 50px;
        width: 30px;
        height: 30px;
      }
    }
  }
}
.bb_plus {
  display: none;
}

// 짐보관 이용안내

.bb_container2 {
  // background-color: $background-maincolor;
  width: 100%;
  .bb_inner {
    position: relative;
    max-width: 1100px;
    margin: 0 auto;
    .bb_title2 {
      margin-top: 60px;
      display: flex;
      justify-content: center;
      gap: 10px;
      line-height: 40px;
      margin-bottom: 30px;
      .bb_titleLine {
        width: 3px;
        height: 35px;
        background-color: $main-color;
      }
      .bb_title_txt2 h1 {
        font-size: 40px;
        font-family: $font-ownglyph;
      }
      .bb_title_txt2 p {
        font-family: $font-ownglyph;
        font-size: 25px;
        color: #5a5a5a;
      }
    }
  }
  // 1. 파란 헤더행 (.bb_priceInfoMenu)
  .bb_priceInfoMenu > ul {
    display: flex;
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    & > li:nth-child(1) {
      flex: 1;
      text-align: center;
      padding-left: 1rem;
    }
    & > li:nth-child(2),
    & > li:nth-child(3) {
      flex: 1;
      text-align: center;
    }
  }
  // 2. 내용 행들 (.bb_priceInfoMenuDetail)
  .bb_priceInfoMenuDetail > ul.bb_infowrap {
    display: flex;
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0.5rem 0;
    /* 첫 번째 칸(크기/치수) */
    & > li:nth-child(1) {
      flex: 1;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 1rem;
    }
    //가운데·오른쪽 칸(요금)
    & > li:nth-child(2),
    & > li:nth-child(3) {
      flex: 1;
      text-align: center;
    }
    .bb_title_txt2 p {
      font-family: $font-ownglyph;
      font-size: 25px;
      color: #5a5a5a;
    }
  }
  // 3. font-size 등 미세 조정용
  .bb_priceInfoMenuDetail li,
  .bb_priceInfoMenu li {
    font-size: 1.1rem; /* 필요하다면 조정 */
  }

  // 이용안내_수화물규격
  .bb_luggageNotice {
    .bb_luggageImgNotice {
      display: flex;
      flex-wrap: wrap; /* 요소가 넘치면 자동 줄바꿈 */
      flex: 1;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 60px;
      .bb_luggage {
        padding: 3px;
        width: calc((100% - 4%) / 4);
        background-color: #fff;
        border-radius: $radius;
        border: 2px solid #e5e7eb;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .bb_luggageTitleM {
          font-size: 25px;
          font-weight: bold;
          padding-bottom: 3%;
        }
        .bb_luggageTitle {
          font-size: 17px;
          font-weight: bold;
          color: #264884;
        }
        .bb_luggageimg {
          width: 60%;
          height: 60%;
          .bb_smaller {
            padding: 40%;
            margin-top: 10%;
            margin-bottom: 10%;
          }
          img {
            width: 100%;
            height: 100%;
            padding: 5%;
          }
          .bb_smaller {
            padding: 10%;
          }
        }
        .bb_luggagedetail {
          font-size: 15px;
          color: #8f8f8f;
          font-weight: bold;
        }
      }
    }
    .bb_luggagepriceInfo {
      border: 2px solid #e5e7eb;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      width: 100%;
      background-color: #fff;
      border-radius: $radius;
      // border: $main-color solid 1px;
      padding: 2%;
      margin-bottom: 30px;
      .bb_priceInfoTop {
        .bb_priceInfoTime {
          width: 30%;
          height: auto;
          padding: 15px;
          background-color: #d7d7d7;
          border-radius: $radius;
          text-align: center;
          margin-bottom: 40px;
          p {
            font-size: 20px;
          }
        }
      }
      .bb_priceInfoBottom {
        .bb_priceInfoMenu {
          background-color: #279bf4;
          width: 100%;
          padding: 10px;
          border-radius: $radius;
          ul {
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            width: 100%;
            li {
              font-size: 22px;
              color: #fff;
            }
          }
        }
        .bb_priceInfoMenuDetail {
          width: 100%;
          padding: 6px;
          border-radius: 20px;
          ul {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding-top: 2.5%;
            // padding-right: 8%;
            .bb_leftTumMore1 {
              padding-left: 7.2%;
            }
            .bb_leftTumMore2 {
              padding-right: 8.8%;
            }
            .bb_middleTumMore {
              padding-right: 7.8%;
            }
            li {
              font-size: 22px;
            }
          }
        }
      }
    }
    .bb_luggagePlus {
      display: none;
    }
  }
}
.bb_infowrap {
  display: flex;
  text-align: center;
  justify-content: space-between;
  .bb_left {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
  .bb_leftTum1 {
    color: #333333;
    font-size: 25px;
  }
  .bb_leftbottum {
    color: #8f8f8f;
    font-size: 18px;
  }
}
.small {
  font-size: 18px;
}
// 무인보관함 위치안내
.bb_container3 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  .bb_inner {
    position: relative;
    max-width: 1100px;
    margin: 0 auto;
    // 타이틀
    .bb_title3 {
      padding-bottom: 30px;
      display: flex;
      justify-content: center;
      gap: 10px;
      line-height: 40px;
      // font-weight: bold;
      .bb_titleLine {
        width: 3px;
        height: 35px;
        background-color: $main-color;
      }
      .bb_title_txt3 h1 {
        font-family: $font-ownglyph;
        font-size: 40px;
      }
    }
  }
}

.bb_container4 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 60px;
  .bb_inner {
    position: relative;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    // 유의사항 왼쪽
    .bb_contain3Left {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .bb_yongdal {
        width: 100%;
        img {
          width: 100%;
        }
      }
      p {
        font-size: 20px;
        font-weight: bold;
      }
    }
    // 유의사항 오른쪽
    .bb_contain3Right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      .bb_noteTop {
        margin-top: 30px;

        .bb_notice1 {
          .indent {
            display: inline-block;
            padding-left: 1em; /* 또는 margin-left: 1em; */
          }
          li {
            line-height: 30px;
            font-size: 17px;
          }
        }
      }
      .bb_noteDown1 {
        width: 70%;
        margin-top: 1%;
        background-color: #fed4d4;
        border-radius: $radius;
        border: #f60000 1px solid;
        padding: 2% 2% 2% 2%;
        .bb_noticeSubtitle {
          font-size: 17px;
          font-weight: bold;
          padding-bottom: 5px;
        }

        .bb_notice2 {
          li {
            line-height: 22px;
            font-size: 15px;
            .bb_stron1 {
              display: inline;
              font-weight: bold;
              color: #ff0000;
            }
          }
        }
      }
      .bb_noticeButton button {
        background-color: #a8a8a8;
        border: none;
        border-radius: 50px;
        padding: 7px 12px 7px 12px;
        color: #fff;
        font-size: 15px;
        margin-top: 30px;
        cursor: pointer;
        font-weight: bold;
      }
      .bb_noteDown2 {
        width: 70%;
        margin-top: 1%;
        background-color: #fff3cd;
        border-radius: $radius;
        border: #ffc44f 1px solid;
        padding: 2% 2% 2% 2%;

        .bb_noticeSubtitle {
          font-size: 17px;
          font-weight: bold;
          padding-bottom: 10px;
          padding-left: 3%;
        }

        .bb_notice2 {
          li {
            line-height: 22px;
            font-size: 15px;
            .bb_Strong2 {
              font-weight: bold;
              display: inline-block;
              color: #f60000;
            }
          }
        }
      }
    }
  }
}
// 유의사항2
/* Step 4 전용 래퍼를 기존 .bb_inner 처럼 동작하게 만들기 */
::v-deep(.bb_container5 .bb_innerBottom) {
  max-width: 1100px !important;
  margin: 0 auto !important;
  width: 100% !important;
}

/* 그 안의 notice 컨텐츠도 100% 폭으로 */
::v-deep(.bb_container5 .bb_container4Bg .bb_inner .bb_notice) {
  box-sizing: border-box !important;
  width: 100% !important;
  padding: 20px 40px !important;
  color: #5a5a5a !important;
}
.bb_container5 {
  background-color: #fff;
  padding-bottom: 60px;
  max-width: 1100px !important;
  width: 100% !important;
  .bb_innerBottom {
    max-width: 1100px !important;
    width: 100% !important;
    margin: 0 auto;
    .bb_title3 {
      display: flex;
      justify-content: center;
      gap: 10px;
      line-height: 40px;
      padding-top: 60px;
      padding-bottom: 30px;
      h1 {
        font-family: $font-ownglyph;
      }
      .bb_titleLine {
        width: 3px;
        height: 35px;
        background-color: $main-color;
      }
      .bb_title_txt3 {
        font-size: 40px;
      }
    }
  }
  .bb_container4Bg {
    max-width: 1100px !important;
    width: 100% !important;
    background-color: #ffffff;
  }
  .bb_inner {
    background-color: rgba(65, 182, 232, 0.09);
    border-radius: $radius;
    width: 100% !important;
    max-width: 1100px !important;
  }
}
.bb_notice {
  box-sizing: border-box;
  width: 100% !important;
  max-width: 1100px !important;
  color: #5a5a5a;
  padding: 20px 40px;
  h3 {
    font-size: 22px;
    padding-bottom: 12px;
    font-weight: bold;
    color: #000;
  }
  p {
    padding-bottom: 20px;
    font-size: 17.5px;
  }
  li {
    padding-bottom: 15px;
    font-size: 17.5px;
  }
  ._bbTum {
    padding-top: 10px;
  }
}

// 태블릿 : 768px
@media screen and (max-width: 768px) {
  // .bb_inner {
  //   width: 80% !important;
  // }
  // 컨테이너1

  .bb_span {
    font-size: 15px !important;
  }
  .arrow {
    position: relative;
    padding: 50px 0 70px 0 !important;
    width: 5% !important;
    img {
      width: 100%;
      height: 100%;
    }
  }
  // 컨테이너2
  .bb_container2,
  .bb_container3,
  .bb_title2,
  .bb_notice,
  .bb_StoreTabs {
    margin: auto;
    width: 90%;
  }
  .bb_luggageImgNotice {
    margin: auto;
    width: 60%;
  }
  // 타이틀
  .bb_title_txt2 h1 {
    font-size: 25px !important;
    font-weight: bold;
  }
  .bb_title_txt2 p {
    font-size: 18px !important;
  }
  // 수화물 그림안내
  .bb_luggage {
    width: calc((100% - 2%) / 2) !important;
    padding: 5.5% !important;
    margin-bottom: 2%;
  }
  .bb_luggageTitleM {
    font-size: 20px !important;
  }
  .bb_luggageTitle {
    font-size: 12px !important;
  }
  .bb_luggagedetail {
    font-size: 9px !important;
  }
  .bb_luggagepriceInfo {
    margin: auto;
    width: 90% !important;
  }
  // 수화물 표안내
  .bb_priceInfoTime p {
    font-size: 15px !important;
  }
  .bb_priceInfoTime {
    width: 25% !important;
  }
  .bb_priceInfoDetail li {
    font-size: 13px !important;
  }
  .bb_priceInfoMenu li {
    font-size: 18px !important;
  }
  .bb_priceInfoMenuDetail ul {
    border-bottom: 1.5px solid #ccc;
  }
  // 안내사항 수달
  .bb_yongdal {
    display: none;
  }
  .bb_container4 {
    padding-left: 2% !important;
  }
  .bb_centerLine {
    flex-direction: column;
    text-align: left;
  }
  .bb_contain3Left p {
    align-self: flex-start;
    padding-bottom: 3%;
  }
  .bb_notice {
    padding-top: 30px !important;
  }
  .bb_noticeButton button {
    font-size: 12px !important;
  }
  .bb_noteDown1 {
    width: 100% !important;
  }
  .bb_noteDown2 {
    width: 100% !important;
  }
  // 맨아래 안내사항
  .bb_container5 {
    padding: 0 !important;
    margin-bottom: 30px;
  }
}

// 모바일 : 390px
@media screen and (max-width: 390px) {
  // 컨테이너1
  .bb_span {
    font-size: 15px !important;
  }
  .title_txt1 h1 {
    font-size: 25px !important;
  }
  .bb_title1 {
    padding-bottom: 30px !important;
  }

  .arrow {
    display: none;
  }
  .bb_plusMinar {
    display: none !important;
  }
  .bb_orderProcess.bb_plus {
    display: flex !important;
    justify-content: space-evenly !important;
    flex-wrap: wrap;
    gap: 10px; /* 간격 */
  }

  .bb_processIcon1 {
    width: 35%;
    justify-content: space-around !important;
    flex-wrap: wrap;
  }
  .bb_plus {
    display: block !important;
  }
  .bb_plus span {
    font-size: 15px !important;
  }
  // 컨테이너2
  // 타이틀
  .bb_title_txt2 h1 {
    font-size: 20px !important;
    font-weight: bold;
    line-height: 20px !important;
  }
  .bb_title_txt2 p {
    font-size: 14px !important;
  }
  // 수화물 그림안내
  .bb_luggageImgNotice {
    margin: auto;
    width: 90%;
  }

  .bb_luggage {
    width: 48% !important;
    padding: 3% !important;
    margin-bottom: 2%;
  }
  .bb_luggageTitleM {
    font-size: 18px !important;
  }
  .bb_luggageTitle p {
    font-size: 11px !important;
  }
  .bb_luggagedetail p {
    font-size: 8px !important;
  }

  // 수화물 표안내
  .bb_luggagePlusMinus {
    display: none !important;
  }
  .bb_luggagePlus {
    display: block !important;
  }
  .bb_priceInfoTime p {
    font-size: 12px !important;
  }
  .bb_priceInfoTime {
    width: 40% !important;
  }
  .bb_priceInfoDetail ul {
    font-size: 10px !important;
    padding-top: 3px !important;
    padding-bottom: 9px !important;
  }
  .bb_priceInfoDetail li {
    font-size: 12px !important;
  }
  .bb_priceInfoMenu ul {
    justify-content: space-around !important;
    padding-right: 6%;
  }
  .bb_priceInfoMenu li {
    font-size: 18px !important;
    text-align: center;
  }
  .bb_priceInfoMenuDetail ul {
    border: none;
    padding-left: 3%;
    padding-right: 3%;
  }
  .bb_priceInfoMenuDetail li {
    font-size: 18px !important;
  }
  // 분류별 색깔주기
  .bb_red {
    color: #000000;
  }
  .bb_blue {
    color: #000000;
  }
  .bb_green {
    color: #000000;
  }
  .bb_purple {
    color: #000000;
  }
  .bb_someMore {
    padding-left: 8px !important;
  }
  .bb_sizeControll {
    font-size: 20px !important;
  }

  .bb_container4 li {
    font-size: 14px !important;
  }

  .bb_container5 {
    margin-bottom: 30px;
  }
  .bb_container5 .bb_title3 h1 {
    padding-bottom: 5px !important;
  }
  .bb_container5 .bb_title3 {
    padding-bottom: 5px !important;
  }
  .bb_container5 h3 {
    font-size: 18px !important;
  }
  .bb_container5 li,
  p {
    font-size: 14px !important;
  }
  .bb_notice {
    padding-top: 20px !important;
  }
}
</style>
