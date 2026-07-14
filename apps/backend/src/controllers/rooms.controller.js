const roomsModel = require('../models/rooms.model');
const { parsePagination } = require('../utils/pagination');
const { ok, created, paginated, noContent, fail } = require('../utils/response');

function hideBasePriceIfNeeded(room, req) {
  const isInternal = req.user && ['ADMIN', 'SALE'].includes(req.user.role);
  if (isInternal) return room;

  const { basePrice, ...rest } = room;
  return rest;
}

async function getRooms(req, res, next) {
  try {
    const { apartmentId, status, minPrice, maxPrice, roomType, district, apartmentType, featureId } = req.query;
    const { page, pageSize } = parsePagination(req.query);
    const result = await roomsModel.findAll({
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
    });

    result.data = result.data.map((room) => hideBasePriceIfNeeded(room, req));
    paginated(res, result);
  } catch (err) {
    next(err);
  }
}

async function getRoomById(req, res, next) {
  try {
    const room = await roomsModel.findById(req.params.id);
    if (!room) {
      return fail(res, 404, 'Room not found');
    }
    ok(res, hideBasePriceIfNeeded(room, req));
  } catch (err) {
    next(err);
  }
}

async function getRoomBySlug(req, res, next) {
  try {
    const room = await roomsModel.findBySlug(req.params.slug);
    if (!room) {
      return fail(res, 404, 'Room not found');
    }
    ok(res, hideBasePriceIfNeeded(room, req));
  } catch (err) {
    next(err);
  }
}

async function createRoom(req, res, next) {
  try {
    const room = await roomsModel.create(req.body);
    created(res, room);
  } catch (err) {
    next(err);
  }
}

async function updateRoom(req, res, next) {
  try {
    const room = await roomsModel.update(req.params.id, req.body);
    ok(res, room);
  } catch (err) {
    next(err);
  }
}

async function deleteRoom(req, res, next) {
  try {
    await roomsModel.remove(req.params.id);
    noContent(res);
  } catch (err) {
    next(err);
  }
}

module.exports = { getRooms, getRoomById, getRoomBySlug, createRoom, updateRoom, deleteRoom };