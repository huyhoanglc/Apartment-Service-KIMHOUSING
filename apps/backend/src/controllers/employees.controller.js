const employeeSyncService = require('../services/employeeSync.service');
const employeesModel = require('../models/employees.model');
const { parsePagination } = require('../utils/pagination');
const { ok, paginated, fail } = require('../utils/response');

async function listEmployees(req, res, next) {
  try {
    const { search, position, employmentStatus, managerName } = req.query;
    const { page, pageSize } = parsePagination(req.query);
    const result = await employeesModel.findAll({ search, position, employmentStatus, managerName, page, pageSize });
    paginated(res, result);
  } catch (err) {
    next(err);
  }
}

async function listTeams(req, res, next) {
  try {
    const teams = await employeesModel.findTeams();
    ok(res, teams);
  } catch (err) {
    next(err);
  }
}

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

module.exports = { listEmployees, listTeams, syncEmployees };
