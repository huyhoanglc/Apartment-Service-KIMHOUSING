const prisma = require('../config/prisma');
const { buildPageResult } = require('../utils/pagination');

async function findAll({ search, position, employmentStatus, managerName, page, pageSize }) {
  const where = {
    ...(search && {
      OR: [
        { employeeCode: { contains: search, mode: 'insensitive' } },
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ],
    }),
    ...(position && { position }),
    ...(employmentStatus && { employmentStatus }),
    ...(managerName && { managerName }),
  };

  const [data, total] = await Promise.all([
    prisma.employee.findMany({
      where,
      orderBy: { employeeCode: 'asc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.employee.count({ where }),
  ]);

  return buildPageResult({ data, total, page, pageSize });
}

// Danh sách "team" = các tên đang thực sự xuất hiện ở cột managerName của ai đó, không dựa vào
// position (vd K001 quản lý 4 người nhưng position của K001 lại đang để trống trên sheet).
async function findTeams() {
  const rows = await prisma.employee.findMany({
    where: { managerName: { not: null } },
    select: { managerName: true },
    distinct: ['managerName'],
    orderBy: { managerName: 'asc' },
  });
  return rows.map((r) => r.managerName);
}

async function upsert(employeeCode, data) {
  return prisma.employee.upsert({
    where: { employeeCode },
    create: { employeeCode, ...data },
    update: data,
  });
}

async function findAllEmployeeCodes() {
  const rows = await prisma.employee.findMany({ select: { employeeCode: true } });
  return new Set(rows.map((r) => r.employeeCode));
}

async function findByEmail(email) {
  return prisma.employee.findFirst({ where: { email } });
}

module.exports = { findAll, findTeams, upsert, findAllEmployeeCodes, findByEmail };
