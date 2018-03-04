const mongoose = require('mongoose');

const hashSchema = new mongoose.Schema({
	hash: String,
	fileName: String,
	label: String
});

module.exports = mongoose.model('Hash', hashSchema);