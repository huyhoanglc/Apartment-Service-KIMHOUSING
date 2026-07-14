const { Prisma } = require('@prisma/client');
const { fail } = require('../utils/response');

// Middleware xử lý lỗi tập trung - đặt cuối cùng trong server.js, sau tất cả route.
// Mọi controller chỉ cần next(err), không tự res.status cho lỗi hạ tầng (Prisma, lỗi không lường trước).
function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const fields = Array.isArray(err.meta?.target) ? err.meta.target.join(', ') : err.meta?.target;
      return fail(res, 409, `Dữ liệu bị trùng${fields ? ` (${fields})` : ''}`);
    }
    if (err.code === 'P2025') {
      return fail(res, 404, 'Không tìm thấy dữ liệu');
    }
    if (err.code === 'P2003') {
      return fail(res, 400, 'Dữ liệu tham chiếu không tồn tại');
    }
    return fail(res, 400, 'Yêu cầu không hợp lệ');
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return fail(res, 400, 'Dữ liệu gửi lên không hợp lệ');
  }

  fail(res, 500, 'Lỗi hệ thống, vui lòng thử lại sau');
}

module.exports = errorHandler;
