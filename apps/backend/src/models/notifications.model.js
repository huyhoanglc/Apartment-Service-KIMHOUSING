const prisma = require('../config/prisma');
const { buildPageResult } = require('../utils/pagination');

async function createMany(rows) {
  return prisma.notification.createMany({ data: rows });
}

async function findByUser(userId, { page, pageSize }) {
  const where = { userId };

  const [data, total] = await Promise.all([
    prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.notification.count({ where }),
  ]);

  return buildPageResult({ data, total, page, pageSize });
}

async function countUnread(userId) {
  return prisma.notification.count({ where: { userId, isRead: false } });
}

async function markRead(id, userId) {
  return prisma.notification.updateMany({ where: { id, userId }, data: { isRead: true } });
}

async function markAllRead(userId) {
  return prisma.notification.updateMany({ where: { userId, isRead: false }, data: { isRead: true } });
}

module.exports = { createMany, findByUser, countUnread, markRead, markAllRead };
