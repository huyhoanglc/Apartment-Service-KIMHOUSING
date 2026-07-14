const prisma = require('../config/prisma');

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

module.exports = { upsert, findAllEmployeeCodes, findByEmail };
