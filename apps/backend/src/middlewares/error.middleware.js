const { Prisma } = require('@prisma/client');
const { fail } = require('../utils/response');

// Middleware xử lý lỗi tập trung - đặt cuối cùng trong server.js, sau tất cả route.
// Mọi controller chỉ cần next(err), không tự res.status cho lỗi hạ tầng (Prisma, lỗi không lường trước).
function errorHandler(err, req, res, next) {
  console.error(err);

  // Lỗi tự throw từ middleware ngoài luồng Express bình thường (vd upload.js khi thiếu
  // roomId) mang sẵn err.status - trả đúng status thay vì rơi xuống 500 mặc định.
  if (err.status) {
    return fail(res, err.status, err.message);
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const target = err.meta?.target;
      const fields = Array.isArray(target) ? target : typeof target === 'string' ? [target] : [];
      if (fields.includes('code') && fields.includes('apartmentId')) {
        return fail(res, 409, 'Mã phòng đã tồn tại trong tòa nhà này');
      }
      if (fields.includes('apartmentCode')) {
        return fail(res, 409, 'Mã căn hộ đã tồn tại');
      }
      return fail(res, 409, `Dữ liệu bị trùng${fields.length ? ` (${fields.join(', ')})` : ''}`);
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
