const { cache } = require('ejs');
const {Router} = require('express');
const Weapon = require('../model/Weapon')
const router = Router();


// pages

router.get('/main', async (req, res) => {
	try{
		const weapons = await Weapon.find({});
		res.render('index', {
			title: 'Main page',
			message: 'Second company',
			weapons
		})
	} catch (e) {
		console.log(`Error: ${e}`)
	}
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

// CREATE
router.post('/create', async (req, res) => {
	try {
		const weapon = new Weapon({
			id: req.body.id,
			name: req.body.name,
			number: req.body.number,
			platoon: req.body.platoon,
			readiness: req.body.readiness
		})
		await weapon.save();
	} catch (e) {
		console.log(`Error: ${e}!`);
		res.status(500).json(e);
	}
	
	res.redirect('/main');
});
// DELETE
router.post('/delete/:id', async (req, res) => {
	try{
		const id = req.body.id;
		await Weapon.remove({id}, () => {
			console.log(`Weapon with id ${id} deleted !`)
		})
		res.status(200).redirect('/main');
	} catch (e) {
		console.log(`Error: ${e}!`);
		res.status(500).json(e);
	}
});
// UPDATE
router.post('/update/:id', async (req, res) => {
	const id = req.body.id;
	await Weapon.updateOne({id}, req.body);
	res.redirect('/main');
});
// valid id input
function isUnique(id, input) {
	if(!Weapon.exists({id})){
		return id; 
	} else {
		// code
	}
}

module.exports = router;