const jwt = require('jsonwebtoken');
const { fail } = require('../utils/response');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return fail(res, 401, 'Chưa đăng nhập');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return fail(res, 401, 'Token không hợp lệ hoặc đã hết hạn');
  }
}

// Middleware mới: có token thì decode, không có thì bỏ qua, KHÔNG bắt buộc
function optionalAuthenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // token sai/hết hạn -> coi như khách vãng lai, không chặn request
      req.user = null;
    }
  }
  next();
}

function requireRole(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return fail(res, 403, 'Không có quyền truy cập');
    }
    next();
  };
}

module.exports = { authenticate, optionalAuthenticate, requireRole };