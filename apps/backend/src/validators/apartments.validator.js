const { z } = require('zod');

const createApartmentSchema = z.object({
  houseNumber: z.string().min(1, 'Số nhà không được để trống'),
  street: z.string().min(1, 'Tên đường không được để trống'),
  district: z.string().min(1, 'Quận/huyện không được để trống'),
  buildingName: z.string().optional(),
  managerName: z.string().min(1, 'Tên quản lý không được để trống'),
  managerPhone: z.string().min(1, 'SĐT quản lý không được để trống'),
  accessType: z.enum(['STAIRS', 'ELEVATOR', 'BOTH']),
  apartmentType: z.enum(['APARTMENT', 'SERVICED_APARTMENT']).optional(),
  totalRooms: z.number().int('Tổng số phòng phải là số nguyên').positive('Tổng số phòng phải lớn hơn 0'),
  featureIds: z.array(z.string()).optional(),
});

const updateApartmentSchema = createApartmentSchema.partial();

module.exports = { createApartmentSchema, updateApartmentSchema };
