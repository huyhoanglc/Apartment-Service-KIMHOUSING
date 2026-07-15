const prisma = require('../config/prisma');
const { buildPageResult } = require('../utils/pagination');

async function findAll({ search, position, employmentStatus, page, pageSize }) {
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

module.exports = { findAll, upsert, findAllEmployeeCodes, findByEmail };
