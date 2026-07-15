const express = require('express');
const router = express.Router();
const controller = require('../controllers/apartments.controller');
const { authenticate, requireRole } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { createApartmentSchema, updateApartmentSchema } = require('../validators/apartments.validator');

router.get('/', controller.getApartments); // public - customer xem được
router.get('/mine', authenticate, requireRole(['ADMIN', 'SALE']), controller.getMyApartments); // trước /:id để không bị nuốt path
router.get('/:id', controller.getApartmentById); // public

router.post(
  '/',
  authenticate,
  requireRole(['ADMIN', 'SALE']),
  validate(createApartmentSchema),
  controller.createApartment
);
router.put(
  '/:id',
  authenticate,
  requireRole(['ADMIN', 'SALE']),
  validate(updateApartmentSchema),
  controller.updateApartment
);
router.delete('/:id', authenticate, requireRole(['ADMIN']), controller.deleteApartment);

module.exports = router;