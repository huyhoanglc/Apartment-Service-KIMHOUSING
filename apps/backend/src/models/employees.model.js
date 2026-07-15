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

// Danh sách Team Leader (dùng làm option cho filter "Team" - lọc nhân viên theo managerName)
async function findTeamLeaders() {
  return prisma.employee.findMany({
    where: { position: 'Team Leader' },
    select: { employeeCode: true, fullName: true },
    orderBy: { fullName: 'asc' },
  });
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

module.exports = { findAll, findTeamLeaders, upsert, findAllEmployeeCodes, findByEmail };
