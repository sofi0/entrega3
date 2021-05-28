const fs = require ('fs')
let listaEstudiante = [];
let cursoestudiante = [];
let listaCurEst = [];


// const listar =()=> {
// 	listaEstudiante = require ('./estudiantes.json')
// 	texto = "lista estudiantes"
// 	listaEstudiante.forEach(est =>{
// 		texto = $
// 	})
// }

// const listarNombres =() => {
// 	listaEstudiante=require('./estudiantes.json')
// 		var texto = "";
// 		listaEstudiante.forEach(est => {
// 			texto = texto + `<tr><td>${est.cedula}</td> <td>${est.nombre}</td> <td>${est.email}</td> <td><button type="submit" class="btn btn-danger" value="${est.cedula}" name="idEst">Eliminar</button></td></tr> `
// 		}) 
// 	return texto

// } 

const eliminarEst =(estudent) => {
	console.log("id del estudiante => " + estudent.idEst )
	console.log("id del curso => " + estudent.idC )
	
	if (estudent){
		listaEstudiante=require('./estudiantes.json')
		listaCurEst=require('./cursoestudiante.json')

		console.log(estudent)
		let estudiantes = listaEstudiante.filter(elemento => elemento.cedula != paseInt(estudent.idEst))
		let listaCurEst2 = [];
		for(var i=0; i<listaCurEst.length; i++){
			if(listaCurEst[i].cedula==estudent.idEst){
				console.log("funciona22")
				//&& listaCurEst[i].id==estudent.idC
			}
		}

		if (estudiantes){
			listaEstudiante = estudiantes
			guardar()
			return texto = "estudiante fue eliminado"
		}
		else {
			return texto = "No se encontró el estudiante"
		}
	}

} 


const verEstCurso = (idC) => { 
	if (idC){
		//console.log("funcionando1")
		listaEstudiante=require('./estudiantes.json')
		listaCurEst=require('./cursoestudiante.json')

		let estudiantes = listaCurEst.filter(elemento => elemento.idCurso == idC)
		var texto = "";
		//console.log(estudiantes)
		estudiantes.forEach(elemento=> {
			let est = listaEstudiante.find(buscar=> buscar.cedula == elemento.cedula)
			console.log(est + elemento.cedula)
			texto = texto + `<tr><td><select type="text" name="idC"><option value="${idC}">${idC}</option></select></td> <td>${est.cedula}</td> <td>${est.nombre}</td> <td>${est.email}</td> <td><button type="submit" class="btn btn-danger" value="${est.cedula}" name="idEst">Eliminar</button></td></tr> `
		})
		//console.log(estudiantes)
		return texto
	}

} 


const nuevoCurso = (curso) =>{
	listaCursos = require ('./cursos.json')
	let cursoEst ={
		id:curso.id,
		nombreCurso: curso.nombre,
		duracion: curso.duracion,
		costoCurso:curso.costo,
		estado: 'disponible'
		
	}
	let duplicado = listaCursos.find(elemento => elemento.id == curso.id)

	if (duplicado){
		console.log('ya existe el curso')
	}
	else {
		listaCursos.push(cursoEst)
		console.log(listaCursos)
		guardarCurso()
	}
}

const guardarCurso = () => {
	let dato = JSON.stringify(listaCursos);
	fs.writeFile('src/cursos.json', dato, (err)=>{
		if (err) throw (err);
		console.log('archivo fue creado con exito')
	})
}

const mostrarCursos = () => {
	listaCursos = require ('./cursos.json')
	let texto = '';
	listaCursos.forEach(curso=>{
		texto = texto + `<tr>
      <th scope="row">${curso.id}</th>
      <td>${curso.nombreCurso}</td>
      <td>${curso.duracion} Horas</td>
      <td>${curso.costoCurso} $</td>
      <td>${curso.estado}</td>
    </tr>`
	})
	return texto
}


const crear = (estudiante) =>{
	listaEstudiante = require ('./estudiantes.json')
	cursoestudiante = require ('./cursoestudiante.json')
	listaCursos = require ('./cursos.json')
	let est ={
		cedula: estudiante.cedula,
		nombre: estudiante.nombre,
		email: estudiante.email,
		modalidad: estudiante.modalidad,
	}

	let idestcurso ={
		cedula: estudiante.cedula,
		idCurso: estudiante.idCurso
	}

	let duplicado = listaEstudiante.find(nom => nom.cedula == estudiante.cedula)
	if (duplicado){
		console.log('ya existe')
	}
	else {
		listaEstudiante.push(est)
		cursoestudiante.push(idestcurso)
		guardar()
	}
	let estudiantes = cursoestudiante.filter(elemento => elemento.idCurso == estudiante.idCurso)
	console.log(estudiantes.length)
	let duplicado2 = listaCursos.find(elemento2 => elemento2.id == estudiante.idCurso)
	console.log(duplicado2)
	if(estudiantes.length == duplicado2.cupo){
		duplicado2.estado = "cerrado"
		guardarCurso()
	}
}

const guardar = () => {
	let datos = JSON.stringify(listaEstudiante);
	fs.writeFile('src/estudiantes.json', datos, (err)=>{
		if (err) throw (err);
		console.log('archivo fue creado con exito')
	})

	let datos2 = JSON.stringify(cursoestudiante);
	fs.writeFile('src/cursoestudiante.json', datos2, (err)=>{
		if (err) throw (err);
		console.log('archivo fue creado con exito')
	})
}

// const listar = () => {
// 	try {
// 		listaEstudiante = JSON.parse(fs.readFileSync('estudiantes.json'))
// 	}catch (err) {
// 		listaEstudiante=[];
// 	}
// }


// const ver = () => {
// 	listar()
// 	listaEstudiante.forEach(est => {
// 		console.log("la cedula es " + est.cedula)
// 		console.log("el nombre es " + est.nombre)
// 		console.log("la descripcion es " + est.descripcion)
// 		console.log("el valor es " + est.valor)
// 		console.log("\n")
// 	})
// }

// const cargar = () => {
// 	try{
// 		listaEstudiante = require (./estudiantes.json)	
// 	}catch(err){
// 		listaEstudiante=[];
// 	}
// } 

module.exports = {
	crear,
	nuevoCurso,
	mostrarCursos,
	eliminarEst,
	verEstCurso
}