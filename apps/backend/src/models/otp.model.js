const prisma = require('../config/prisma');

async function create(email, code) {
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 phút
  return prisma.otpCode.create({ data: { email, code, expiresAt } });
}

async function findValidOtp(email, code) {
  return prisma.otpCode.findFirst({
    where: {
      email,
      code,
      used: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  });
}

async function markUsed(id) {
  return prisma.otpCode.update({ where: { id }, data: { used: true } });
}

module.exports = { create, findValidOtp, markUsed };