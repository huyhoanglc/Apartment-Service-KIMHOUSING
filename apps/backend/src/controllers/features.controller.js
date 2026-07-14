const featuresModel = require('../models/features.model');
const { ok, created, noContent } = require('../utils/response');

async function getFeatures(req, res, next) {
  try {
    const features = await featuresModel.findAll();
    ok(res, features);
  } catch (err) {
    next(err);
  }
}

async function createFeature(req, res, next) {
  try {
    const { name } = req.body;
    const feature = await featuresModel.create(name);
    created(res, feature);
  } catch (err) {
    next(err);
  }
}

async function updateFeature(req, res, next) {
  try {
    const { name } = req.body;
    const feature = await featuresModel.update(req.params.id, name);
    ok(res, feature);
  } catch (err) {
    next(err);
  }
}

async function deleteFeature(req, res, next) {
  try {
    await featuresModel.remove(req.params.id);
    noContent(res);
  } catch (err) {
    next(err);
  }
}

// Gán/gỡ feature cho apartment
async function assignToApartment(req, res, next) {
  try {
    const { apartmentId, featureId } = req.body;
    const result = await featuresModel.assignToApartment(apartmentId, featureId);
    created(res, result);
  } catch (err) {
    next(err);
  }
}

async function unassignFromApartment(req, res, next) {
  try {
    const { apartmentId, featureId } = req.body;
    await featuresModel.unassignFromApartment(apartmentId, featureId);
    noContent(res);
  } catch (err) {
    next(err);
  }
}

// Gán/gỡ feature cho room
async function assignToRoom(req, res, next) {
  try {
    const { roomId, featureId } = req.body;
    const result = await featuresModel.assignToRoom(roomId, featureId);
    created(res, result);
  } catch (err) {
    next(err);
  }
}

async function unassignFromRoom(req, res, next) {
  try {
    const { roomId, featureId } = req.body;
    await featuresModel.unassignFromRoom(roomId, featureId);
    noContent(res);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getFeatures,
  createFeature,
  updateFeature,
  deleteFeature,
  assignToApartment,
  unassignFromApartment,
  assignToRoom,
  unassignFromRoom,
};