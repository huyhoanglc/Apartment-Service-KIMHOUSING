const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const usersModel = require('../models/users.model');
const otpModel = require('../models/otp.model');
const { sendOtpEmail } = require('../config/email');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

async function register(req, res, next) {
  try {
    const { name, email, password, role } = req.body;

    const existing = await usersModel.findByEmail(email);
    if (existing) {
      return res.status(400).json({ message: 'Email đã được sử dụng' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await usersModel.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'SALE',
    });

    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await usersModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    const token = signToken(user);

    const { password: _, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword });
  } catch (err) {
    next(err);
  }
}

async function googleLogin(req, res, next) {
  try {
    const { idToken } = req.body;

    let payload;
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch {
      return res.status(401).json({ message: 'Token Google không hợp lệ' });
    }

    if (!payload.email_verified) {
      return res.status(401).json({ message: 'Email Google chưa được xác minh' });
    }

    let user = await usersModel.findByEmail(payload.email);
    if (!user) {
      // Chưa có tài khoản -> tự tạo mới với role SALE (quyết định nghiệp vụ: cho tự onboard,
      // đổi lại nếu cần siết quyền chỉ tài khoản có sẵn mới đăng nhập Google được)
      const randomPassword = crypto.randomBytes(32).toString('hex');
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      user = await usersModel.create({
        name: payload.name || payload.email,
        email: payload.email,
        password: hashedPassword,
        role: 'SALE',
      });
    }

    const token = signToken(user);

    const { password: _, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword });
  } catch (err) {
    next(err);
  }
}

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;

    const user = await usersModel.findByEmail(email);
    if (!user) {
      return res.json({ message: 'Nếu email tồn tại, mã OTP đã được gửi' });
    }

    const otp = generateOtp();
    await otpModel.create(email, otp);
    await sendOtpEmail(email, otp);

    res.json({ message: 'Nếu email tồn tại, mã OTP đã được gửi' });
  } catch (err) {
    next(err);
  }
}

async function resetPassword(req, res, next) {
  try {
    const { email, otp, newPassword } = req.body;

    const validOtp = await otpModel.findValidOtp(email, otp);
    if (!validOtp) {
      return res.status(400).json({ message: 'Mã OTP không đúng hoặc đã hết hạn' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await usersModel.updatePassword(email, hashedPassword);
    await otpModel.markUsed(validOtp.id);

    res.json({ message: 'Đặt lại mật khẩu thành công' });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, googleLogin, forgotPassword, resetPassword };