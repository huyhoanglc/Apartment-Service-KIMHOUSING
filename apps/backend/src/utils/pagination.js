function parsePagination(query, { defaultPageSize = 20, maxPageSize = 100 } = {}) {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const pageSize = Math.min(maxPageSize, Math.max(1, parseInt(query.pageSize, 10) || defaultPageSize));
  return { page, pageSize };
}

function buildPageResult({ data, total, page, pageSize }) {
  return {
    data,
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

module.exports = { parsePagination, buildPageResult };
