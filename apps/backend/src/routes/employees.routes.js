const express = require('express');
const router = express.Router();
const controller = require('../controllers/employees.controller');
const { authenticate, requireRole } = require('../middlewares/auth.middleware');

router.get('/', authenticate, requireRole(['ADMIN']), controller.listEmployees);
router.get('/teams', authenticate, requireRole(['ADMIN']), controller.listTeamLeaders);
router.post('/sync', authenticate, requireRole(['ADMIN']), controller.syncEmployees);

module.exports = router;
