const apartmentsModel = require('../models/apartments.model');
const { parsePagination } = require('../utils/pagination');
const { ok, created, paginated, noContent, fail } = require('../utils/response');

async function getApartments(req, res, next) {
  try {
    const { district, apartmentType } = req.query;
    const { page, pageSize } = parsePagination(req.query);
    const result = await apartmentsModel.findAll({ district, apartmentType, page, pageSize });
    paginated(res, result);
  } catch (err) {
    next(err);
  }
}

async function getApartmentById(req, res, next) {
  try {
    const apartment = await apartmentsModel.findById(req.params.id);
    if (!apartment) {
      return fail(res, 404, 'Apartment not found');
    }
    ok(res, apartment);
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
    created(res, apartment);
  } catch (err) {
    next(err);
  }
}

async function updateApartment(req, res, next) {
  try {
    const apartment = await apartmentsModel.update(req.params.id, req.body);
    ok(res, apartment);
  } catch (err) {
    next(err);
  }
}

async function deleteApartment(req, res, next) {
  try {
    await apartmentsModel.remove(req.params.id);
    noContent(res);
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