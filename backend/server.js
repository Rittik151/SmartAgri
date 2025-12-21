require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);

app.get('/', (req, res) => res.send('Power Distribution API running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
