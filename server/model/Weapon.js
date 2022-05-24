const {Schema, model} = require('mongoose');

const schema = new Schema({
	id: {
		type: Number,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	number: {
		type: Number,
		required: true
	},
	platoon: {
		type: Number,
		required: true
	},
	readiness: {
		type:Boolean,
		default: false
	}
});

module.exports = model('Weapon', schema);