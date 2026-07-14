const employeeSyncService = require('../services/employeeSync.service');
const { ok, fail } = require('../utils/response');

async function syncEmployees(req, res, next) {
  try {
    const result = await employeeSyncService.runSync();
    ok(res, result, 'Đồng bộ nhân sự thành công');
  } catch (err) {
    if (err.code === 'SYNC_IN_PROGRESS') {
      return fail(res, 409, 'Đồng bộ nhân sự đang chạy, vui lòng thử lại sau');
    }
    next(err);
  }
}

module.exports = { syncEmployees };
