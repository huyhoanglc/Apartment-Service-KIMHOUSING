const prisma = require('../config/prisma');
const { buildPageResult } = require('../utils/pagination');

async function findAll({ district, apartmentType, page, pageSize }) {
  const where = {
    ...(district && { district }),
    ...(apartmentType && { apartmentType }),
  };

  const [data, total] = await Promise.all([
    prisma.apartment.findMany({
      where,
      include: {
        features: { include: { feature: true } },
        rooms: true,
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.apartment.count({ where }),
  ]);

  return buildPageResult({ data, total, page, pageSize });
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