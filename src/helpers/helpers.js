const hbs = require ('hbs');
const curso = require ('../models/curso');
const est = require ('../models/estudiante');

hbs.registerHelper('listar', (estudiante)=>{
	if(estudiante){
		texto="";
		estudiante.forEach(est =>{
			texto+= `<tr>
				      <td>${est.idCursos}</td>
				      <td>${est.ced}</td>
				      <td>${est.nomb}</td>
				      <td>${est.email}</td>
				      <td>${est.modalidad}</td>
				      <td><button type="submit" class="form-control btn btn-danger btn-sm" name="nomb" value="${est._id}">eliminar</button></td>
				    </tr>`
		})
		return texto
	}
});



