const prisma = require('../config/prisma');

async function create({ roomId, url, publicId, type, order, cloudinaryFolder, sizeBytes }) {
  return prisma.media.create({
    data: {
      roomId,
      url,
      publicId,
      type,
      order: order || 0,
      cloudinaryFolder,
      sizeBytes,
    },
  });
}

async function findByRoom(roomId) {
  return prisma.media.findMany({
    where: { roomId },
    orderBy: { order: 'asc' },
  });
}

async function countByRoom(roomId) {
  return prisma.media.count({ where: { roomId } });
}

async function findById(id) {
  return prisma.media.findUnique({ where: { id } });
}

async function remove(id) {
  return prisma.media.delete({ where: { id } });
}

module.exports = { create, findByRoom, countByRoom, findById, remove };
