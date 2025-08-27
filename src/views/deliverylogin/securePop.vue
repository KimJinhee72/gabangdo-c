<template>
    <div id="ip_security" class="wrap">
        <div id="content">
            <h2>IP 보안 <span class="span1">이란?</span></h2>
            <p class="h2_desc"><img src="https://static.nid.naver.com/images/login/common/p_ip_security.gif" title=""
                    alt="IP주소정보의 사용범위를 사용자의 인터넷 접속환경에 맞게 3단계로 설정할 수 있도록 하여 타인이 로그인 권한을 가로채어 부정하게 사용하는 것을 방지하는, 사용성 및 보안성이 강화된 네이버 로그인상태 관리서비스입니다."
                    width="363" height="47"></p>
            <fieldset class="set">
                <h3><img src="https://static.nid.naver.com/images/login/common/h_set_scr_ip.gif" alt="IP 보안 설정"
                        width="60" height="15"></h3>
                <dl class="set_ip">
                    <dt class="s_on"><a href="javascript:setLevel(1);"><img
                                src="https://static.nid.naver.com/images/login/common/btn_on.gif" alt="On" width="18"
                                height="10"></a></dt>
                    <dd class="s_on">
                        <ul>
                            <li>
                                <input type="radio" id="scr_ip1" name="scr_ip" class="input_radio"
                                    :checked="ipLevel === 1" @click="setLevel(1)">
                                <label for="scr_ip1">IP보안 1단계 (보통)</label>
                            </li>
                            <li>
                                <input type="radio" id="scr_ip2" name="scr_ip" class="input_radio"
                                    :checked="ipLevel === 2" @click="setLevel(2)">
                                <label for="scr_ip2">IP보안 2단계 (높음)</label>
                            </li>
                            <li>
                                <input type="radio" id="scr_ip3" name="scr_ip" class="input_radio"
                                    :checked="ipLevel === 3" @click="setLevel(3)">
                                <label for="scr_ip3">IP보안 3단계 (안심)</label>
                            </li>
                        </ul>
                    </dd>
                    <dt class="s_off"><a href="javascript:setLevel(-1);"><img
                                src="https://static.nid.naver.com/images/login/common/btn_off.gif" alt="Off" width="24"
                                height="10"></a></dt>
                    <dd class="s_off"><input type="radio" id="scr_ip_off" name="scr_ip" class="input_radio"
                            :checked="ipLevel === -1" @click="setLevel(-1)">
                        <label for="scr_ip_off">사용안함(OFF)</label>
                    </dd>
                </dl>
            </fieldset>
            <ul class="desc desc2">
                <li class="f">
                    <dl>
                        <dt><a href="javascript:setLevel(1);"><img
                                    src="https://static.nid.naver.com/images/login/common/h_ip1.gif" alt="IP보안 1단계"
                                    width="38" height="33"></a></dt>
                        <dd><span class="title">사용대상 - </span>유동 IP를 사용하는 일반 인터넷 사용자 (권장수준)</dd>
                        <dd><span class="title">보안효과 - </span>로그인 후 IP주소가 최근 로그인 시 IP주소들과 일정범위(C클래스)<br>까지 동일한 경우만 허용,
                            <strong>멀리 떨어진 장소에서<br>로그인 권한을 부정사용 하는 것을 차단</strong>
                        </dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt><a href="javascript:setLevel(2);"><img
                                    src="https://static.nid.naver.com/images/login/common/h_ip2.gif" alt="IP보안 2단계"
                                    width="38" height="33"></a></dt>
                        <dd><span class="title">사용대상 - </span>유동 IP의 일반 인터넷에서 높은 수준의 IP보안을 원하는 사용자 </dd>
                        <dd><span class="title">보안효과 - </span><strong>로그인 후 IP주소가 최근 로그인 시 IP주소들과 동일한 경우만
                                <br>허용</strong>, 인터넷 접속중 IP주소 변경 시 사용자 재확인을 최소화하고, <br>3단계와 동일한 보안수준을 제공 </dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt><a href="javascript:setLevel(3);"><img
                                    src="https://static.nid.naver.com/images/login/common/h_ip3.gif" alt="IP보안 3단계"
                                    width="38" height="33"></a></dt>
                        <dd><span class="title">사용대상 - </span>인터넷 접속 중 IP주소가 변경되지 않는 사용자 </dd>
                        <dd><span class="title">보안효과 - </span><strong>로그인 후 IP주소가 변경되지 않는 경우만 허용</strong>, IP주소정보를
                            <br>사용한 최고의 보안수준을 제공
                        </dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt><a href="javascript:setLevel(-1);"><img
                                    src="https://static.nid.naver.com/images/login/common/h_nouse.gif" alt="사용안함"
                                    width="48" height="14"></a></dt>
                        <dd class="no_title">로그인 상태에서 IP주소가 자주 변경되는 사용자의 경우 선택.<br>단, IP보안 설정을 하지 않은 상태이므로 보안에 취약.</dd>
                    </dl>
                </li>
            </ul>
            <div class="notice">
                <p><span class="bu">*</span> 로그인 상태유지 설정 시 IP보안은 '사용안함'으로 변경되는 <br>점 유의해 주세요.</p>
            </div>
            <p class="btn_more"><a target="_blank"
                    href="https://help.naver.com/alias/membership/p.membership/p.membership_1.naver"><img
                        src="https://static.nid.naver.com/images/login/common/btn_more_help.gif" alt="추가 도움말 보기"
                        width="96" height="18"></a></p>
        </div>

        <div id="footer">
            <button @click.prevent="$emit('confirm')">확인</button>
            <button @click="$emit('cancel')">취소</button>
        </div>

    </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    modelValue: Boolean // 부모의 ipSecurity 상태
})

