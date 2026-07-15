const prisma = require('../config/prisma');

async function findByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

async function findById(id) {
  return prisma.user.findUnique({ where: { id } });
}

async function create({ name, email, password, role, avatarUrl }) {
  return prisma.user.create({
    data: { name, email, password, role, avatarUrl },
  });
}

async function updatePassword(email, hashedPassword) {
  return prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });
}

async function updateProfile(id, data) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

async function findAdmins() {
  return prisma.user.findMany({ where: { role: 'ADMIN' } });
}

module.exports = { findByEmail, findById, create, updatePassword, updateProfile, findAdmins };
