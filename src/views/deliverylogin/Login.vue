<script setup>
import { useAuthStore } from "@/stores/auth";

import { ref } from "vue";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();
const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
const role = ref("customer");
const formData = ref({
  email: "",
  password: "",
  role: role.value,
  rememberMe: false,
});
const handleLogin = () => {
  // 1.로컬스토리지레서 사용자 데이터 가져오기
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  // 2.입력된 이메일과 비밀번호로 사용자 찾기
  // find메서드를 이용하여 일치하는 사용자 검색
  // 이메일과 비밀번호가 모두 일치해야 함
  const user = users.find(
    (u) =>
      u.email === formData.value.email &&
      u.password === formData.value.password &&
      u.role === formData.value.role
  );
  // 3.로그인 성공 // 실패 처리
  // if (user) {
  //   // 3-1.로그인 성공시
  //   authStore.login({
  //     email: user.email, // 사용자 이메일
  //     name: user.name, // 사용자 이름
  //     phone: user.phone,
  //     address: user.address,
  //     detailAddress: user.detailAddress,
  //     createdAt: user.createdAt,
  //   });
  //   router.push("/");
  // } else {
  //   alert("이메일 또는 비밀번호가 일치하기 않습니다.");
  // }
  if (user) {
    authStore.login(user);
    if (user.role === "worker") {
      router.push("/worker");
    } else {
      router.push("/");
    }
  } else {
    alert("이메일 또는 비밀번호가 일치하기 않습니다.");
  }
};
</script>

<template>
  <div class="wrap_total">
    <div class="login-container">
      <div class="login-box">
        <div class="loginImg">
          <img src="/images/yr/loginpage/newLogo.png" alt="" />
        </div>

        <!-- 유형 선택 아이콘 -->
        <div class="form-group">
          <!-- <label>유형</label> -->
          <div class="role-options">
            <!-- <p>여행의 시작은 가방도와 함께</p> -->
            <button
              type="button"
              :class="{ active: formData.role === 'customer' }"
              @click="formData.role = 'customer'">
              <img src="/images/yr/loginpage/owner.png" alt="고객" />
              <!-- <span>고객</span>  -->
            </button>

            <button
              type="button"
              :class="{ active: formData.role === 'worker' }"
              @click="formData.role = 'worker'">
              <img src="/images/yr/loginpage/deliveryman.png" alt="기사" />
              <!-- <span>기사</span> -->
            </button>
          </div>
        </div>
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <!-- <label for="email">이메일</label> -->
            <input
              type="email"
              id="email"
              name="email"
              v-model="formData.email"
              placeholder="이메일을 입력하세요"
              autocomplete="username"
              required />
          </div>

          <div class="form-group">
            <!-- <label for="password">비밀번호</label> -->
            <div class="password-input">
              <input
                id="password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="formData.password"
                placeholder="비밀번호를 입력하세요"
                autocomplete="current-password"
                required />
              <button
                @click="togglePassword"
                type="button"
                class="toggle-password">
                <img
                  :src="
                    showPassword
                      ? '/images/yr/loginpage/eye-off.png'
                      : '/images/yr/loginpage/eye.png'
                  "
                  alt="비밀번호 보기 토글"
                  class="eye-icon" />
              </button>
            </div>
          </div>

          <!-- 유형추가 고객 / 기사
        <div class="form-group">
          <label for="role">유형</label>
          <select id="role" v-model="formData.role" required>
            <option value="customer">고객</option>
            <option value="worker">기사</option>
          </select>
        </div> -->

          <!-- <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" />
            <span>로그인 상태 유지</span>
          </label>
          <router-link to="/find-password" class="find-password">
            비밀번호 찾기
          </router-link>
        </div> -->

          <button type="submit" class="login-btn">로그인</button>
        </form>

        <div class="signup-link">
          아직 회원이 아니신가요?
          <router-link to="/signup">회원가입</router-link>
        </div>
      </div>
      <div class="bb_sns-login">
        <div class="bb_grayline"></div>
        <p>간편 로그인</p>
        <div class="bb_grayline"></div>
      </div>
      <div class="bb_sns-icons">
        <a
          href="https://accounts.kakao.com/login/?continue=https%3A%2F%2Faccounts.kakao.com%2Fweblogin%2Faccount#login"
          ><img src="/images/yr/loginpage/loginKT.png" alt="깨톡"
        /></a>
        <a
          href="https://nid.naver.com/nidlogin.login?mode=form&url=https://www.naver.com/"
          ><img src="/images/yr/loginpage/loginN.png" alt="네이버"
        /></a>

        <a
          href="https://accounts.google.com/InteractiveLogin/signinchooser?continue=https%3A%2F%2Ftakeout.google.com%2F%3Fhl%3Dko&followup=https%3A%2F%2Ftakeout.google.com%2F%3Fhl%3Dko&hl=ko&osid=1&passive=1209600&ifkv=AXH0vVudToPB1oXfNyrRstCJ2S8_6MGsxrjKMEimiqpbXowYURSOX1dz9tFsLIFhTsRW8skj6ngVQw&ddm=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
          ><img src="/images/yr/loginpage/loginG.png" alt="구글"
        /></a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "/src/assets/Main.scss" as *;