const emit = defineEmits(["update:modelValue", "close"]);

// 선택 레벨
const ipLevel = ref(-1);

const setLevel = (level) => {
    ipLevel.value = level;
};

const dosubmit = () => {
    // 확인 클릭 시 부모 스위치 ON
    emit("update:modelValue", true);
    emit("close"); // 팝업 닫기
};

const cancel = () => {
    emit("close"); // 팝업 닫기만
};
</script>

<style scoped>
@charset "utf-8";

* {
    margin: 0;
    padding: 0;
}

body {
    background-color: #fff;
}

body,
th,
td,
input,
textarea,
select,
button {
    font-size: 11px;
    line-height: 1.45em;
    font-family: "돋움", Dotum, "굴림", Gulim, AppleGothic, Sans-serif;
    color: #2f3743;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    text-align: left;
}

img,
fieldset {
    border: 0;
}

li {
    list-style: none;
    font-size: 12px;
}

a {
    color: #383d41;
    text-decoration: none;
}

a:hover {
    color: #3903ff;
    text-decoration: underline;
}

em,
address {
    font-style: normal;
}

button,
label,
input {
    cursor: pointer;
    _cursor
    /**/
    : hand;
}

textarea {
    overflow: auto;
}

html:first-child select {
    height: 20px;
    padding-right: 6px;
}

option {
    padding-right: 6px;
}

/* Common */
.input_text,
textarea {
    margin: -1px 0;
    padding-right: 1px;
}

.input_check,
.input_radio {
    width: 13px;
    height: 13px;
}

.blind,
hr {
    visibility: hidden;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    font-size: 0;
    line-height: 0;
}

.entry-title {
    display: none;
}

/* Layout */
.wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 520px;
    height: 747px;
    background-color: #f8f8f7;
    box-shadow: 5px 8px 5px rgba(0,0,0,0.25);
    z-index: 9999;
}

#header {
    position: relative;
    height: 51px;
    background: #3903ff url(https://static.nid.naver.com/images/login/bg_pop_header_v2.gif) repeat-x 0 0;
}

#content {
    margin: 0 30px;
    padding-top: 4px;
    background: url(https://static.nid.naver.com/images/login/bg_security.gif) no-repeat 10px 29px;
}

#footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 14px 0 22px;
    border-top: 1px solid #dfdfdf;
    background-color: #efefef;
    text-align: center;
}

#footer input,
#footer button {
    margin: 0 2px;
    padding: 1px 20px 0;
    padding-top: 5px;
    font-size: 16px;
    line-height: 1.1em;
}
#footer button:hover{
    font-weight: bold;
}
/* header */
h1 {
    padding: 13px 0 0 28px;
}

