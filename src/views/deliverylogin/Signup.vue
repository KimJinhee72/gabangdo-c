<script setup>
import { computed, reactive, ref, watch } from "vue";
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
const requireAgree = ref(false); //필수 약관
const errorMessage = ref("");  //에러메시지
const verificationCode = ref("");        // 사용자가 입력한 인증번호
const serverVerificationCode = ref("");  // 서버에서 받은 인증번호
const fieldErrmsg = ref({}); // 각 필드 에러
const submitted = ref(false); //제출버튼
const submitForm = () => {
  submitted.value = true;
  // 추가로 전체 필드 검증 가능
};

const genders = [
  { label: '남', value: 'male' },
  { label: '여', value: 'female' }
]
const nationalers = [
  { label: '내국인', value: 'local' },
  { label: '외국인', value: 'foreigner' }
]
const conditionAgree = [
  { label: '개인정보 이용', value: 'individual' },
  { label: '통신사 이용약관', value: 'telecom' },
  { label: '인증사 이용약관 ', value: 'agreeFirm' },
  { label: '고유식별정보 처리', value: 'Unique' },
  { label: '네이버 개인정보수집', value: 'naver' }
]
// 각 아이템 체크 상태를 배열로 저장
const checkedList = ref(Array(conditionAgree.length).fill(false));

// ✅ checkedList 값이 변할 때마다 requireAgree 자동 업데이트
watch(checkedList, (newVal) => {
  requireAgree.value = newVal.every(Boolean); // 5개 다 true면 true
}, { deep: true });

// ✅ 부모 클릭 시 전체 선택 토글
const toggleAll = () => {
  const newVal = !requireAgree.value;
  checkedList.value = checkedList.value.map(() => newVal);
};

const formData = reactive({
  id: "",
  name: "",
  email: "",
  password: "",
  birth: "",
  phone: "",
  telecom: "",
  world: "",
  address: "",
  detail: "",
  role: "customer",
  agree: "",
  agreed: false,
});
const fieldLabels = {
  id: "아이디",
  name: "이름",
  password: "비밀번호",
  birth: "생년월일",
  phone: "휴대폰 번호",
  telecom: "통신사",
  address: "주소",
  email: "이메일"
};
const fieldErrorActive = reactive({
  id: true,
  password: false,
  name: false,
  birth: false,
  telecom: false,
  world: false,
  phone: false,
  agree: false,
  address: false,
  detail: false,
});
const fields = [
  { key: "id", message: "아이디는 대/소문자,숫자 8자이상 입력해주세요" },
  { key: "password", message: "비밀번호는 소문자,숫자,특수기호 포함 8자 이상 입력해주세요" },
  { key: "email", message: "@를 포함해야 합니다." },
  { key: "name", message: "이름을 입력해주세요" },
  { key: "birth", message: "생년월일을 입력해주세요" },
  { key: "telecom", message: "통신사를 선택해주세요" },
  { key: "world", message: "국가번호를 선택해주세요" },
  { key: "phone", message: "휴대폰 번호를 입력해주세요" },
  { key: "agree", message: "약관에 동의해주세요" },
  { key: "address", message: "주소를 입력해주세요" },
  { key: "detail", message: "상세 주소를 입력해주세요" }
];
// index 기준으로 메시지 표시 여부 계산
const showError = (index) => {
  // index까지 하나라도 빈 값이 있으면 true
  for (let i = 0; i <= index; i++) {
    if (!formData[fields[i].key]) return true;
  }
  return false;
};

const requiredFields = ["id", "name", "password", "birth", "telecom", "phone", "agree"];
// 단일 필드 검증
const validateField = (field) => {
  const value = formData.value[field.key];

  // email, address, detail 은 입력 안 하면 에러 없음
  if (["email", "address", "detail"].includes(field.key)) {
    if (!value) return "";
  } else {
    if (!value) return field.message;
  }

  // 값이 있을 때만 세부 검증
  switch (field.key) {
    case "id":
      return /^[A-Za-z0-9]{8,}$/.test(value) ? "" : field.message;
    case "password":
      return /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(value)
        ? ""
        : field.message;
    case "email":
      return /@/.test(value) ? "" : field.message;
    case "phone":
      return /^\d{10,11}$/.test(value) ? "" : field.message;
    case "agree":
      return value ? "" : field.message;
    default:
      return "";
  }
};

