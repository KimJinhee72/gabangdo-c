<script setup>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();
const inputValue = ref("");
const password = ref("");
const viewPW = ref(false)
const keepLoggedIn = ref(true);   // 로그인 상태 유지 체크
const telecomInput = ref(null); //통신사늘보이는 아이콘 클릭해도 인풋 포커싱위해
const addressInput = ref(null); //주소늘보이는 아이콘 클릭해도 인풋 포커싱위해
const showtelLi = ref(false); //통신사리스트
const choiceGender = ref(''); //남여내/외국인
const choiceNational = ref(''); //남여내/외국인

const genders = [
  { label: '남', value: 'male' },
  { label: '여', value: 'female' }
]
const nationalers = [
  { label: '내국인', value: 'local' },
  { label: '외국인', value: 'foreigner' }
]

const formData = ref({
  id: "",
  name: "",
  email: "",
  password: "",
  birth: "",
  phone: "",
  telecom: "",
  address: "",
  detail: "",
  role: "customer",
  agreed: false,
});
// 인풋의 x버튼으로 내용지우기
const clearInput = (value) => {
  formData.value[value] = "";
};
function focusInput(target) {
  // 통신사 인풋 안 버튼 눌러도 인풋 포커스되게 조건
  if (target === "telecom") telecomInput.value?.focus();
  // 주소 인풋 안 버튼 눌러도 인풋 포커스되게 조건
  if (target === "address") {
    // input에 포커스 주기
    addressInput.value?.focus();
    // 주소 검색 실행
    searchAddress();
  }
}
// 통신사 배열
const choIce = reactive({ telecom: "" });
const leftCarriers = ["KT", "SKT", "LG U+"];
const rightCarriers = ["KT 알뜰폰", "SKT 알뜰폰", "LG U+ 알뜰폰"];

// 선택 함수
const selectCarrier = (carrier) => {
  choIce.telecom = carrier;
  showtelLi.value = false;
};

// 카카오 주소 찾기 버튼
const mapbtnClick = () => {
  new window.daum.Postcode({
    oncomplete: (data) => {
      // 도로명 주소 OR 지번 주소 가져오기
      let addr = data.roadAddress ? data.roadAddress : data.jibunAddress;
      formData.value.address = addr;

      // 주소 입력 후 상세주소 input에 자동 focus
      const detailInput = document.getElementById("detailInput");
      if (detailInput) detailInput.focus();
    }
  }).open();
};


// 실제 회원가입 처리
const signUp = () => {
  errorMessage.value = ''; // **함수 시작 시 에러 메시지 초기화**

  // 필수 항목 유효성 검사
  const requiredFields = ['id', 'name', 'password', 'birth', 'phone', 'telecom', 'address'];
  for (const field of requiredFields) {
    if (!formData.value[field]) {
      errorMessage.value = `'${field}'는 필수 입력 항목입니다.`;
      return;
    }
  }

  // 휴대폰 번호 인증 검사
  if (!formData.value.phone || verificationCode.value !== serverVerificationCode.value) {
    errorMessage.value = "휴대폰 번호를 인증해주세요.";
    return;
  }

  // ... (기존 회원가입 로직)
  // 모든 검사를 통과했을 때의 로직
  // 예: 서버에 회원가입 데이터 전송
  console.log('회원가입 정보:', formData.value);
  auth
    .signup({ ...formData.value })
    .then(() => router.push("/login"))
    .catch((err) => alert(err.message));
}
</script>

