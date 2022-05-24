const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv/config');
const path = require('path');
const weaponRoutes = require('./routes/weapon');
const errorMeddleware = require('./middleware/error-middleware');

const PORT = process.env.PORT || 5000;
const app = express();

// ejs
app.set('view engine', 'ejs');

// middlewares

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))
// routes
app.use(weaponRoutes);
app.use(errorMeddleware);

async function start() {
	try {
		await mongoose.connect(process.env.DB_CONNECTION);
		app.listen(PORT, () => {
			console.log(`Server started on port: ${PORT}...`);
		});
	} catch (ex) {
		console.log('Error: ', ex)
	}
}

// start server

start(); 