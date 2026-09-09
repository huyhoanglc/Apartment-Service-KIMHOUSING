require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(helmet());

// CORS_ORIGIN: danh sách domain FE thật (phân tách bằng dấu phẩy), vd:
// "https://admin.kimhousing.vn,https://kimhousing.vn". Để trống thì mở cho mọi origin
// (giữ hành vi cũ) - nên set khi lên production để tránh domain lạ gọi thẳng API.
const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors(
    allowedOrigins.length > 0
      ? {
          origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
            callback(new Error('Origin không được phép truy cập API này'));
          },
        }
      : undefined
  )
);
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));


app.use('/api/apartments', require('./routes/apartments.routes'));
app.use('/api/rooms', require('./routes/rooms.routes'));
app.use('/api/features', require('./routes/features.routes'));
app.use('/api/media', require('./routes/media.routes'));
app.use('/api/employees', require('./routes/employees.routes'));
app.use('/api/notifications', require('./routes/notifications.routes'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use(require('./middlewares/error.middleware'));

require('./jobs/employeeSync.job').registerEmployeeSyncJob();
require('./jobs/apartmentOverdue.job').registerApartmentOverdueJob();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));