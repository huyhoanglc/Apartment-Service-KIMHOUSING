const sheets = require('../config/googleSheets');
const employeesModel = require('../models/employees.model');

const SHEET_TAB = 'Nhân Sự Kinh Doanh';
const RANGE = `'${SHEET_TAB}'!A:Z`;

// Tên cột trong Sheet (đúng nguyên văn) -> field của Employee. Map theo tên, không theo index,
// để HR thêm/đổi vị trí cột không làm vỡ sync.
const HEADER_MAP = {
  'MÃ NHÂN VIÊN': 'employeeCode',
  'HỌ VÀ TÊN': 'fullName',
  EMAIL: 'email',
  'NGÀY THÁNG NĂM SINH': 'dateOfBirth',
  'SĐT CÁ NHÂN': 'phone',
  'VỊ TRÍ LÀM VIỆC': 'position',
  'NGÀY BẮT ĐẦU LÀM VIỆC': 'startDate',
  'NGƯỜI QUẢN LÝ TRỰC TIẾP': 'managerName',
  'HÌNH THỨC LÀM VIỆC': 'employmentType',
  'STK NGÂN HÀNG': 'bankAccountNumber',
  'TÊN NGÂN HÀNG': 'bankName',
  'MỨC LƯƠNG/ HỆ SỐ LƯƠNG': 'salaryInfo',
  'TÌNH TRẠNG HOẠT ĐỘNG': 'employmentStatus',
};

const DATE_FIELDS = new Set(['dateOfBirth', 'startDate']);

let isSyncing = false;

function parseDdMmYyyy(str) {
  if (!str) return null;
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(str.trim());
  if (!m) return null;
  const [, d, mo, y] = m;
  const date = new Date(Date.UTC(Number(y), Number(mo) - 1, Number(d)));
  return Number.isNaN(date.getTime()) ? null : date;
}

function buildFieldIndex(headerRow) {
  const index = {};
  headerRow.forEach((raw, i) => {
    const field = HEADER_MAP[String(raw || '').trim()];
    if (field) index[field] = i;
  });
  return index;
}

function rowToRecord(row, fieldIndex) {
  const record = {};
  for (const [field, colIdx] of Object.entries(fieldIndex)) {
    const raw = row[colIdx];
    const value = raw === undefined || raw === null ? '' : String(raw).trim();
    record[field] = value === '' ? null : value;
  }
  return record;
}

function isBlankRow(record) {
  return Object.values(record).every((v) => v === null);
}

async function runSync() {
  if (isSyncing) {
    const err = new Error('Employee sync already in progress');
    err.code = 'SYNC_IN_PROGRESS';
    throw err;
  }
  isSyncing = true;

  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: RANGE,
      // Giữ nguyên định dạng hiển thị (không cast số) để không mất số 0 đầu ở SĐT/STK ngân hàng
      valueRenderOption: 'FORMATTED_VALUE',
    });

    const rows = res.data.values || [];
    if (rows.length < 2) {
      console.log('[employeeSync] total=0 created=0 updated=0 skipped=0 (no data rows)');
      return { totalRows: 0, created: 0, updated: 0, skipped: 0 };
    }

    const [headerRow, ...dataRows] = rows;
    const fieldIndex = buildFieldIndex(headerRow);
    const existingCodes = await employeesModel.findAllEmployeeCodes();

    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (let i = 0; i < dataRows.length; i++) {
      const rowNumber = i + 2; // +2: bù dòng header và index 0-based
      const record = rowToRecord(dataRows[i], fieldIndex);

      if (isBlankRow(record)) {
        skipped++;
        continue;
      }

      const employeeCode = record.employeeCode;
      if (!employeeCode) {
        skipped++;
        console.warn(`[employeeSync] row ${rowNumber} skipped: missing MÃ NHÂN VIÊN`);
        continue;
      }

      const data = { ...record };
      delete data.employeeCode;
      for (const field of DATE_FIELDS) {
        const raw = record[field];
        const parsed = parseDdMmYyyy(raw);
        if (raw && !parsed) {
          console.warn(
            `[employeeSync] row ${rowNumber} (${employeeCode}): unparseable ${field} "${raw}", storing null`
          );
        }
        data[field] = parsed;
      }

      try {
        await employeesModel.upsert(employeeCode, data);
        if (existingCodes.has(employeeCode)) {
          updated++;
        } else {
          created++;
          existingCodes.add(employeeCode);
        }
      } catch (err) {
        skipped++;
        console.warn(`[employeeSync] row ${rowNumber} (${employeeCode}) failed, skipping: ${err.message}`);
      }
    }

    const totalRows = dataRows.length;
    console.log(`[employeeSync] total=${totalRows} created=${created} updated=${updated} skipped=${skipped}`);
    return { totalRows, created, updated, skipped };
  } finally {
    isSyncing = false;
  }
}

module.exports = { runSync };
