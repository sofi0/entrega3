const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const cursoSchema = new Schema ({

	id : {
		type : Number,
		required : true	
	}, 
	nombre : {
		type : String,
		required : true	
	}, 
	duracion : {
		type: Number,
		required : true,	
	},
	costo : {
		type: Number,
		required : true	
	},
	estado : {
		type: String,
		required : true,
		default: 'disponible',
		// min:0,
		// max:5
	}
});

const curso = mongoose.model('curso', cursoSchema); 

module.exports = curso