// 전체 필드 검증 (submit 시 호출)
const validateAll = () => {
  // 에러 상태 초기화
  Object.keys(fieldErrorActive.value).forEach((key) => {
    fieldErrorActive.value[key] = false;
  });

  requiredFields.forEach((key) => {
    const field = fields.find((f) => f.key === key);
    if (!formData.value[key] || validateField(field)) {
      fieldErrorActive.value[key] = true;
    }
  });
};


// 인풋의 x버튼으로 내용지우기
const clearInput = (value) => {
  // reactive 객체라면 .value가 필요 없어
  formData[value] = "";
  fieldErrorActive.value[key] = false;
};
function focusInput(target) {
  // 통신사 인풋 안 버튼 눌러도 인풋 포커스되게 조건
  if (target === "telecom") telecomInput.value?.focus();
  // 주소 인풋 안 버튼 눌러도 인풋 포커스되게 조건
  if (target === "address")
    // input에 포커스 주기
    addressInput.value?.focus();
  if (target === "world") {
    // input에 포커스 주기
    worldInput.value?.focus();
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
  errorMessage.value = "";

  for (const field of requiredFields) {
    if (!formData.value[field]) {
      errorMessage.value = `이메일과 주소를 제외하고 모두 필수 입력 항목입니다.`;
      // span 보여주기 신호 ON
      fieldErrorActive.value[field] = true;
      return;
    }
  }

  if (!formData.value.phone || verificationCode.value !== serverVerificationCode.value) {
    errorMessage.value = "휴대폰 번호를 인증해주세요.";
    return;
  }

  // 서버에 회원가입 요청
  auth.signup({ ...formData.value })
    .then(() => router.push("/login"))
    .catch((err) => alert(err.message));
};
const onSubmit = () => {
  // 필드 검증
  const valid = validateFields();
  if (!valid) return; // 오류 있으면 제출 중단

  // 검증 통과 시 실제 회원가입 로직 실행
  signUp();
};
</script>

<template>
  <div>
    <div class="signup-container">
      <div class="logo">
        <a href="/" class="logo nlog-click"><img src="/images/txt.png" alt="로고이미지"></a>
      </div>

      <p class="subtitle">회원정보를 입력해주세요</p>
      <form @submit.prevent="onSubmit">
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
              <label for="nvlong" class="keep_text">실명 인증된 아이디로 가입</label>
            </div>
            <!-- 아이디 입력란 -->
            <div>
              <input type="text" placeholder="아이디 만들기" v-model="formData.id" class="bb_needMore idName_icon"
                @input="validateField('id')" />
              <!-- X 버튼은 입력값이 있을 때만 보이게 -->
              <button v-if="formData.id" type="button" class="btn_delete" id="id_clear" @click="clearInput('id')">
                <span class="icon_delete"><img src="/images/geen/circle-letter-x 1.png" alt="x닫기"></span>
              </button>
            </div>
            <!-- 비밀번호 입력란 -->
            <div>
              <input :type="viewPW ? 'text' : 'password'" placeholder="비밀번호 만들기" v-model="formData.password"
                class="pw_icon" @input="validateField('password')" />
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
              <input placeholder="[선택] 이메일주소 입력 (비밀번호 찾기 등 본인 확인용) " v-model="formData.email"
                @input="validateField('email')" class="email_icon" />
              <!-- X 버튼은 입력값이 있을 때만 보이게 -->
              <button v-if="formData.email" type="button" class="btn_delete" id="id_clear" @click="clearInput('email')">
                <span class="icon_delete emaildelbtn"><img src="/images/geen/circle-letter-x 1.png" alt="">
                </span>
              </button>
            </div>
            <!-- 에러메시지영역 1-->
            <div class="errArea">
              <div v-for="(field, index) in fields.slice(0, 3)" :key="index" class="errAreaDiv">
                <span class="error-label" v-if="submitted && !formData[field.key]">
                  {{ field.message }}
                </span>
              </div>
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
              <!-- 아래 버튼  -->
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
          <!-- 국가번호 토글 -->
          <div v-show="!keepLoggedIn">
            <input placeholder="대한민국 +82" v-model="formData.world" class="world_icon" readonly />
            <!-- 아래 버튼  -->
            <button type="button" class="btn_delete worldToggle" id="id_clear" ref="worldInput"
              @click="focusInput('world')">
              <span class="icon_delete "><img src="/images/geen/2/chevron-down 1.png" alt="국가번호화살표">
              </span>
            </button>
          </div>
          <!-- 휴대폰 번호 입력란 -->
          <div class="phoneDiv" :class="{ check: keepLoggedIn }">
            <input type="phone" placeholder="휴대전화번호" v-model="formData.phone" class="phone_icon" />
            <!-- X 버튼은 입력값이 있을 때만 보이게 -->
            <button v-if="formData.phone" type="button" class="btn_delete" id="id_clear" @click="clearInput('phone')">
              <span class="icon_delete phonedelbtn"><img src="/images/geen/circle-letter-x 1.png" alt="">
              </span>
            </button>
          </div>

          <!-- 필수 약관 -->
          <div class="agree" :class="{ check: requireAgree }" tabindex="0" role="checkbox"
            :aria-checked="requireAgree.toString()" @click.stop="toggleAll" @keydown.enter.space.prevent="toggleAll">
            <!-- 실제 체크박스는 숨김 -->
            <input v-model="requireAgree" class="hidden" />

            <input placeholder="[필수] 인증 약관 전체 동의" v-model="formData.agree" class="agree_icon" alt="체크" />

            <!-- 아래 버튼 -->
            <button type="button" class="btn_delete agreeToggle" id="id_clear" ref="agreeInput">
              <span class="icon_delete">
                <img src="/images/geen/2/chevron-down 1.png" alt="필수약관동의화살표" />
              </span>
            </button>
          </div>

          <!-- 약관리스트 -->
          <div v-show="checkedList.some(v => v)" class="agreelistDiv">
            <div class="agreelist">
              <!-- 왼쪽 (3개) -->
              <div class="col colleft">
                <div v-for="(item, index) in conditionAgree.slice(0, 3)" :key="'left-' + index" class="agree-item"
                  @click.stop="checkedList[index] = !checkedList[index]">
                  <img v-if="checkedList[index]" src="/images/geen/1/check 2.svg" />
                  <img v-else src="/images/geen/1/check 1.svg" />
                  <!-- <img :src="checkedList[index] ? '/images/geen/1/check 2.svg' : '/images/geen/1/check 1.svg'" /> -->
                  <span>{{ item.label }}</span>
                  <img src="/images/geen/1/chevron-down 1.svg" />
                </div>
              </div>

              <!-- 오른쪽 (나머지) -->
              <div class="col colright">
                <div v-for="(item, index) in conditionAgree.slice(3)" :key="'right-' + index" class="agree-item"
                  @click.stop="checkedList[index + 3] = !checkedList[index + 3]">
                  <img v-if="checkedList[index + 3]" src="/images/geen/1/check 2.svg" />
                  <img v-else src="/images/geen/1/check 1.svg" />
                  <span>{{ item.label }}</span>
                  <img src="/images/geen/1/chevron-down 1.svg" />
                </div>
              </div>
            </div>
          </div>

        </div>
        <!-- 에러메시지영역 2-->
        <div class="errArea">
          <div v-for="(field, index) in fields.slice(3, 9)" :key="index" class="errAreaDiv">
            <span class="error-label" v-if="submitted && !formData[field.key]">
              {{ field.message }}
            </span>
          </div>
        </div>

        <!-- 회원가입4영역 선택사항(네이버쇼핑주소미리등록) -->
        <div class="signup4area">
          <!-- 카카오 주소검색 -->
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
        <!-- 에러메시지영역 3-->
        <div class="errArea">
          <div v-for="(field, index) in fields.slice(9, 11)" :key="index" class="errAreaDiv">
            <span class="error-label" v-if="submitted && !formData[field.key]">
              {{ field.message }}
            </span>
          </div>
        </div>
        <div class="social-login">
          <div class="bb_sns-login">
            <div class="bb_imgline">
              <div class="bb_grayline"></div>
              <div class="subtitle">간편 회원가입</div>
              <div class="bb_grayline"></div>
            </div>
            <div class="icons">
              <a
                href="https://accounts.kakao.com/weblogin/create_account/?continue=https%3A%2F%2Fwww.daum.net&lang=ko&showHeader=false#intro"><img
                  src="/images/yr/loginpage/loginKT.png" alt="카카오톡" /></a>
              <a href="https://nid.naver.com/user2/join/agree?lang=ko_KR&realname=N"><img
                  src="/images/yr/loginpage/loginN.png" alt="네이버" /></a>
              <a
                href="https://accounts.google.com/lifecycle/steps/signup/name?dsh=S-486453042:1756378813911425&flowEntry=SignUp&flowName=GlifWebSignIn&ifkv=AdBytiOfaS95vOt-vmo3Pv3q2A9SadQS4wIjXe4SSZg8Od4H1wFvsOfqzbvCuHhmQ_A2O97fRUi8iA&TL=ALgCv6ysz3ptvgRh_UTeRooxArNvKqb7skgg-W--EYDeb8zRtROMZjsF15CuOGHj&continue=https://accounts.google.com/ManageAccount?nc%3D1"><img
                  src="/images/yr/loginpage/loginG.png" alt="구글" /></a>
            </div>
          </div>
        </div>

        <div class="bb_alreadyLogin">
          <p class="login-link subtitle">이미 회원이신가요?</p>
          <router-link to="/login" style="color: blue; cursor: pointer; font-weight: bold;"> 로그인으로</router-link>
        </div>
        <!-- 인증요청 -->
        <div class="signup_wrap">
          <div v-if="errorMessage" class="error-message">
            <a><img src="/images/geen/1/point 1.svg" /></a>
            {{ errorMessage }}
          </div>
          <button type="submit" class="btn-main" @click="() => { submitted = true; validateAll(); }" style="background-color: #0067e8;">
  인증요청</button>
        </div>
      </form>


    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "/src/assets/Main.scss" as *;
@use "/src/assets/Variables.scss" as *;

body {
  height: 98% !important;
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
    margin: 15px 0 0 0 !important;
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
    text-align: left;
  }

  form {
    display: flex;
    flex-direction: column;
    /* 경고란이 보일 때의 높이를 계산하여 설정 */
    min-height: 780px;
    /* 이 값을 실제 높이에 맞게 조정해야 합니다. */
    transition: min-height 0.3s ease;

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

    // 에러메시지 영역
    .errArea {

      .errAreaDiv {
        display: flex;
        align-items: center;


        .error-label {
          color: red;
          padding: 5px;
          padding-left: 30px;
          background: url("/images/geen/2/point 1.svg") no-repeat 8px center;
          background-size: 13px;
        }
      }
    }

    .verification-wrap {

      /* 부드러운 전환 효과 추가 */
      .signup1area {
        width: 100%;
        margin-bottom: 20px;

        .keep_check {
          display: flex;
          /* 아이콘 + 텍스트 나란히 */
          justify-content: end;
          align-items: center;
          /* 세로 가운데 정렬 */
          cursor: pointer;
          margin-top: 10px;
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
          background: url("/images/geen/1/mail 1.png") no-repeat 8px center;
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

        .mobileco_icon {
          height: 45px;
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
          top: 13px;
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
            width: 120px;
            padding: 6px 15px;
            text-align: left;
            cursor: pointer;
            color: #818181;
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
            padding: 10px 0;
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
      margin-top: 20px;

      .world_icon {
        height: 45px;
        cursor: pointer;
        border-radius: 5px 5px 0 0;
        background: url("/images/geen/1/world 1.svg") no-repeat 8px center;
        padding-left: 40px !important;
        padding-right: 40px !important;
        /* 아이콘 때문에 왼쪽 여백 추가 */
        background-size: 20px, 15px;
        font-size: 14px;
        font-weight: normal;
        caret-color: transparent;

        &:focus {
          box-shadow: 0 2px 0 0 #0000ff; // 포커스 시 밑줄 강조
        }
      }

      .phoneDiv {
        &.check .phone_icon {
          border-radius: 5px;
        }

        .phone_icon {
          height: 45px;
          cursor: pointer;
          border-radius: 0 0 5px 5px;
          border-bottom: 1px solid #ccc;
          background: url("/images/geen/2/device-mobile 1 (1).svg") no-repeat 8px center;
          padding-left: 40px !important;
          padding-right: 40px !important;
          /* 아이콘 때문에 왼쪽 여백 추가 */
          background-size: 20px, 15px;
          font-size: 14px;
          font-weight: normal;
          caret-color: transparent;


          &:focus {
            box-shadow: 0 2px 0 0 #0000ff; // 포커스 시 밑줄 강조
          }
        }

        .phonedelbtn {
          top: 342px;
          left: 65%;
        }
      }

      .agree {
        position: relative;
        font-size: 13px;
        margin: 12px 0 0;
        text-align: left;

        span {
          color: $main-color;
        }

        &.check .agree_icon {
          border-radius: 5px 5px 0 0;
          border-color: none;
          background: url("/images/geen/1/check.png") no-repeat 8px center;
          background-size: 20px;
          /* 글자색 변경 */
          font-weight: bold;
          filter: invert(12%) sepia(100%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(120%);
        }

        .agree_icon {
          height: 45px;
          cursor: pointer;
          border-radius: 5px;
          border-bottom: 1px solid #ccc;
          background: url("/images/geen/1/check.png") no-repeat 8px center;
          background-size: 17px;
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

        .agreeToggle {
          span {
            position: absolute;
            top: 0;
            right: 0;
          }
        }
      }

      .agreelistDiv {
        position: relative;
        color: #868686;

        .agreelist {
          display: flex;
          text-align: left;
          background-color: #Fff;
          border-radius: 0 0 8px 8px;
          border: 1px solid #ccc;
          z-index: 1;

          .col {
            flex: 1;
            display: flex;
            flex-direction: column;
            width: 180px;

            .agree-item {
              display: flex;
              gap: 5px;
              width: 210px;
              height: 30px;
              padding: 10px 5px 0 20px;
            }
          }

          .colleft {
            .agree-item {
              width: 170px;

              img {
                width: 18px;
                height: 18px;
              }
            }
          }

          .colright {
            .agree-item {
              padding: 10px 20px 0 5px;
            }
          }
        }
      }
    }

    .signup4area {
      width: 100%;
      margin-top: 20px;

      // 주소검색
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

      //상세주소
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

      //인증요청
      .signup_wrap {
        .signup_guide {
          display: flex;

          span {
            position: relative;

            img {
              position: absolute;
              width: 10px;
            }
          }
        }
      }
    }

    .social-login {
      margin: 10px 0;
      width: 100%;
      margin: 40px 0;

      .bb_sns-login {
        display: flex;
        justify-content: left;
        align-items: center;
        gap: 45px; // 선과 텍스트 사이 간격
        width: 92%;

        .bb_grayline {
          width: 50px;
          height: 1px;
          background-color: #ccc; // 연한 회색
        }

        .bb_imgline {
          flex: 1;
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;





          p {
            font-size: 14px;
            color: #333;
            font-size: 14px;
            color: #2aaae2;
            text-align: left;
          }
        }

        .icons {
          margin: 0 10px;
        }
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
      justify-content: left;


      p {
        padding-right: 5px;
      }
    }

    .btn-main {
      width: 100%;
      padding: 15px !important;
      background: $main-color;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      margin-top: 10px;
      cursor: pointer;
    }
  }

}
</style>
