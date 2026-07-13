require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));


app.use('/api/apartments', require('./routes/apartments.routes'));
app.use('/api/rooms', require('./routes/rooms.routes'));
app.use('/api/features', require('./routes/features.routes'));
app.use('/api/media', require('./routes/media.routes'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use(require('./middlewares/error.middleware'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));