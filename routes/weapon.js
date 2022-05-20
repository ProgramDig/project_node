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

router.post('/create', async (req, res) => {
	const weapon = new Weapon({
		id: req.body.id,
		name: req.body.name,
		number: req.body.number,
		platoon: req.body.platoon,
		readiness: req.body.readiness
	})

	await weapon.save();
	res.redirect('/main');
});

router.delete('/delete', async (req, res) => {

});

router.patch('/update', async (req, res) => {

});

module.exports = router;