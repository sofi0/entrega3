const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const estuSchema = new Schema ({

	nomb : {
		type : String,
		required : true	
	}, 
	ced : {
		type : Number,
		required : true	
	},
	tel : {
		type : Number,
		required : true	
	},
	email : {
		type: String,
		required : true,	
	},
	usuario : {
		type : String,
		required : true	
	},
	contrasena : {
		type : String,
		required : true	
	},
	idCursos : [{
		type: Schema.Types.ObjectId,
		ref: 'curso'
	}],
	modalidad : {
		type: String,
		required : true,
	}
});

const est = mongoose.model('est', estuSchema); 
module.exports = est