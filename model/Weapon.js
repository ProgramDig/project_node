const {Schema, model} = require('mongoose');

const schema = new Schema({
	id: {
		type: Number,
		required: true
	},
	Name: {
		type: String,
		required: true
	},
	Platoon: {
		type: Number,
		required: true
	},
	Readiness: {
		type:Boolean,
		default: false
	}
});

module.exports = model('Weapon', schema);