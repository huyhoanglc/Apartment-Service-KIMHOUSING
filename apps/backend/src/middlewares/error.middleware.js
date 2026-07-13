const { Prisma } = require('@prisma/client');

// Middleware xử lý lỗi tập trung - đặt cuối cùng trong server.js, sau tất cả route.
// Mọi controller chỉ cần next(err), không tự res.status cho lỗi hạ tầng (Prisma, lỗi không lường trước).
function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const fields = Array.isArray(err.meta?.target) ? err.meta.target.join(', ') : err.meta?.target;
      return res.status(409).json({ message: `Dữ liệu bị trùng${fields ? ` (${fields})` : ''}` });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Không tìm thấy dữ liệu' });
    }
    if (err.code === 'P2003') {
      return res.status(400).json({ message: 'Dữ liệu tham chiếu không tồn tại' });
    }
    return res.status(400).json({ message: 'Yêu cầu không hợp lệ' });
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({ message: 'Dữ liệu gửi lên không hợp lệ' });
  }

  res.status(500).json({ message: 'Lỗi hệ thống, vui lòng thử lại sau' });
}

module.exports = errorHandler;
