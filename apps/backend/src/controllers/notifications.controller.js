const notificationsModel = require('../models/notifications.model');
const { parsePagination } = require('../utils/pagination');
const { ok, paginated, fail } = require('../utils/response');

async function list(req, res, next) {
  try {
    const { page, pageSize } = parsePagination(req.query);
    const result = await notificationsModel.findByUser(req.user.id, { page, pageSize });
    paginated(res, result);
  } catch (err) {
    next(err);
  }
}

async function unreadCount(req, res, next) {
  try {
    const count = await notificationsModel.countUnread(req.user.id);
    ok(res, { count });
  } catch (err) {
    next(err);
  }
}

async function markRead(req, res, next) {
  try {
    const result = await notificationsModel.markRead(req.params.id, req.user.id);
    if (result.count === 0) {
      return fail(res, 404, 'Notification not found');
    }
    ok(res, null);
  } catch (err) {
    next(err);
  }
}

async function markAllRead(req, res, next) {
  try {
    await notificationsModel.markAllRead(req.user.id);
    ok(res, null);
  } catch (err) {
    next(err);
  }
}

module.exports = { list, unreadCount, markRead, markAllRead };
