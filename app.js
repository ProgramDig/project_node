const express = require('express');
const { get } = require('http');

const PORT = 3000;
const app = express();

// ejs
app.set('view engine', 'ejs');

app.get('/main', (req, res) => {
	res.render('index', {
		title: 'Main page',
		message: 'Second company'
	})
});

app.get('/create', (req, res) => {
	res.render('create', {
		title: 'Create page',
		message: 'Second company'
	})
});

app.get('/update', (req, res) => {
	res.render('update', {
		title: 'Update page',
		message: 'Second company'
	})
});

app.get('/delete', (req, res) => {
	res.render('delete', {
		title: 'Delete page',
		message: 'Second company'
	})
});

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}...`);
});