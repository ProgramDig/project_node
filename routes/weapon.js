const {Router} = require('express');
const Weapon = require('../model/Weapon')
const router = Router();

// pages

router.get('/main', async (req, res) => {
	const weapons = await Weapon.find({});
	res.render('index', {
		title: 'Main page',
		message: 'Second company',
		weapons
	})
});

router.get('/create', (req, res) => {
	res.render('create', {
		title: 'Create page',
		message: 'Second company'
	})
});

router.get('/update', (req, res) => {
	res.render('update', {
		title: 'Update page',
		message: 'Second company'
	})
});

router.get('/delete', (req, res) => {
	res.render('delete', {
		title: 'Delete page',
		message: 'Second company'
	})
});

module.exports = router;