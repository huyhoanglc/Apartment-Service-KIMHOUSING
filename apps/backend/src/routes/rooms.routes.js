const express = require('express');
const router = express.Router();
const controller = require('../controllers/rooms.controller');
const { authenticate, optionalAuthenticate, requireRole } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { createRoomSchema, updateRoomSchema } = require('../validators/rooms.validator');

router.get('/', optionalAuthenticate, controller.getRooms);
router.get('/slug/:slug', optionalAuthenticate, controller.getRoomBySlug);
router.get('/:id', optionalAuthenticate, controller.getRoomById);

router.post(
  '/',
  authenticate,
  requireRole(['ADMIN', 'SALE']),
  validate(createRoomSchema),
  controller.createRoom
);
router.put(
  '/:id',
  authenticate,
  requireRole(['ADMIN', 'SALE']),
  validate(updateRoomSchema),
  controller.updateRoom
);
router.delete('/:id', authenticate, requireRole(['ADMIN']), controller.deleteRoom);

module.exports = router;