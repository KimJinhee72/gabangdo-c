<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import CustomSelect from "./CustomSelect.vue";

const router = useRouter();
const name = ref("");
const telPrefix = ref("010");
const phoneRaw = ref("");
const reservationNumber = ref("");

// 연락처 포맷터: 8자리 숫자 -> 4자리-4자리 형식
const formattedNumber = computed({
  get() {
    const digits = phoneRaw.value.replace(/\D/g, "").slice(0, 8);
    return digits.length > 4
      ? `${digits.slice(0, 4)}${digits.slice(4)}`
      : digits;
  },
  set(val) {
    phoneRaw.value = val.replace(/\D/g, "").slice(0, 8);
  },
});

//라우터링크
function goToLookup() {
  router.push("/yeyaklookup2");
}
</script>

<template>
  <div class="wrap_total">
    <div class="st_wrap">
      <div class="yy_title1">
        <div class="title_txt1">
          <h1>예약조회</h1>
        </div>
      </div>

      <div class="st_line">
        <div class="container">
          <!-- 이름 입력 -->
          <div class="info-row">
            <div class="name-input">
              <input v-model="name" placeholder="이름 입력" />
            </div>
          </div>
          <!-- 연락처 입력 -->
          <div class="info-row">
            <div class="phone-input my-button">
              <CustomSelect v-model="telPrefix" />
              <input
                v-model="formattedNumber"
                maxlength="9"
                placeholder="전화번호 입력(8자리)" />
            </div>
          </div>
          <!-- 예약번호 입력 -->
          <div class="info-row">
            <div class="lookup-input">
              <input
                v-model="reservationNumber"
                type="text"
                placeholder="예약번호를 입력해주세요." />
            </div>
          </div>
          <p>예약번호를 잊으셨나요?</p>
        </div>
        <!-- 조회 버튼 -->
        <div class="button">
          <button class="my-button st_reser" @click="goToLookup">
            조회하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "/src/assets/Main.scss" as *;
@use "/src/assets/Variables.scss" as *;

// 전체 래퍼
.st_wrap {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: $font-family;
}

.yy_title1 {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-bottom: 30px;
  .title_txt1 h1 {
    font-size: 40px;
    font-family: $font-ownglyph;
  }
}

.st_line {
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
  margin: 0 auto;
  border: 1px solid $border-gray;
  box-shadow: $box-shadow;
  border-radius: $radius;
  padding: 30px;
  overflow: visible;
  height: auto;
  background-color: #ffffff;
}

.container {
  width: 100%;
  padding: 20px;
  margin-bottom: 30px;
}

// 입력 필드
input,
select {
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 15px;
  border: 1px solid $border-gray;
  border-radius: $radius;
  background: #fff;
  box-sizing: border-box;
  color: $dark-gray;
  &:focus {
    outline: 3px solid $blue-sky;
    outline-offset: -2px;
  }
}
//이름
.name-input {
  gap: 10px;
  display: flex;
  height: 40px;
  width: 100%;
  color: $dark-gray;
  margin-bottom: 10px;
  input {
    display: flex;
    align-items: center;
    flex: 1;
    height: 40px;
    border-radius: $radius;
    padding: 10px;
    border: 1px solid $border-gray;
    color: $dark-gray;
    .name-input input:focus {
      outline: 3px solid $blue-sky;
      outline-offset: -2px;
    }
  }
}
// 전화번호
.phone-input {
  display: flex;
  gap: 10px;
  height: 40px;
  width: 100%;
  color: $dark-gray;
  margin-bottom: 10px;
  input {
    display: flex;
    align-items: center;
    flex: 1;
    height: 40px;
    border-radius: $radius;
    padding: 10px;
    border: 1px solid $border-gray;
    color: $dark-gray;
    .phone-input input:focus {
      outline: 3px solid $blue-sky;
      outline-offset: -2px;
    }
  }
}

//예약번호
.lookup-input {
  display: flex;
  gap: 10px;
  height: 40px;
  width: 100%;
  color: $dark-gray;
  margin-bottom: 10px;
  input {
    display: flex;
    align-items: center;
    flex: 1;
    height: 40px;
    border-radius: $radius;
    padding: 10px;
    border: 1px solid $border-gray;
    color: $dark-gray;
    .lookup-input input:focus {
      outline: 3px solid $blue-sky;
      outline-offset: -2px;
    }
  }
}
// 안내문구
p {
  color: #279bf3;
  font-size: 15px;
}
// 제출 버튼
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .st_reser {
    width: 120px;
    height: 40px;
    background-color: color.adjust($main-color, $lightness: 30%);
    color: #fff;
    font-size: 16px;
    border-radius: $radius;
    cursor: pointer;
    border: none;
    transition: background 0.3s;
    margin: 15px;
    display: block;
  }
  .st_reser:hover {
    background-color: color.adjust($sub-color, $lightness: 20%) !important;
  }
}

.my-button {
  position: relative;
  z-index: 4000; /* fixed-buttons(1000)보다 높게 */
}
</style>
