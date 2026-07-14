const roomsModel = require('../models/rooms.model');
const { parsePagination } = require('../utils/pagination');

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
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getRoomById(req, res, next) {
  try {
    const room = await roomsModel.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(hideBasePriceIfNeeded(room, req));
  } catch (err) {
    next(err);
  }
}

async function getRoomBySlug(req, res, next) {
  try {
    const room = await roomsModel.findBySlug(req.params.slug);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(hideBasePriceIfNeeded(room, req));
  } catch (err) {
    next(err);
  }
}

async function createRoom(req, res, next) {
  try {
    const room = await roomsModel.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    next(err);
  }
}

async function updateRoom(req, res, next) {
  try {
    const room = await roomsModel.update(req.params.id, req.body);
    res.json(room);
  } catch (err) {
    next(err);
  }
}

async function deleteRoom(req, res, next) {
  try {
    await roomsModel.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { getRooms, getRoomById, getRoomBySlug, createRoom, updateRoom, deleteRoom };