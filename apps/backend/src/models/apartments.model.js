const prisma = require('../config/prisma');

async function findAll({ district, apartmentType }) {
  return prisma.apartment.findMany({
    where: {
      ...(district && { district }),
      ...(apartmentType && { apartmentType }),
    },
    include: {
      features: { include: { feature: true } },
      rooms: true,
    },
  });
}

async function findById(id) {
  return prisma.apartment.findUnique({
    where: { id },
    include: {
      features: { include: { feature: true } },
      rooms: {
        include: {
          features: { include: { feature: true } },
          media: true,
        },
      },
    },
  });
}

async function create(data) {
  const { featureIds, ...apartmentData } = data;

  return prisma.apartment.create({
    data: {
      ...apartmentData,
      features: featureIds
        ? {
            create: featureIds.map((featureId) => ({ featureId })),
          }
        : undefined,
    },
    include: {
      features: { include: { feature: true } },
    },
  });
}

async function update(id, data) {
  return prisma.apartment.update({
    where: { id },
    data,
  });
}

async function remove(id) {
  return prisma.apartment.delete({ where: { id } });
}

module.exports = { findAll, findById, create, update, remove };