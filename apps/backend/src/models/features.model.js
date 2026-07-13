const prisma = require('../config/prisma');

async function findAll() {
  return prisma.feature.findMany({ orderBy: { name: 'asc' } });
}

async function findById(id) {
  return prisma.feature.findUnique({ where: { id } });
}

async function create(name) {
  return prisma.feature.create({ data: { name } });
}

async function update(id, name) {
  return prisma.feature.update({ where: { id }, data: { name } });
}

async function remove(id) {
  return prisma.feature.delete({ where: { id } });
}

// Gán feature cho apartment
async function assignToApartment(apartmentId, featureId) {
  return prisma.apartmentFeature.create({
    data: { apartmentId, featureId },
  });
}

async function unassignFromApartment(apartmentId, featureId) {
  return prisma.apartmentFeature.delete({
    where: { apartmentId_featureId: { apartmentId, featureId } },
  });
}

// Gán feature cho room
async function assignToRoom(roomId, featureId) {
  return prisma.roomFeature.create({
    data: { roomId, featureId },
  });
}

async function unassignFromRoom(roomId, featureId) {
  return prisma.roomFeature.delete({
    where: { roomId_featureId: { roomId, featureId } },
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
  assignToApartment,
  unassignFromApartment,
  assignToRoom,
  unassignFromRoom,
};