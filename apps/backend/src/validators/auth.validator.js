const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(1, 'Tên không được để trống'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải từ 6 ký tự'),
  role: z.enum(['ADMIN', 'SALE', 'CUSTOMER']).optional(),
});

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(1, 'Mật khẩu không được để trống'),
});

const googleLoginSchema = z.object({
  accessToken: z.string().min(1, 'accessToken không được để trống'),
});

const forgotPasswordSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
});

const resetPasswordSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  otp: z.string().length(6, 'OTP phải gồm 6 chữ số'),
  newPassword: z.string().min(6, 'Mật khẩu mới phải từ 6 ký tự'),
});

module.exports = {
  registerSchema,
  loginSchema,
  googleLoginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
