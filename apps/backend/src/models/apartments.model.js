const prisma = require('../config/prisma');
const { buildPageResult } = require('../utils/pagination');

const OVERDUE_DAYS = 3;
const OVERDUE_MS = OVERDUE_DAYS * 24 * 60 * 60 * 1000;

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

// Apartment do chính user đó tạo, kèm trạng thái "quá hạn 3 ngày chưa cập nhật phòng" - dùng
// cho tab "Nguồn Của Tôi".
async function findMine(userId, { page, pageSize }) {
  const where = { createdById: userId };

  const [data, total] = await Promise.all([
    prisma.apartment.findMany({
      where,
      include: { _count: { select: { rooms: true } } },
      orderBy: { lastActivityAt: 'asc' }, // cũ nhất (dễ quá hạn nhất) lên đầu
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.apartment.count({ where }),
  ]);

  const now = Date.now();
  const enriched = data.map((apartment) => {
    const dueAt = new Date(apartment.lastActivityAt.getTime() + OVERDUE_MS);
    return { ...apartment, dueAt, isOverdue: dueAt.getTime() < now };
  });

  return buildPageResult({ data: enriched, total, page, pageSize });
}

// Apartment đã quá hạn 3 ngày và chưa được gửi thông báo cho lần quá hạn này.
async function findOverdueUnnotified() {
  const threshold = new Date(Date.now() - OVERDUE_MS);
  return prisma.apartment.findMany({
    where: { lastActivityAt: { lt: threshold }, lastNotifiedAt: null },
  });
}

async function markNotified(id) {
  return prisma.apartment.update({ where: { id }, data: { lastNotifiedAt: new Date() } });
}

module.exports = { findAll, findById, create, update, remove, findMine, findOverdueUnnotified, markNotified };