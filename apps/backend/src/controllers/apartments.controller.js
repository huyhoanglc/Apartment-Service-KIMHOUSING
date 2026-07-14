const apartmentsModel = require('../models/apartments.model');
const { parsePagination } = require('../utils/pagination');

async function getApartments(req, res, next) {
  try {
    const { district, apartmentType } = req.query;
    const { page, pageSize } = parsePagination(req.query);
    const result = await apartmentsModel.findAll({ district, apartmentType, page, pageSize });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getApartmentById(req, res, next) {
  try {
    const apartment = await apartmentsModel.findById(req.params.id);
    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }
    res.json(apartment);
  } catch (err) {
    next(err);
  }
}

async function createApartment(req, res, next) {
  try {
    const apartment = await apartmentsModel.create({
      ...req.body,
      createdById: req.user.id, // sẽ có sau khi làm module auth
    });
    res.status(201).json(apartment);
  } catch (err) {
    next(err);
  }
}

async function updateApartment(req, res, next) {
  try {
    const apartment = await apartmentsModel.update(req.params.id, req.body);
    res.json(apartment);
  } catch (err) {
    next(err);
  }
}

async function deleteApartment(req, res, next) {
  try {
    await apartmentsModel.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getApartments,
  getApartmentById,
  createApartment,
  updateApartment,
  deleteApartment,
};