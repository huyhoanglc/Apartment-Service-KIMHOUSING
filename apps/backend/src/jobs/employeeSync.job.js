const cron = require('node-cron');
const employeeSyncService = require('../services/employeeSync.service');

const SCHEDULE = process.env.EMPLOYEE_SYNC_CRON || '0 */6 * * *'; // mỗi 6 tiếng
const TIMEZONE = process.env.EMPLOYEE_SYNC_TIMEZONE || 'Asia/Ho_Chi_Minh';

function registerEmployeeSyncJob() {
  cron.schedule(
    SCHEDULE,
    async () => {
      try {
        await employeeSyncService.runSync();
      } catch (err) {
        console.error('[employeeSync.job] sync failed:', err);
      }
    },
    { timezone: TIMEZONE }
  );
  console.log(`[employeeSync.job] registered, schedule="${SCHEDULE}" tz="${TIMEZONE}"`);
}

module.exports = { registerEmployeeSyncJob };
