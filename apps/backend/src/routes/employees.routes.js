const express = require('express');
const router = express.Router();
const controller = require('../controllers/employees.controller');
const { authenticate, requireRole } = require('../middlewares/auth.middleware');

router.get('/', authenticate, requireRole(['ADMIN']), controller.listEmployees);
router.post('/sync', authenticate, requireRole(['ADMIN']), controller.syncEmployees);

module.exports = router;
