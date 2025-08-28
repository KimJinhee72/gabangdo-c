<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import QRCode from "qrcode.vue";

const qrCodeValue = ref("https://gabangdo-c.vercel.app/login");
const remainingTime = ref(120); // 2분
const numbers = ref([]);
const expired = ref(false); // QR코드 만료 상태
let timer = null;

// 남은 시간 포맷
const formattedTime = () => {
    const m = Math.floor(remainingTime.value / 60)
        .toString()
        .padStart(2);
    const s = (remainingTime.value % 60).toString().padStart(2, "0");
    return `${m}분${s}초`;
};

// 랜덤 숫자 생성 (0~99, 2개)
const generateNumbers = () => {
    numbers.value = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];
};

// 타이머 시작
const startTimer = () => {
    remainingTime.value = 120;
    expired.value = false;
    generateNumbers();
    timer = setInterval(() => {
        if (remainingTime.value > 0) {
            remainingTime.value -= 1;
        } else {
            clearInterval(timer);
            expired.value = true;
        }
    }, 1000);
};

// 재시도 버튼
const retry = () => {
    startTimer();
};

// 시작
onMounted(() => {
    startTimer();
});

onUnmounted(() => {
    clearInterval(timer);
});
</script>
<template>
    <div class="qr_wrap">
        <div v-if="!expired">
            <div class="qr_area">
                <div class="qr_box">
                    <QRCode :value="qrCodeValue" :size="90" :margin="auto" />
                    <div class="time_wrap">
                        <p class="time_text">남은시간</p>
                        <p class="time_num">{{ formattedTime() }}</p>
                    </div>
                </div>
            </div>
            <h2>
                공용 네트워크, 공용 PC라면 안전을 위해 <br>
                휴대폰 앱으로 QR코드를 스캔하세요.
            </h2>
            <div class="sub_desc">
                <span class="text">
                    네이버 앱 <em class="bullet_greendot"></em> &gt; 렌즈 <em class="bullet_lens"></em> 를 눌러 QR코드를
                    스캔하여<br>
                    보이는 숫자 중
                    <strong class="point">{{ numbers[0] }}</strong> 를 선택하면 로그인 됩니다.
                </span>
            </div>
        </div>

        <div v-else class="qr_expired">
            <p class="img_wowpoint"></p>
            <div class="sub_desc sub_desc2">
                해당 QR코드의 유효시간이 지났습니다.<br> 다시 로그인을 시도하시겠습니까?
            </div>
            <button class="trybtn" @click="retry"><img
                    src="/images/geen/1/5760336_reload_reset_restart_return_update_icon 1.png"
                    alt=""><span>재시도</span></button>
        </div>

        <button @click="$emit('close')" class="lastbtn">ID로그인으로</button>
    </div>
</template>
<style scoped>
.qr_wrap {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 10px 24px 0;
    margin-top: -10px;
    font-size: 12px;
    border: 1px solid #e1e3e5;
    border-radius: 12px;
    background-color: #fff;
}

.qr_area {
    display: flex;
    justify-content: center;
    /* 수평 중앙 */
    align-items: center;
    /* 수직 중앙 (선택) */
    margin: 25px 0 30px;
}

.qr_box {
    display: flex;
    justify-content: center;
    /* 수평 중앙 */
    align-items: center;
    /* 수직 중앙 (선택) */
    padding: 5px;
    border-radius: 5px;
    border: 1px solid rgb(1, 1, 224, 0.7);
}

.qr_box canvas {
    width: 100%;
    border-radius: 5px !important;
    background-color: #fff;
    /* 선택: QR 배경 흰색 */
}

.time_wrap {
    position: absolute;
    top: 25%;
    left: 65%;
    font-size: 14px !important;
}

.time_num {
    font-size: 18px;
    font-weight: bold;
    color: blue;

}

.sub_desc {
    padding-bottom: 10px;
    font-size: 12px;
    line-height: 18px;
    color: #666;
    text-align: center;
}

.sub_desc .bullet_greendot,
.sub_desc .bullet_lens {
    display: inline-block;
    margin-top: 3px;
    vertical-align: top;
    background-position: -275px -90px;
    background-repeat: no-repeat;
    width: 11px;
    height: 11px;
    background-image: url(https://ssl.pstatic.net/static/nid/login/m_sp_01_login_775fb7c0.png);
    background-size: 336px 330px;
}

.sub_desc .bullet_greendot {
    background-position: -275px -90px;
}

.sub_desc .bullet_lens {
    background-position: -275px -77px;
}

.sub_desc .point {
    display: inline-block;
    width: 27px;
    height: 16px;
    margin: 0 1px;
    line-height: 14px;
    padding: 1px 6px;
    border-radius: 10px;
    background-color: #000;
    color: #fff;
    font-size: 12px;
    box-sizing: border-box;
}

.sub_desc2 {
    margin: 20px 0 0;
}

h2 {
    margin: 5px 0;
    font-size: 14px;
}


/* 시간재시도 */
.qr_expired {
    padding: 40px 0 0;
}

.img_wowpoint {
    display: block;
    margin: 0 auto;
    background-position: -66px -150px;
    background-repeat: no-repeat;
    width: 50px;
    height: 50px;
    background-image: url(https://ssl.pstatic.net/static/nid/login/m_sp_01_login_775fb7c0.png);
    background-size: 336px 330px;
}

.trybtn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 100%;
}

.trybtn img {
    width: 20px;
}

.trybtn span {
    font-size: 16px !important;
    font-weight: bold;
    color: blue;
}

.lastbtn {
    margin: 20px 0;
    font-size: 14px;
    text-decoration: underline;
    color: #666;
}
</style>
