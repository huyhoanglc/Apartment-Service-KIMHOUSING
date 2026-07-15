const apartmentsModel = require('../models/apartments.model');
const usersModel = require('../models/users.model');
const notificationsModel = require('../models/notifications.model');

async function notifyOverdueApartments() {
  const overdue = await apartmentsModel.findOverdueUnnotified();
  if (overdue.length === 0) return { notified: 0 };

  const admins = await usersModel.findAdmins();

  for (const apartment of overdue) {
    const recipientIds = new Set([apartment.createdById, ...admins.map((a) => a.id)]);
    const message = `Căn hộ ${apartment.apartmentCode} (${apartment.houseNumber} ${apartment.street}, ${apartment.district}) đã quá 3 ngày chưa cập nhật trạng thái phòng.`;

    await notificationsModel.createMany(
      [...recipientIds].map((userId) => ({
        userId,
        type: 'APARTMENT_OVERDUE',
        message,
        apartmentId: apartment.id,
      }))
    );

    await apartmentsModel.markNotified(apartment.id);
  }

  return { notified: overdue.length };
}

module.exports = { notifyOverdueApartments };