<template>
  <div>
    <div class="signup-container">
      <div class="logo">
        <a href="/" class="logo nlog-click"><img src="/images/txt.png" alt="로고이미지"></a>
      </div>

      <p class="subtitle">회원정보를 입력해주세요</p>
      <form @submit.prevent="Signup">
        <!-- 회원가입1/2영역 -->
        <div class="verification-wrap">
          <!-- 회원가입1영역 -->
          <div class="signup1area">
            <!-- 실명으로 인증된아이디로 가입 -->
            <div class="keep_check input_wrap" :class="{ check: keepLoggedIn }" id="keep" role="checkbox"
              :aria-checked="keepLoggedIn.toString()" @click.stop="keepLoggedIn = !keepLoggedIn"
              @keydown.enter.space.prevent="keepLoggedIn = !keepLoggedIn">
              <input type="checkbox" id="nvlong" name="nvlong" tabindex="-1" v-model="keepLoggedIn" class="input_keep"
                value="off" />
              <label for="join_toggle" class="keep_text">실명 인증된 아이디로 가입</label>
            </div>
            <!-- 아이디 입력란 -->
            <div>
              <input type="text" placeholder="아이디 만들기" v-model="formData.id" class="bb_needMore idName_icon" />
              <!-- X 버튼은 입력값이 있을 때만 보이게 -->
              <button v-if="formData.id" type="button" class="btn_delete" id="id_clear" @click="clearInput('id')">
                <span class="icon_delete"><img src="/images/geen/circle-letter-x 1.png" alt="x닫기"></span>
              </button>
            </div>
            <!-- 비밀번호 입력란 -->
            <div>
              <input :type="viewPW ? 'text' : 'password'" placeholder="비밀번호 만들기" v-model="formData.password"
                class="pw_icon" />
              <!-- 입력값이 있을 때만 비밀번호 보이기 기본값 숨기기(눈아이콘)-->
              <span v-if="formData.password" class="icon_delete pwcloseneye" @click="viewPW = !viewPW"><img
                  :src="!viewPW ? '/images/geen/2/eye-off.svg' : '/images/geen/2/eye.svg'"
                  :alt="!viewPW ? '비밀번호 숨김' : '비밀번호 보기'" /></span>
              <!-- 입력값이 있을 때만 X 버튼 보이게 -->
              <button v-if="formData.password" type="button" class="btn_delete" id="id_clear"
                @click="clearInput('password')">
                <span class=" icon_delete pwdelbtn"><img src="/images/geen/circle-letter-x 1.png" alt="x닫기">
                </span>
              </button>
            </div>
            <!-- 이메일 입력란(선택) -->
            <div>
              <input type="email" placeholder="[선택] 이메일주소 입력 (비밀번호 찾기 등 본인 확인용) " v-model="formData.email"
                class="email_icon" />
              <!-- X 버튼은 입력값이 있을 때만 보이게 -->
              <button v-if="formData.email" type="button" class="btn_delete" id="id_clear" @click="clearInput('email')">
                <span class="icon_delete emaildelbtn"><img src="/images/geen/circle-letter-x 1.png" alt="">
                </span>
              </button>
            </div>
          </div>
          <!-- 회원가입2영역 -->
          <div class="signup2area">
            <!-- 이름 입력란 -->
            <div>
              <input type="name" placeholder="이름" v-model="formData.name" class="bb_needMore idName_icon" />
              <!-- X 버튼은 입력값이 있을 때만 보이게 -->
              <button v-if="formData.name" type="button" class="btn_delete" id="id_clear" @click="clearInput('name')">
                <span class="icon_delete namedelbtn"><img src="/images/geen/circle-letter-x 1.png" alt="">
                </span>
              </button>
            </div>
            <!-- 생년월일 입력란 -->
            <div>
              <input type="text" placeholder="생년월일 8자리" v-model="formData.birth" class="birth_icon" />
              <!-- X 버튼은 입력값이 있을 때만 보이게 -->
              <button v-if="formData.birth" type="button" class="btn_delete" id="id_clear" @click="clearInput('phone')">
                <span class="icon_delete birthdelbtn"><img src="/images/geen/circle-letter-x 1.png" alt="">
                </span>
              </button>
              <!-- <button type="button" class="btn-small" @click="sendPhoneVerification">
            인증하기
          </button> -->
            </div>
            <!-- 통신사 선택란 -->
            <div v-show="keepLoggedIn" class="telecom" @click="showtelLi = !showtelLi">
              <input placeholder="통신사" v-model="choIce.telecom" class="mobileco_icon" ref="telecomInput" readonly />
              <!-- X 버튼은 입력값이 있을 때만 보이게 -->
              <button type="button" class="btn_delete telecomColistarr" id="id_clear" @click="focusInput('telecom')">
                <span class="icon_delete "><img src="/images/geen/2/chevron-down 1.png" alt="통신사리스트보기화살표">
                </span>
              </button>
              <!-- 통신사 리스트 보여주기 -->
              <div v-if="showtelLi" class="telecomList">
                <div class="leftSapn">
                  <!-- @click.stop stop을 붙여서 이벤트 버블링 방지 -->
                  <h6 v-for="carrier in leftCarriers" :key="carrier" @click.stop="selectCarrier(carrier)">
                    {{ carrier }}
                  </h6>
                </div>
                <div class="rightSpan">
                  <h6 v-for="carrier in rightCarriers" :key="carrier" @click.stop="selectCarrier(carrier)">
                    {{ carrier }}
                  </h6>
                </div>
              </div>
              <!-- <button type="button" class="btn-small" @click="sendPhoneVerification">
            인증하기
          </button> -->
            </div>
            <!-- 남/여 내/외국인 -->
            <div class="maleChk">
              <div class="maleChkleft">
                <div v-for="gen in genders" :key="gen" :class="{ check: choiceGender === gen.value }"
                  @click="choiceGender = gen.value">
                  {{ gen.label }}
                </div>
              </div>
              <div class="maleChkleft">
                <div v-for="nation in nationalers" :key="nation" :class="{ check: choiceNational === nation.value }"
                  @click="choiceNational = nation.value">
                  {{ nation.label }}
                </div>
              </div>
            </div>
            <div v-show="!keepLoggedIn" class="idcardnotice_text item_style" id="legalInfoMsg" style="">
              신분증 상의 이름, 생년월일, 성별과 일치하지 않으면 실명인증이 불가합니다.
            </div>
          </div>
        </div>
        <!-- 회원가입3영역 -->
        <div class="signup3area">
          <!-- 휴대폰 번호 입력란 -->
          <div>
            <input type="phone" placeholder="휴대폰번호" v-model="formData.phone" class="phone_icon" />
            <!-- X 버튼은 입력값이 있을 때만 보이게 -->
            <button v-if="formData.phone" type="button" class="btn_delete" id="id_clear" @click="clearInput('phone')">
              <span class="icon_delete phonedelbtn"><img src="/images/geen/circle-letter-x 1.png" alt="">
              </span>
            </button>
          </div>
        </div>
        <!-- 회원가입4영역 선택사항(네이버쇼핑주소미리등록) -->
        <div class="signup4area">
          <div class="address" @click="mapbtnClick">
            <input type="text" placeholder="[선택] 주소 입력 (자택배송시 및 경품배송 필요용)" v-model="formData.address"
              class="address_icon" ref="addressInput" readonly />
            <button type="button" class="btn_delete addressFind" @click="focusInput('address')">
              <span class="icon_delete addressFind"><img src="/images/geen/2/map-pin-search 1.svg" alt="주소검색">
              </span>
            </button>
          </div>
          <!-- 상세주소 -->
          <input type="text" id="detailInput" placeholder="상세주소 입력" v-model="formData.detail" class="addDetatil_icon" />
        </div>
        <div class="agree">
          <input type="checkbox" id="agree" v-model="formData.agreed" />
          <label for="agree">
            이용약관 및 <span>개인정보처리방침</span>에 동의합니다.
          </label>
        </div>
        <!-- 인증요청 -->
        <div class="signup_wrap">
          <div class="signup_header">
            <p class="signup_guide">
              <span style="color:red">*</span>이메일 제외 모두 필수항목입니다.
            </p>
            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
            <button type="submit" class="btn-main">인증요청</button>
          </div>
        </div>
      </form>

      <div class="social-login">
        <div class="bb_sns-login">
          <div class="bb_grayline"></div>
          <p>간편 회원가입</p>
          <div class="bb_grayline"></div>
        </div>
        <div class="icons">
          <img src="/images/yr/loginpage/loginKT.png" alt="카카오톡" />
          <img src="/images/yr/loginpage/loginN.png" alt="네이버" />
          <img src="/images/yr/loginpage/loginG.png" alt="구글" />
        </div>
        <div class="bb_alreadyLogin">
          <p class="login-link">이미 회원이신가요?</p>
          <router-link to="/login"> 로그인</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "/src/assets/Main.scss" as *;
