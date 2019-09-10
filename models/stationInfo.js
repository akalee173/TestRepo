const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const stationSchema = new Schema({
	code: String,
	name: String,
	country_id: Number,
	type_id: String,
	visible: Boolean,
	description: String
});

const countrySchema = new Schema({
	code: String,
	name: String,
	visible: Boolean,
	description: String
});


var Sts = mongoose.model('Station', stationSchema);
var Cou = mongoose.model('Country', countrySchema);


module.exports = Sts;
module.exports = Cou;
