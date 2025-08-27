// server.js
import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

const SECRET = "my-secret";

// 로그인 API
app.post("/api/login", (req, res) => {
  const { id, pw, keep } = req.body;

  // 1. 사용자 인증 (예: DB 확인)
  if (id !== "test" || pw !== "1234") {
    return res.json({ success: false });
  }

  // 2. 토큰 발급
  const accessToken = jwt.sign({ id }, SECRET, { expiresIn: "1h" }); // 1시간
  let refreshToken = null;

  if (keep) {
    refreshToken = jwt.sign({ id }, SECRET, { expiresIn: "30d" }); // 30일
  }

  res.json({
    success: true,
    accessToken,
    refreshToken,
  });
});

// 토큰 재발급 API
app.post("/api/refresh", (req, res) => {
  const { refreshToken } = req.body;
  try {
    const payload = jwt.verify(refreshToken, SECRET);
    const newAccessToken = jwt.sign({ id: payload.id }, SECRET, { expiresIn: "1h" });
    res.json({ success: true, accessToken: newAccessToken });
  } catch {
    res.status(401).json({ success: false, message: "토큰 만료" });
  }
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