@use "/src/assets/Variables.scss" as *;

body {
  font-family: "Arial", sans-serif;
  background: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
}

// 포커싱되면 보더를 바꾸게 하려면 기본 input설정후 포커스를 해야 먹힘
input {
  width: 100%;
  height: 50px;
  padding: 10px;
  border: 1px solid #ccc;
  border-bottom: 0;
  border-radius: 5px 5px 0 0;
  font-size: 14px;
  font-weight: normal;
  color: #000;
  outline: none; // 기본 포커스 테두리 제거
  transition: box-shadow 0.2s;

  /* 포커스되면 아래만 라운딩, 색 음영으로 변경(박스색변경은 꿀렁거림이 있어서) */
  &:focus {
    box-shadow: 0 2px 0 0 #0000ff; // 포커스 시 밑줄 강조
  }
}

.signup-container {
  margin: 0 auto;
  width: 500px;
  background: #fff;
  padding-top: 0;
  text-align: center;

  // border: 1px solid #e1e3e5;
  //   border-radius: 12px;
  //   background-color: #fff;
  .logo {
    width: 100px;
    height: 50px;
    margin: 0 !important;
    padding: 0 !important;

    a {
      width: 100px;
      height: 100px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .subtitle {
    font-size: 14px;
    color: $sub-color;
    margin-bottom: 20px;
    text-align: left;
  }

  form {
    display: flex;
    flex-direction: column;


    // user아이콘
    .idName_icon {
      background: url("/images/geen/2/user (1) 1.png") no-repeat 8px center;
      padding-left: 40px !important;
      padding-right: 40px !important;
      /* 아이콘 때문에 왼쪽 여백 추가 */
      background-size: 20px, 15px;
      font-weight: normal;
    }

    .icon_delete {
      border: none;
      color: #999;
      width: 15px;
      height: 15px;
      cursor: pointer;
      opacity: 0.8;
      z-index: 7;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .signup1area,
    .signup2area,
    .signup3area,
    .signup4area {
      div {
        position: relative;

        button {
          position: absolute;
          top: 16px;
          right: 20px;
          width: 12px;
          height: 12px;
        }
      }

    }

    .verification-wrap {
      /* 통신사 선택란이 보일 때의 높이를 계산하여 설정 */
      min-height: 355px;
      /* 이 값을 실제 높이에 맞게 조정해야 합니다. */
      transition: min-height 0.3s ease;

      /* 부드러운 전환 효과 추가 */
      .signup1area {
        width: 100%;
        margin-bottom: 30px;

        .keep_check {
          display: flex;
          /* 아이콘 + 텍스트 나란히 */
          justify-content: end;
          align-items: center;
          /* 세로 가운데 정렬 */
          cursor: pointer;
          margin-right: 10px;
          margin-bottom: 5px;
          font-size: 14px;
          outline: none;

          /* 포커스 시 꿀렁거림 제거 */
          &:focus {
            outline: none;
            /* 키보드 포커스 시 테두리 제거 */
          }

          input {
            width: 15px;
          }

          &::before {
            content: '';
            position: relative;
            top: 0;
            left: 0;
            background-image: url(https://ssl.pstatic.net/static/nid/login/sprite/m_sp_01_login_7b3d4fc3.png);
            background-position: -292px -236px;
            background-size: 336px 330px;
            background-repeat: no-repeat;
            width: 20px;
            height: 20px;
            vertical-align: middle;
            background-color: #fff;
          }

          &.check::before {
            content: '';
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url(https://ssl.pstatic.net/static/nid/login/sprite/m_sp_01_login_7b3d4fc3.png) -286px -292px / 336px 330px no-repeat;
            vertical-align: middle;
            margin-right: 4px;
            filter: invert(12%) sepia(100%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(120%);

          }

          & .input_keep {
            /* 네이티브 체크박스 숨기기 */
            display: none;
          }

          & .keep_text {
            display: inline-block;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            color: blue;
            cursor: default;
            pointer-events: none;
            /* 클릭/커서 이벤트 무시 */
          }

          &.check .keep_text {
            color: #9c9c9c;
            pointer-events: none;
            /* 클릭/커서 이벤트 무시 */

          }
        }

        .pw_icon {
          border-radius: 0 !important;
          background: url("/images/geen/2/lock 1.png") no-repeat 8px center;
          padding-left: 40px !important;
          /* 아이콘 때문에 왼쪽 여백 추가 */
          background-size: 20px;
        }

        .pwcloseneye {
          position: absolute;
          top: 13px;
          left: 85%;
          width: 20px;
          height: 20px;

          img {
            width: 100%;
            height: 100%;
            opacity: 0.8;
            mix-blend-mode: multiply;
          }
        }

        .pwdelbtn {
          top: 180px;
          left: 65%;
        }

        .email_icon {
          /* 아이콘 때문에 왼쪽 여백 추가 */
          padding-left: 40px !important;
          border: 1px solid #ccc;
          border-radius: 0 0 5px 5px !important;
          background: url("/images/geen/2/mail 1.png") no-repeat 8px center;
          background-size: 20px;
          background-size: 17px;
          background-position: 10px;
        }

        .emaildelbtn {
          top: 225px;
          left: 65%;
        }
      }

      .signup2area {
        .namedelbtn {
          top: 296px;
          left: 65%;
        }

        .birth_icon {
          border-radius: 0 !important;
          background: url("/images/geen/2/cake.svg") no-repeat 8px center;
          padding-left: 40px !important;
          padding-right: 40px !important;
          /* 아이콘 때문에 왼쪽 여백 추가 */
          background-size: 20px, 15px;
          font-weight: normal;
        }

        .phone_icon {
          border-radius: 0 !important;
          background: url("/images/geen/2/device-mobile.svg") no-repeat 8px center;
          padding-left: 40px !important;
          padding-right: 40px !important;
          /* 아이콘 때문에 왼쪽 여백 추가 */
          background-size: 20px, 15px;
          font-weight: normal;
        }

        .phonedelbtn {
          top: 342px;
          left: 65%;
        }

        .mobileco_icon {
          border-radius: 0 !important;
          background: url("/images/geen/2/building-broadcast-tower.png") no-repeat 8px center;
          /* 아이콘 때문에 여백 추가 */
          padding-left: 40px !important;
          padding-right: 40px !important;
          background-size: 20px, 15px;
          font-weight: normal;
          font-size: 14px;
          color: blue;
          /* 커서 숨김 */
          caret-color: transparent;

          &:focus {
            box-shadow: 0 2px 0 0 #0000ff; // 포커스 시 밑줄 강조
          }

        }

        .telecomColistarr {
          top: 11px;
          right: 17px;
          width: 18px;
          height: 20px;
        }

        .telecomList {
          display: flex;
          position: absolute;
          top: 70%;
          left: 7%;
          font-size: 14px;
          font-weight: 300;
          color: #000;
          background-color: #Fff;
          border-radius: 8px;
          border: 2px solid #f8f7f7;
          z-index: 1;
          // box-shadow: 1px 0.8px 0.8px 0.8px #d1d1d1;


          h6 {
            width: 110px;
            padding: 6px 15px;
            text-align: left;
            cursor: pointer;
            // border: 0.1px solid #f1f1f1;
          }

          h6:first-child {
            border-radius: 8px 0 0 0;
          }

          h6:nth-child(3) {
            border-radius: 0 0 0 8px;
          }

          .centerh6 {
            border-top: 0;
            border-bottom: 0;
          }

          .leftSapn {
            border-right: 0.5px solid #f1f1f1;

            h6 {
              width: 70px;
              border-right: 0;
            }
          }

          .rightSpan {
            h6:nth-child(1) {
              border-radius: 0 8px 0 0;
            }

            h6:nth-child(3) {
              border-radius: 0 0 8px 0 !important;
            }

          }
        }

        .maleChk {
          display: flex;
          align-items: center;
          gap: 3px;
          width: 500px;
          height: 45px;
          padding: 1px 5px;
          border: 1px solid #ccc;
          border-radius: 0 0 5px 5px;
          background: none;

          div {
            display: flex;
            justify-content: center;
            flex: 1;
            padding: 6px 0;
            color: #868686;
            font-size: 13px;
            border-radius: 5px;
            cursor: pointer;

            &.check {
              color: blue;
            }

            div {
              display: flex;
              justify-content: center;
              border: 1px solid #ccc;

            }

            div:nth-child(1) {
              border-radius: 5px 0 0 5px;
              border-right: 0;

            }

            div:nth-child(2) {
              border-radius: 0 5px 5px 0;
            }
          }
        }

        .idcardnotice_text {
          padding: 5px 10px 0 10px;
          font-size: 12px;
          font-weight: normal;
          text-align: left;
          color: blue;
        }
      }
    }

    .signup3area {
      width: 100%;
      margin-top: 10px;
    }

    .signup4area {
      width: 100%;
      margin-top: 30px;

      .address {

        // address_icon
        .address_icon {
          height: 45px;
          cursor: pointer;
          border-radius: 5px 5px 0 0;
          background: url("/images/geen/2/map-2 1.svg") no-repeat 8px center;
          padding-left: 40px !important;
          padding-right: 40px !important;
          /* 아이콘 때문에 왼쪽 여백 추가 */
          background-size: 20px, 15px;
          font-size: 14px;
          font-weight: normal;
          color: #868686;
          caret-color: transparent;

          &:focus {
            box-shadow: 0 2px 0 0 #0000ff; // 포커스 시 밑줄 강조
          }
        }

        .addressFind {
          top: 13px;
          right: 15px;
          width: 20px !important;
          height: 20px !important;

          img {
            width: 18px;
            height: 18px;
          }
        }
      }

      .addDetatil_icon {
        height: 44px;
        border-radius: 0 0 5px 5px !important;
        // background: url("/images/geen/2/map-2 1.svg") no-repeat 8px center;
        padding-left: 40px !important;
        padding-right: 40px !important;
        /* 아이콘 때문에 왼쪽 여백 추가 */
        background-size: 20px, 15px;
        font-size: 14px;
        font-weight: normal;
        // color: #868686;
        border-bottom: 1px solid #ccc;

      }
    }

    .agree {
      font-size: 13px;
      margin: 12px 0;
      text-align: left;

      span {
        color: $main-color;
      }
    }

    .btn-main {
      padding: 5px 10px !important;
      background: $main-color;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      margin-top: 10px;
      cursor: pointer;
    }
  }

  .social-login {
    margin-top: 25px;

    .bb_sns-login {
      display: flex;
      align-items: center;
      gap: 10px; // 선과 텍스트 사이 간격
      margin: 8% 0;

      .bb_grayline {
        flex: 1;
        height: 1px;
        background-color: #ccc; // 연한 회색
      }
    }

    p {
      font-size: 14px;
      color: #333;
    }

    .bb_grayline {
      flex: 1;
      height: 1px;
      background-color: #ccc; // 연한 회색
    }

    .icons {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin-top: 20px;
      margin-bottom: 20px;

      img {
        width: 40px;
        height: 40px;
        cursor: pointer;
      }
    }

    .login-link {
      font-size: 13px;

      a {
        color: $main-color;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }

  .bb_alreadyLogin {
    display: flex;
    justify-content: center;

    p {
      padding-right: 5px;
    }
  }
}
</style>
