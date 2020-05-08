const path = require('path');
var cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();
const colors = require('colors');

const errorHandler = require('./middleware/error');
//
// ─── UTILS ──────────────────────────────────────────────────────────────────────
//
const formattedLog = require('./utils/formatted-log');
// ────────────────────────────────────────────────────────────────────────────────

// Load env vars
dotenv.config({ path: './config/config.env' });

app.use(
	cors({
		preflightContinue: true,
		credentials: true
	})
);

//
// ─── MIDDLEWARE ─────────────────────────────────────────────────────────────────
//
app.use(morgan('dev'));
app.use(express.json());
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//
const auth = require('./routes/api/auth');
const covid = require('./routes/api/covid');
const news = require('./routes/api/news');
const routine = require('./routes/api/routine');
const awareness = require('./routes/api/awareness');
app.use('/api/auth', auth);
app.use('/api/covid', covid);
app.use('/api/news', news);
app.use('/api/routine', routine);
app.use('/api/awareness', awareness);
// ────────────────────────────────────────────────────────────────────────────────
//
// ─── CUSTOM ERROR HANDLER ───────────────────────────────────────────────────────
//
app.use(errorHandler);
// ────────────────────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
	formattedLog.information(`The server is currently running in ${process.env.NODE_ENV} mode on port ${PORT}`);
	//console.log(`The server is currently running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red);
	// Close server & exit process
	server.close(() => process.exit(1));
});
