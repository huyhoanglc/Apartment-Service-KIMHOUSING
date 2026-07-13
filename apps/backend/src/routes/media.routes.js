const express = require('express');
const router = express.Router();
const controller = require('../controllers/media.controller');
const upload = require('../config/upload');
const { authenticate, requireRole } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { uploadMediaSchema } = require('../validators/media.validator');

router.get('/room/:roomId', controller.getMediaByRoom); // public

router.post(
  '/upload',
  authenticate,
  requireRole(['ADMIN', 'SALE']),
  upload.array('files', 20), // tối đa 20 file/lần upload
  validate(uploadMediaSchema), // chạy sau upload.array vì roomId nằm trong form-data
  controller.uploadMedia
);

router.delete('/:id', authenticate, requireRole(['ADMIN', 'SALE']), controller.deleteMedia);

module.exports = router;