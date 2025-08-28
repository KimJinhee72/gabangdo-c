<script setup>
import { ref } from "vue";
import { nextTick } from 'vue';
import SecurePop from "./securePop.vue";

const id = ref("");
const password = ref("");
const keepLoggedIn = ref(false);   // 로그인 상태 유지 체크
const showIpSidebar = ref(false);  // 왼쪽 고정 이미지 표시
const ipSecurity = ref(false);      // IP보안 ON/OFF
const ipSwitchRef = ref(null);    // 스위치 ref
// 보안이미지 팝업
const openIpSecurity = (e) => {
  showIpSidebar.value = true;
};
// SecurePop에서 확인 클릭 시 호출
const handleConfirm = () => {
  ipSecurity.value = true;            // 스위치 ON
  showIpSidebar.value = false;        // 팝업 닫기
  ipSwitchRef.value?.blur();          // 포커스 제거
  nextTick(() => {
    ipSwitchRef.value?.blur();
  });
}

// SecurePop에서 취소 클릭 시 호출
const handleCancel = () => {
  showIpSidebar.value = false;
  ipSwitchRef.value?.blur();          // 포커스 제거
  nextTick(() => {
    ipSwitchRef.value?.blur();
  });
}
</script>

<template>
  <!-- 로그인 상태 유지 -->
  <div class="login_StatusNSecure">
    <div class="login_keep_wrap" id="login_keep_wrap">
      <div class="keep_check" :class="{ check: keepLoggedIn }" id="keep" role="checkbox" aria-checked="false"
        tabindex="0" @click="keepLoggedIn = !keepLoggedIn" @keydown.enter.space.prevent="keepLoggedIn = !keepLoggedIn">
        <input type="checkbox" id="nvlong" name="nvlong" tabindex="-1" v-model="keepLoggedIn" class="input_keep"
          value="off" />
        <span for="keep" class="keep_text">로그인 상태 유지</span>
      </div>

      <!-- IP 보안 -->
      <div class="ip_check">
        <!-- IP보안 링크 -->
        <a href="#" id="ipguide" title="IP보안" @click="openIpSecurity"><span class="ip_text">IP보안</span></a>
        <!-- on/off스위치 -->
        <span class="switch">
          <input type="checkbox" v-model="ipSecurity" id="switch" ref="ipSwitchRef" class="switch_checkbox"
            value="off" />
          <label for="switch" class="switch_btn">
            <span class="switch_on" role="checkbox" aria-checked="true">ON</span>
            <span class="switch_off" role="checkbox" aria-checked="false">OFF</span>
          </label>
        </span>
      </div>
      <!-- 왼쪽 고정 이미지 securePop 컴포넌트 -->
      <teleport to="body">
        <SecurePop v-if="showIpSidebar" v-model="ipSecurity" class="popwrap" @confirm="handleConfirm"
          @cancel="handleCancel" />
      </teleport>

    </div>
  </div>

</template>
<style scoped>
.login_keep_wrap {
  position: relative;
  margin-top: 12px;
  padding-right: 90px
}

/* 로그인상태체크박스 */
.keep_check {
  position: relative;
  display: inline-block;
  padding-left: 30px;
  line-height: 25px;
  cursor: pointer
}

.keep_check::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  background: url("/images/geen/1/check.png") no-repeat 4px center;
  background-size: 18px;
  background-repeat: no-repeat;
  width: 22px;
  height: 22px;
  background-color: #fff;
}

.keep_check.check::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  background: url("/images/geen/1/check.png") no-repeat 4px center;
  background-size: 18px;
  background-repeat: no-repeat;
  width: 22px;
  height: 22px;
  filter: invert(12%) sepia(100%) saturate(7500%) hue-rotate(200deg) brightness(100%) contrast(120%);
}

.keep_check .input_keep {
  /* 네이티브 체크박스 숨기기 */
  display: none;
}

.keep_check.check .keep_text {
  color: #1970da;
  pointer-events: none;
  /* 클릭/커서 이벤트 무시 */

}

.keep_check .keep_text {
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #767678;
  cursor: default;
  pointer-events: none;
  /* 클릭/커서 이벤트 무시 */
}

/* 보안 */
.ip_check {
  position: absolute;
  top: 0;
  right: 0;
  padding-right: 45px
}

.ip_check .ip_text {
  display: flex;
  align-items: center;
  gap: 10px;
  /* a와 switch 사이 간격 */
  padding-right: 4px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -.4px;
  color: #303038
}

.ip_check .switch {
  position: absolute;
  top: 50%;
  right: 0;
  margin-top: -10px;
  text-align: center;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent
}

.ip_check .switch_checkbox {
  position: absolute;
  top: 2px;
  right: 1px;
  width: 42px;
  height: 18px
}

.ip_check .switch_checkbox:checked~.switch_btn {
  background-color: #09aa5c;
  transition: all .3s ease;
  text-align: left
}

.ip_check .switch_checkbox:checked~.switch_btn::before {
  transform: translate(25px, 0);
  background-color: #fff
}

.ip_check .switch_checkbox:checked~.switch_btn .switch_off,
.ip_check .switch_checkbox:checked~.switch_btn .switch_on {
  display: inline-block;
  padding-left: 6px
}

.ip_check .switch_checkbox:checked~.switch_btn .switch_off {
  display: none
}

.ip_check .switch_btn {
  display: block;
  position: relative;
  width: 45px;
  height: 20px;
  margin: 0 auto;
  border-radius: 12px;
  background-color: #a5adb8;
  box-sizing: border-box;
  cursor: pointer;
  text-align: right
}

.ip_check .switch_btn span {
  vertical-align: top;
}

.ip_check .switch_btn::before {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  left: 2px;
  width: 16px;
  height: 16px;
  margin-top: -8px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
  transition: all .3s ease;
  box-sizing: border-box
}

.ip_check .switch_off,
.ip_check .switch_on {
  display: none;
  height: 20px;
  font-size: 11px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -.3px;

  color: #fff
}

.ip_check .switch_off {
  display: inline-block;
  padding-right: 5px;
}

.popwrap {
  z-index: 10000;
}
</style>
