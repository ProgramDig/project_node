const { cache } = require('ejs');
const {Router} = require('express');
const Weapon = require('../model/Weapon')
const userController = require('../controllers/user-controller');
const weaponController = require('../controllers/weapon-controller');
const router = Router();
const {body} = require('express-validator');


// pages
router.get('/main', weaponController.getWeapon);
router.get('/create', weaponController.getCreate);
router.get('/update', weaponController.getUpdate);
router.get('/delete', weaponController.getDelete);

// CREATE
router.post('/create', weaponController.createWeapon);
// DELETE
router.post('/delete/:id', weaponController.deleteWeapon);
// UPDATE
router.post('/update/:id', weaponController.updateWeapon);

// authorization

router.post('/registration',
	body('email').isEmail(),
	body('password').isLength({min: 3, max: 32}),
	userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);


module.exports = router;