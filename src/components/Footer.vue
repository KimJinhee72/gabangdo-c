<template>
  <div class="ft_footer">
    <div class="inner">
      <!-- 풋터 상단 -->
      <div class="ft_footerTop">
        <!-- 풋터 상단 왼쪽 : 회사정보 -->
        <div class="ft_topLeft">
          <div class="ft_serviceInfo">
            <a href="https://www.kakao.com/policy/privacy?lang=ko" target="_blank">개인정보취급방침</a>|
            <a href="https://www.kakao.com/policy/terms?type=a&lang=ko" target="_blank">이용약관</a>
          </div>
          <div class="ft_accountAddress">
            <p>
              결&nbsp;제&nbsp;계&nbsp;좌 : 대구은행 123-456-78910
              <strong>가방도 도용달 </strong><br />
              택&nbsp;배&nbsp;주&nbsp;소 : 대구광역시 신천구 신천동로 888
              (우:45023)
            </p>
          </div>
          <div class="ft_corpInfo">
            <p>
              대표자 : 도용달 | 사업자등록번호 053-123-4567 <br />
              주&nbsp;&nbsp;&nbsp;소 : 대구광역시 신천구 신천동로 888
              (대구광역시 신천구 신천동33-3)
              <br />
              이메일 : yongdaldo@email.com | 팩스번호 : 053-123-5678
            </p>
            <p class="copyP">Copyright 2025. 가방도 Co. All rights reserved.</p>
          </div>
        </div>
        <!-- 풋터 상단 오른쪽 : 고객센터 -->
        <div class="ft_contactUs">
          <h1>고객센터</h1>
          <h2>123-456-7891</h2>
          <p>평&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;일 : 09:00 - 18:00</p>
          <p>토&nbsp;요&nbsp;일 : 09:00 - 13:00</p>
          <p>
            일&nbsp;요&nbsp;일 , 공&nbsp;휴&nbsp;일 : 휴 무(&nbsp; 예약일정에
            따라 변동&nbsp; )
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- 용달씨 머리(예약할래?)이미지 고정 버튼 -->
  <!-- <div
    class="fixed-buttons">
    <button class="inquiry-btn" @click="openReservation">
      <span>예약 할래?</span>
      <router-link to="/yeyak"><img class="fas fa-calendar-check" src="/images/gh/1/head.png" alt="예약할래이미지" /></router-link>
    </button>
  </div> -->
</template>

<script setup></script>

<style lang="scss" scoped>
.ft_footer {
  width: 100%;
  background-color: #f5f5f5;
  padding: 30px 0;
  position: relative;
}

.inner {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px;
}

.ft_footerTop {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
}

.ft_topLeft {
  flex: 1;
}

.ft_contactUs {
  flex: 1;
  padding-left: 40px;
  border-left: 1px solid #ddd;
  min-width: 0;
  letter-spacing: 1.2px;
  h1 {
    font-size: 18px;
    color: #333;
    margin-bottom: 8px;
    font-weight: 600;
  }

  h2 {
    font-size: 24px;
    color: #0066b3;
    margin-bottom: 12px;
    font-weight: 700;
  }

  p {
    color: #666;
    line-height: 1.6;
    font-size: 14px;
    margin-bottom: 16px;    
  }
}

.ft_serviceInfo {
  margin-bottom: 15px;
  letter-spacing: 1.2px;
  a {
    color: #333;
    text-decoration: none;
    // margin: 0 10px;

    &:hover {
      color: #0066b3;
    }
  }
}

.ft_corpInfo,
.ft_accountAddress {
  margin-bottom: 10px;
  letter-spacing: 1.1px;
  p {
    color: #666;
    line-height: 1.5;
    font-size: 13px;
    strong{
      font-size: 15px;
    }
  }
}
// 고정버튼들
.fixed-buttons {
  position: fixed;
  bottom: 80px;
  transform: translateX(43%);
  width: 100%;
  max-width: 1000px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 1000;
}
.contactUs {
  display: flex;
  flex-direction: column;
}
.inquiry-btn {
  all: unset; /* 버튼 기본 스타일 제거 */
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  i {
    font-size: 14px;
  }
  span {
    display: none;
  }
  &:hover {
    transform: translateY(-3px);
    span {
      width: 120px;
      line-height: 45px;
      text-align: center;
      display: block;
      font-size: 16px;
      border-radius: 30px;
      background-color: #fff;
      box-shadow: 0 4px 10px rgba(212, 141, 77, 0.3),
        0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }
  img {
    width: 80px;
  }
}
@media screen and (max-width: 1024px) {
  .ft_footerTop {
    flex-direction: column;
    gap: 30px;
  }

  .ft_contactUs {
    flex: none;
    width: 100%;
    padding-left: 0;
    border-left: none;
    border-top: 1px solid #ddd;
    padding-top: 30px;
  }
}

@media screen and (max-width: 768px) {
  .ft_footer {
    padding: 20px 0;
  }

  .inner {
    padding: 0 15px;
  }

  .fixed-buttons {
    right: 15px;
    bottom: 15px;
  }

  .inquiry-btn {
    padding: 8px 15px;
    font-size: 12px;
    span{
      width: 80px !important;
      line-height: 35px !important;
    }   
  }
  .fas{
    width: 50px !important;
  }
  .ft_contactUs {
    h1 {
      font-size: 16px;
      letter-spacing: 1.4px;
    }

    h2 {
      font-size: 20px;
    }

    p {
      font-size: 13px;
    }
  }
}

@media screen and (max-width: 480px) {
  .ft_footer {
    padding: 15px 0;
  }

  .inner {
    padding: 0 10px;
  }

  .ft_footerTop {
    gap: 15px;
  }

  .ft_contactUs {
    padding-top: 15px;
  }

  .fixed-buttons {
    right: 10px;
    bottom: 10px;
  }

  .inquiry-btn {
    padding: 6px 12px;
    font-size: 11px;
    i {
      font-size: 11px;
    }
  }  
  .ft_contactUs {
    h1 {
      font-size: 15px;
    }

    h2 {
      font-size: 18px;
    }

    p {
      font-size: 12px;
    }
  }
}
</style>
