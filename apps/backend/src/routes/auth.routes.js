const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const { authenticate, requireRole } = require('../middlewares/auth.middleware');
const {
  forgotPasswordIpLimiter,
  forgotPasswordEmailLimiter,
  loginLimiter,
  resetPasswordIpLimiter,
  resetPasswordEmailLimiter,
} = require('../middlewares/rateLimiter.middleware');
const {
  registerSchema,
  loginSchema,
  googleLoginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require('../validators/auth.validator');

// Không có luồng tự đăng ký nào trong sản phẩm (khách hàng/sale vào bằng Google OAuth, tự
// tạo tài khoản role SALE - xem googleLogin). Endpoint này chỉ để ADMIN tạo tài khoản nội bộ
// thủ công khi cần, nên phải khoá lại - trước đây public + cho tự chọn role là lỗ hổng
// leo thang đặc quyền nghiêm trọng (ai cũng tự đăng ký được role ADMIN).
router.post('/register', authenticate, requireRole(['ADMIN']), validate(registerSchema), controller.register);
router.post('/login', loginLimiter, validate(loginSchema), controller.login);
router.post('/google', validate(googleLoginSchema), controller.googleLogin);
router.get('/me', authenticate, controller.me);
router.post(
  '/forgot-password',
  forgotPasswordIpLimiter,
  validate(forgotPasswordSchema),
  forgotPasswordEmailLimiter,
  controller.forgotPassword
);
router.post(
  '/reset-password',
  resetPasswordIpLimiter,
  validate(resetPasswordSchema),
  resetPasswordEmailLimiter,
  controller.resetPassword
);

module.exports = router;