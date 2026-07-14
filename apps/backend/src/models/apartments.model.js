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

  // apartmentCode là field bắt buộc nên phải biết trước apartmentSeq trước khi create (không
  // thể create() thiếu rồi update() sau như autoincrement thông thường) -> lấy trực tiếp giá
  // trị tiếp theo của sequence Postgres đứng sau cột apartmentSeq.
  const [{ nextval }] = await prisma.$queryRaw`SELECT nextval('"apartments_apartmentSeq_seq"') AS nextval`;
  const apartmentSeq = Number(nextval);
  const apartmentCode = `A${String(apartmentSeq).padStart(6, '0')}`;

  return prisma.apartment.create({
    data: {
      ...apartmentData,
      apartmentSeq,
      apartmentCode,
      features: featureIds
        ? {
            create: featureIds.map((featureId) => ({ featureId })),
          }
        : undefined,
    },
    include: { features: { include: { feature: true } } },
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