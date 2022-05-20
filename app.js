const express = require('express');
const mongoose = require('mongoose');
const weaponRoutes = require('./routes/weapon');
const { get } = require('http');
const { connect } = require('http2');

const PORT = process.env.PORT || 3000;
const app = express();

// ejs
app.set('view engine', 'ejs');


app.use(weaponRoutes);

async function start() {
	try {
		await mongoose.connect('mongodb+srv://dmytro:hetadi57@cluster0.nqntf.mongodb.net/weapons');
		app.listen(PORT, () => {
			console.log(`Server started on port: ${PORT}...`);
		});
	} catch (ex) {
		console.log('Error: ', ex)
	}
}

// start server

start(); 
