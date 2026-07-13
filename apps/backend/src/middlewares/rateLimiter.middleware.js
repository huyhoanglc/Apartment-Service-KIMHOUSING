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

module.exports = { forgotPasswordIpLimiter, forgotPasswordEmailLimiter };
