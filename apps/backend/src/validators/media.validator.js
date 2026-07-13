const { z } = require('zod');

const uploadMediaSchema = z.object({
  roomId: z.string().min(1, 'roomId không được để trống'),
});

module.exports = { uploadMediaSchema };