@use "/src/assets/Variables.scss" as *;

.login {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  background: white;
  border-radius: 8px;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
  .loginImg {
    img {
      width: 30%;
      margin-bottom: 10px;
    }
  }
  p {
    color: #a5a5a5;
    font-weight: bold;
    margin-bottom: 20px;
  }
}

.form-group {
  margin-bottom: 12px;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #279bf3;
  font-weight: 500;
}

input,
select {
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 15px;
  border: 1px solid $border-gray;
  border-radius: $radius;
  box-sizing: border-box;
  color: $dark-gray;
  &:focus {
    outline: 3px solid $blue-sky;
    outline-offset: -2px;
  }
}

.password-input {
  position: relative;
  input {
    width: 100%;
    height: 40px;
    padding: 10px;
    font-size: 15px;
    border: 1px solid $border-gray;
    border-radius: $radius;
    box-sizing: border-box;
    color: $dark-gray;
    &:focus {
      outline: 3px solid $blue-sky;
      outline-offset: -2px;
    }
  }
  .toggle-password {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #888888;
    cursor: pointer;
    font-size: 20px;
  }
  .eye-icon {
    display: block;
    width: 20px;
    height: auto;
    opacity: 0.5;
    &:hover {
      opacity: 0.7;
    }
  }
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.remember-me input[type="checkbox"] {
  width: auto;
}

.find-password {
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
}

.find-password:hover {
  color: #333;
}

.login-btn {
  width: 100%;
  padding: 10px;
  background: #279bf3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 1.5rem;
}

// .login-btn:hover {
//   background: #45a049;
// }

.social-login {
  text-align: center;
  margin-bottom: 1.5rem;
}

.social-login p {
  color: #666;
  margin-bottom: 1rem;
  position: relative;
}

.social-login p::before,
.social-login p::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 30%;
  height: 1px;
  background: #ddd;
}

.social-login p::before {
  left: 0;
}

.social-login p::after {
  right: 0;
}

.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.social-btn img {
  width: 20px;
  height: 20px;
}

.social-btn.google:hover {
  background: #f5f5f5;
}

.social-btn.kakao {
  background: #fee500;
  border-color: #fee500;
}

.social-btn.kakao:hover {
  background: #ffe812;
}

.signup-link {
  text-align: center;
  color: #666;
}

.signup-link a {
  color: #279bf3;
  text-decoration: none;
  font-weight: 500;
  margin-left: 0.5rem;
}

.signup-link a:hover {
  text-decoration: underline;
}
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

  p {
    white-space: nowrap; // 텍스트 줄바꿈 방지
    color: #279bf3;
    font-size: 14px;
    font-weight: bold;
  }
}
.bb_sns-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20%;

  a {
    width: 13%;
    height: 13%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.role-options {
  display: flex;
  justify-content: flex-end;
  gap: 7px;
}

.role-options button {
  background: none;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 7px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2s ease;
}

.role-options button.active {
  border-color: #007bff;
  background-color: #eef6ff;
}

.role-options img {
  width: 20px;
  height: 20px;
  margin-bottom: 5px;
}

@media (max-width: 480px) {
  .login {
    padding: 1rem;
  }

  .login-container {
    padding: 1.5rem;
  }
}

.social-icon {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
