const cron = require('node-cron');
const notifyService = require('../services/notify.service');

const SCHEDULE = process.env.APARTMENT_OVERDUE_CRON || '0 * * * *'; // mỗi giờ
const TIMEZONE = process.env.EMPLOYEE_SYNC_TIMEZONE || 'Asia/Ho_Chi_Minh';

function registerApartmentOverdueJob() {
  cron.schedule(
    SCHEDULE,
    async () => {
      try {
        await notifyService.notifyOverdueApartments();
      } catch (err) {
        console.error('[apartmentOverdue.job] sweep failed:', err);
      }
    },
    { timezone: TIMEZONE }
  );
  console.log(`[apartmentOverdue.job] registered, schedule="${SCHEDULE}" tz="${TIMEZONE}"`);
}

module.exports = { registerApartmentOverdueJob };
