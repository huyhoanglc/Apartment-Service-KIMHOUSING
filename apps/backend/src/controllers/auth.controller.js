const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/users.model');
const employeesModel = require('../models/employees.model');
const otpModel = require('../models/otp.model');
const { sendOtpEmail } = require('../config/email');
const { ok, created, fail } = require('../utils/response');

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
      return fail(res, 409, 'Email đã được sử dụng');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await usersModel.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'SALE',
    });

    const { password: _, ...userWithoutPassword } = user;
    created(res, userWithoutPassword, 'Đăng ký thành công');
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await usersModel.findByEmail(email);
    if (!user) {
      return fail(res, 401, 'Email hoặc mật khẩu không đúng');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return fail(res, 401, 'Email hoặc mật khẩu không đúng');
    }

    const token = signToken(user);

    const { password: _, ...userWithoutPassword } = user;
    ok(res, { token, user: userWithoutPassword }, 'Đăng nhập thành công');
  } catch (err) {
    next(err);
  }
}

async function googleLogin(req, res, next) {
  try {
    const { accessToken } = req.body;

    // access_token đến từ luồng OAuth phía browser (useGoogleLogin), không phải idToken,
    // nên phải tự verify qua endpoint tokeninfo của Google (check đúng aud = client app này)
    // thay vì google-auth-library's verifyIdToken.
    let tokenInfo;
    try {
      const tokenInfoRes = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?access_token=${encodeURIComponent(accessToken)}`
      );
      if (!tokenInfoRes.ok) throw new Error('tokeninfo request failed');
      tokenInfo = await tokenInfoRes.json();
    } catch {
      return fail(res, 401, 'Token Google không hợp lệ');
    }

    if (tokenInfo.aud !== process.env.GOOGLE_CLIENT_ID) {
      return fail(res, 401, 'Token Google không hợp lệ');
    }
    if (tokenInfo.email_verified !== 'true' && tokenInfo.email_verified !== true) {
      return fail(res, 401, 'Email Google chưa được xác minh');
    }

    // Chỉ lấy email + avatar từ Google. Họ tên tiếng Việt lấy từ Employee (đồng bộ từ Google
    // Sheet HR) vì tên Google trả về không theo đúng thứ tự Họ-Tên chuẩn Việt Nam.
    let profilePicture = null;
    try {
      const profileRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (profileRes.ok) {
        const profile = await profileRes.json();
        profilePicture = profile.picture || null;
      }
    } catch {
      // avatar chỉ để hiển thị, không chặn đăng nhập nếu lấy thất bại
    }

    const email = tokenInfo.email;
    const employee = await employeesModel.findByEmail(email);
    const resolvedName = employee?.fullName || email;

    let user = await usersModel.findByEmail(email);
    if (!user) {
      // Chưa có tài khoản -> tự tạo mới với role SALE (quyết định nghiệp vụ: cho tự onboard,
      // đổi lại nếu cần siết quyền chỉ tài khoản có sẵn mới đăng nhập Google được)
      const randomPassword = crypto.randomBytes(32).toString('hex');
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      user = await usersModel.create({
        name: resolvedName,
        email,
        password: hashedPassword,
        role: 'SALE',
        avatarUrl: profilePicture,
      });
    } else {
      const changes = {};
      if (profilePicture && profilePicture !== user.avatarUrl) changes.avatarUrl = profilePicture;
      if (employee?.fullName && employee.fullName !== user.name) changes.name = employee.fullName;
      if (Object.keys(changes).length > 0) {
        user = await usersModel.updateProfile(user.id, changes);
      }
    }

    const token = signToken(user);

    const { password: _, ...userWithoutPassword } = user;
    ok(res, { token, user: userWithoutPassword }, 'Đăng nhập thành công');
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
      return ok(res, null, 'Nếu email tồn tại, mã OTP đã được gửi');
    }

    const otp = generateOtp();
    await otpModel.create(email, otp);
    await sendOtpEmail(email, otp);

    ok(res, null, 'Nếu email tồn tại, mã OTP đã được gửi');
  } catch (err) {
    next(err);
  }
}

async function resetPassword(req, res, next) {
  try {
    const { email, otp, newPassword } = req.body;

    const validOtp = await otpModel.findValidOtp(email, otp);
    if (!validOtp) {
      return fail(res, 400, 'Mã OTP không đúng hoặc đã hết hạn');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await usersModel.updatePassword(email, hashedPassword);
    await otpModel.markUsed(validOtp.id);

    ok(res, null, 'Đặt lại mật khẩu thành công');
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, googleLogin, forgotPassword, resetPassword };