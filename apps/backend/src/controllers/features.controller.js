const featuresModel = require('../models/features.model');

async function getFeatures(req, res, next) {
  try {
    const features = await featuresModel.findAll();
    res.json(features);
  } catch (err) {
    next(err);
  }
}

async function createFeature(req, res, next) {
  try {
    const { name } = req.body;
    const feature = await featuresModel.create(name);
    res.status(201).json(feature);
  } catch (err) {
    next(err);
  }
}

async function updateFeature(req, res, next) {
  try {
    const { name } = req.body;
    const feature = await featuresModel.update(req.params.id, name);
    res.json(feature);
  } catch (err) {
    next(err);
  }
}

async function deleteFeature(req, res, next) {
  try {
    await featuresModel.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

// Gán/gỡ feature cho apartment
async function assignToApartment(req, res, next) {
  try {
    const { apartmentId, featureId } = req.body;
    const result = await featuresModel.assignToApartment(apartmentId, featureId);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function unassignFromApartment(req, res, next) {
  try {
    const { apartmentId, featureId } = req.body;
    await featuresModel.unassignFromApartment(apartmentId, featureId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

// Gán/gỡ feature cho room
async function assignToRoom(req, res, next) {
  try {
    const { roomId, featureId } = req.body;
    const result = await featuresModel.assignToRoom(roomId, featureId);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function unassignFromRoom(req, res, next) {
  try {
    const { roomId, featureId } = req.body;
    await featuresModel.unassignFromRoom(roomId, featureId);
    res.status(204).send();
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