const prisma = require('../config/prisma');
const { buildPageResult } = require('../utils/pagination');

async function findAll({
  apartmentId,
  status,
  minPrice,
  maxPrice,
  roomType,
  district,
  apartmentType,
  featureId,
  page,
  pageSize,
}) {
  const where = {
    ...(apartmentId && { apartmentId }),
    ...(status && { status }),
    ...(roomType && { roomType }),
    ...((district || apartmentType) && {
      apartment: {
        ...(district && { district }),
        ...(apartmentType && { apartmentType }),
      },
    }),
    ...(featureId && { features: { some: { featureId } } }),
    ...(minPrice || maxPrice
      ? {
          publicPrice: {
            ...(minPrice && { gte: Number(minPrice) }),
            ...(maxPrice && { lte: Number(maxPrice) }),
          },
        }
      : {}),
  };

  const [data, total] = await Promise.all([
    prisma.room.findMany({
      where,
      include: {
        apartment: true,
        features: { include: { feature: true } },
        media: { orderBy: { order: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.room.count({ where }),
  ]);

  return buildPageResult({ data, total, page, pageSize });
}

async function findById(id) {
  return prisma.room.findUnique({
    where: { id },
    include: {
      apartment: true,
      features: { include: { feature: true } },
      media: { orderBy: { order: 'asc' } },
    },
  });
}

async function findBySlug(slug) {
  return prisma.room.findUnique({
    where: { slug },
    include: {
      apartment: true,
      features: { include: { feature: true } },
      media: { orderBy: { order: 'asc' } },
    },
  });
}

async function create(data) {
  const { featureIds, ...roomData } = data;

  return prisma.room.create({
    data: {
      ...roomData,
      features: featureIds
        ? { create: featureIds.map((featureId) => ({ featureId })) }
        : undefined,
    },
    include: {
      features: { include: { feature: true } },
    },
  });
}

async function update(id, data) {
  const { featureIds, ...roomData } = data;

  return prisma.room.update({
    where: { id },
    data: {
      ...roomData,
      ...(featureIds && {
        features: {
          deleteMany: {}, // xóa hết gán cũ
          create: featureIds.map((featureId) => ({ featureId })), // gán lại theo danh sách mới
        },
      }),
    },
    include: {
      features: { include: { feature: true } },
    },
  });
}

async function remove(id) {
  return prisma.room.delete({ where: { id } });
}

module.exports = { findAll, findById, findBySlug, create, update, remove };