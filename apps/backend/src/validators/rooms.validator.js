const { z } = require('zod');

const createRoomSchema = z.object({
  apartmentId: z.string().min(1, 'apartmentId không được để trống'),
  code: z.string().min(1, 'Mã phòng không được để trống'),
  slug: z.string().min(1, 'Slug không được để trống'),
  roomType: z.enum(['DUPLEX', 'STUDIO', 'ONE_BEDROOM', 'TWO_BEDROOM', 'THREE_BEDROOM']),
  area: z.number('Diện tích phải là số').positive('Diện tích phải lớn hơn 0'),
  basePrice: z.number().int('Giá gốc phải là số nguyên').nonnegative('Giá gốc không được âm'),
  publicPrice: z.number().int('Giá công khai phải là số nguyên').nonnegative('Giá công khai không được âm'),
  status: z.enum(['AVAILABLE', 'ABOUT_TO_VACATE', 'RENTED', 'HIDDEN']).optional(),
  featureIds: z.array(z.string()).optional(),
});

const updateRoomSchema = createRoomSchema.partial();

module.exports = { createRoomSchema, updateRoomSchema };