.menu {
    position: absolute;
    right: 29px;
    bottom: 4px;
}

.menu li {
    float: left;
}

.menu img {
    vertical-align: top;
}

/* content */
h2 {
    margin: 22px 0 0 83px;
    color: #3903ff;
    font-size: 16px;
    font-weight: bold;
}

.span1 {
    color: #777;
}

.h2_desc {
    margin: 6px 0 28px 83px;
}

.set_login {
    position: relative;
    width: 76px;
    height: 63px;
    top: 13px;
    left: 187px;
}

.set_login button {
    width: 18px;
    height: 12px;
}

.set_login .login_level {
    position: absolute;
    left: 13px;
    top: 22px;
    width: 55px;
    height: 15px;
    overflow: visible;
}

.set_login .login_level li {
    position: absolute;
    top: 2px;
    left: 0;
}

.set_login .login_level .level1 {
    left: 2px;
}

.set_login .login_level .level2 {
    left: 20px;
}

.set_login .login_level .level3 {
    left: 38px;
}

.set_login .login_level li a {
    display: block;
    width: 19px;
    height: 15px;
}

.set_login .login_level li.level_on {
    z-index: 2;
}

.set_login .login_info {
    position: absolute;
    left: 15px;
    top: 2px;
}

.set_login .login_info li {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
}

.step1 .level1 img,
.step2 .level2 img,
.step3 .level3 img,
.step1 .info1,
.step2 .info2,
.step3 .info3 {
    display: block !important;
}

.set {
    position: relative;
    width: 458px;
    height: 70px;
    margin: 0 0 9px 1px;
    background: url(https://static.nid.naver.com/images/login/bg_box.gif) no-repeat 0 0;
    z-index: 9999;
}

.set h3 {
    position: absolute;
    left: 28px;
    top: 17px;
    height: 36px;
    padding-right: 28px;
    border-right: 1px solid #dcdcdc;
}

.set h3 img {
    margin-top: 9px;
}

.set_ip {
    padding: 10px 0 0 120px;
    _padding-top: 11px;
}

.set_ip dt,
.set_ip dd {
    float: left;
}

.set_ip dt {
    padding-right: 9px;
    text-align: right;
}

.set_ip dt.s_on {
    width: 33px;
}

.set_ip dd.s_on {
    width: 122px;
}

.set_ip dt.s_off {
    width: 40px;
}

.set_ip dd.s_off {
    width: 110px;
}

.set_ip li {
    margin-bottom: 2px;
    _margin-bottom: 4px;
}

.set_ip .input_radio {
    vertical-align: middle;
}

.set_ip label {
    margin-left: 3px;
    vertical-align: -1px;
    font-size: 12px;
}

.desc {
    letter-spacing: -1px;
}

.desc li {
    clear: both;
    background: url(https://static.nid.naver.com/images/login/line_double.gif) repeat-x 0 0;
}

.desc .f {
    background: none;
}

.desc dl {
    padding: 19px 0 12px;
    *padding-top: 6px;
}

.desc dt {
    position: absolute;
    width: 97px;
    margin-top: -3px;
    text-align: center;
}

.desc dd {
    padding: 0 0 5px 164px;
}

.desc dd .title {
    position: absolute;
    margin-left: -53px;
    *margin-top: -2px;
}

.desc .no_title {
    padding-left: 111px;
}

.desc strong {
    font-size: 13px;
    font-weight: normal;
    color: #3903ff;
}

.desc2 {
    padding-top: 10px;
}

.desc2 dl {
    padding: 14px 0 7px;
    *padding-top: 1px;
}

.desc2 dt {
    width: 77px;
    margin-top: 1px;
    text-align: left;
}

.desc2 dt img {
    margin-left: 19px;
}

.desc2 dd {
    padding-left: 137px;
}

.desc2 .no_title {
    padding-left: 84px;
}


.notice {
    position: absolute;
    left: 47px;
    bottom: 79px;
    color: #848689;
    line-height: 1.3em;
    letter-spacing: -1px;
}

.notice p {
    margin-top: 4px;
    font-size: 13px;
}

.notice .bu {
    position: absolute;
    margin: 0 0 0 -7px;
}

.btn_more {
    position: absolute;
    right: 41px;
    bottom: 78px;
}
</style>
