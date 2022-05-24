const Weapon = require('../model/Weapon');


class WeaponController {
	async getWeapon(req, res) {
		try{
			const weapons = await Weapon.find({});
			res.render('index', {
				title: 'Main page',
				message: 'Second company',
				weapons
			})
		} catch (e) {
			console.log(`Error: ${e}`)
			res.json(e)
		}
	}

	async getWeaponApi(req, res) {
		try{
			const weapons = await Weapon.find({});
			res.json(weapons);
		} catch (e) {
			console.log(`Error: ${e}`)
			res.json(e)
		}
	}

 	getCreate (req, res){
		res.render('create', {
			title: 'Create page',
			message: 'Second company'
		})
	}

	getUpdate (req, res) {
		res.render('update', {
			title: 'Update page',
			message: 'Second company'
		})
	}

	getDelete (req, res) {
		res.render('delete', {
			title: 'Delete page',
			message: 'Second company'
		})
	}

	async createWeapon(req, res){
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
	}

	async deleteWeapon(req, res) {
		const id = req.body.id;
		await Weapon.deleteOne({id}, () => {
			console.log(`Weapon with id ${id} deleted !`);
			res.status(200).redirect('/main');
		}).clone().catch((e) => {
			console.log(`Error: ${e}!`);
			res.status(500).json(e);
		});
	}

	async updateWeapon(req, res){
		try{
			const id = req.body.id;
			await Weapon.updateOne({id}, req.body);
			res.redirect('/main');
		} catch (e){
			console.log(`Error: ${e}!`);
			res.status(500).json(e);
		}
	}
}

module.exports = new WeaponController();