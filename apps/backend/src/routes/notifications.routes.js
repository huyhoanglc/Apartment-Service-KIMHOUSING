const express = require('express');
const router = express.Router();
const controller = require('../controllers/notifications.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/', authenticate, controller.list);
router.get('/unread-count', authenticate, controller.unreadCount);
router.patch('/read-all', authenticate, controller.markAllRead);
router.patch('/:id/read', authenticate, controller.markRead);

module.exports = router;
