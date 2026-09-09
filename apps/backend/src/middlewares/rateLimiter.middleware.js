const rateLimit = require('express-rate-limit');

const WINDOW_MS = 15 * 60 * 1000; // 15 phút
const MAX_REQUESTS = 3;

function limitExceededHandler(req, res) {
  res.status(429).json({ message: 'Bạn đã yêu cầu quá nhiều lần, vui lòng thử lại sau 15 phút' });
}

// Chặn 1 IP spam nhiều email khác nhau
const forgotPasswordIpLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  handler: limitExceededHandler,
});

// Chặn 1 email bị spam OTP dù kẻ tấn công đổi IP liên tục
const forgotPasswordEmailLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.body.email,
  handler: limitExceededHandler,
});

// Chặn brute-force mật khẩu: 1 IP không được thử đăng nhập quá nhiều lần/15 phút.
// Giới hạn theo IP (không theo email) để tránh bị lợi dụng khoá tài khoản người khác
// (kẻ tấn công cố tình đăng nhập sai nhiều lần bằng email nạn nhân để tự DoS tài khoản đó).
const loginLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: limitExceededHandler,
});

// OTP reset-password chỉ có 6 chữ số (tối đa 1 triệu tổ hợp, hết hạn 5 phút) - nếu không giới
// hạn số lần thử thì brute-force được trong vài phút. Giới hạn theo email là chốt chặn chính
// (OTP gắn với email cụ thể); giới hạn theo IP là lớp phòng thủ thêm.
const resetPasswordIpLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: limitExceededHandler,
});

const resetPasswordEmailLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.body.email,
  handler: limitExceededHandler,
});

module.exports = {
  forgotPasswordIpLimiter,
  forgotPasswordEmailLimiter,
  loginLimiter,
  resetPasswordIpLimiter,
  resetPasswordEmailLimiter,
};
