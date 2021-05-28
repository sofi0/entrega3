const hbs = require ('hbs');
const curso = require ('../models/curso');
const estu = require ('../models/estudiante');

hbs.registerHelper('listar', (estudiante)=>{
	if(estudiante){
		texto="";
		estudiante.forEach(estu =>{
			texto+= `<tr>
				      <td>${estu.idCursos}</td>
				      <td>${estu.ced}</td>
				      <td>${estu.nomb}</td>
				      <td>${estu.email}</td>
				      <td>${estu.modalidad}</td>
				      <td><button type="submit" class="form-control btn btn-danger btn-sm" name="nomb" value="${estu._id}">eliminar</button></td>
				    </tr>`
		})
		return texto
	}
});



