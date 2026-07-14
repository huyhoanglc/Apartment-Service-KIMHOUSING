const { fail } = require('../utils/response');

// Middleware validate req[source] (mặc định 'body') bằng một Zod schema.
// Trả 422 kèm map lỗi theo field nếu không hợp lệ, thay vì để Prisma throw lỗi khó hiểu.
function validate(schema, source = 'body') {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const errors = {};
      for (const issue of result.error.issues) {
        const field = issue.path.join('.') || source;
        if (!errors[field]) errors[field] = issue.message;
      }
      return fail(res, 422, 'Dữ liệu không hợp lệ', errors);
    }

    req[source] = result.data;
    next();
  };
}

module.exports = validate;
