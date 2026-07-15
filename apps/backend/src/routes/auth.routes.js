const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const { authenticate } = require('../middlewares/auth.middleware');
const { forgotPasswordIpLimiter, forgotPasswordEmailLimiter } = require('../middlewares/rateLimiter.middleware');
const {
  registerSchema,
  loginSchema,
  googleLoginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require('../validators/auth.validator');

router.post('/register', validate(registerSchema), controller.register);
router.post('/login', validate(loginSchema), controller.login);
router.post('/google', validate(googleLoginSchema), controller.googleLogin);
router.get('/me', authenticate, controller.me);
router.post(
  '/forgot-password',
  forgotPasswordIpLimiter,
  validate(forgotPasswordSchema),
  forgotPasswordEmailLimiter,
  controller.forgotPassword
);
router.post('/reset-password', validate(resetPasswordSchema), controller.resetPassword);

module.exports = router;