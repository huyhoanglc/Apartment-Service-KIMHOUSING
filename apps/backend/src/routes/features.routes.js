const express = require('express');
const router = express.Router();
const controller = require('../controllers/features.controller');
const { authenticate, requireRole } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
  featureSchema,
  assignApartmentFeatureSchema,
  assignRoomFeatureSchema,
} = require('../validators/features.validator');

// Danh sách feature - public, để customer-web cũng hiển thị được filter theo tiện ích
router.get('/', controller.getFeatures);

// Quản lý feature - chỉ admin/sale
router.post('/', authenticate, requireRole(['ADMIN', 'SALE']), validate(featureSchema), controller.createFeature);
router.put('/:id', authenticate, requireRole(['ADMIN', 'SALE']), validate(featureSchema), controller.updateFeature);
router.delete('/:id', authenticate, requireRole(['ADMIN']), controller.deleteFeature);

// Gán/gỡ cho apartment
router.post(
  '/assign-apartment',
  authenticate,
  requireRole(['ADMIN', 'SALE']),
  validate(assignApartmentFeatureSchema),
  controller.assignToApartment
);
router.post(
  '/unassign-apartment',
  authenticate,
  requireRole(['ADMIN', 'SALE']),
  validate(assignApartmentFeatureSchema),
  controller.unassignFromApartment
);

// Gán/gỡ cho room
router.post(
  '/assign-room',
  authenticate,
  requireRole(['ADMIN', 'SALE']),
  validate(assignRoomFeatureSchema),
  controller.assignToRoom
);
router.post(
  '/unassign-room',
  authenticate,
  requireRole(['ADMIN', 'SALE']),
  validate(assignRoomFeatureSchema),
  controller.unassignFromRoom
);

module.exports = router;