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

module.exports = { upsert, findAllEmployeeCodes };
