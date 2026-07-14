// Envelope JSON thống nhất cho toàn bộ API:
// success:   { success: true, message, data }
// paginated: { success: true, message, data, pagination: { page, limit, total, totalPages } }
// error:     { success: false, message, errors }

function ok(res, data = null, message = 'Success', status = 200) {
  return res.status(status).json({ success: true, message, data });
}

function created(res, data = null, message = 'Created') {
  return ok(res, data, message, 201);
}

function paginated(res, { data, page, pageSize, total, totalPages }, message = 'Success') {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination: { page, limit: pageSize, total, totalPages },
  });
}

function noContent(res) {
  return res.status(204).send();
}

function fail(res, status, message, errors = null) {
  return res.status(status).json({ success: false, message, errors });
}

module.exports = { ok, created, paginated, noContent, fail };
