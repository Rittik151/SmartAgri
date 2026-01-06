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

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

server.on('error', (err) => {
	if (err && err.code === 'EADDRINUSE') {
		console.error(`Error: port ${PORT} is already in use.`);
		console.error('Options: set a different PORT, or stop the process using this port.');
		process.exit(1);
	}
	throw err;
});
