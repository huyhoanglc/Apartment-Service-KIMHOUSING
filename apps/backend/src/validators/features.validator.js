const { z } = require('zod');

const featureSchema = z.object({
  name: z.string().min(1, 'Tên tiện ích không được để trống'),
});

const assignApartmentFeatureSchema = z.object({
  apartmentId: z.string().min(1, 'apartmentId không được để trống'),
  featureId: z.string().min(1, 'featureId không được để trống'),
});

const assignRoomFeatureSchema = z.object({
  roomId: z.string().min(1, 'roomId không được để trống'),
  featureId: z.string().min(1, 'featureId không được để trống'),
});

module.exports = { featureSchema, assignApartmentFeatureSchema, assignRoomFeatureSchema };
