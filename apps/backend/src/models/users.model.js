const prisma = require('../config/prisma');

async function findByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

async function findById(id) {
  return prisma.user.findUnique({ where: { id } });
}

async function create({ name, email, password, role }) {
  return prisma.user.create({
    data: { name, email, password, role },
  });
}

async function updatePassword(email, hashedPassword) {
  return prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });
}

module.exports = { findByEmail, findById, create, updatePassword };
