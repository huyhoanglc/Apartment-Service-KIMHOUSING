// Middleware validate req[source] (mặc định 'body') bằng một Zod schema.
// Trả 400 kèm danh sách lỗi nếu không hợp lệ, thay vì để Prisma throw lỗi khó hiểu.
function validate(schema, source = 'body') {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      return res.status(400).json({
        message: 'Dữ liệu không hợp lệ',
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }

    req[source] = result.data;
    next();
  };
}

module.exports = validate;
