const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('./../helpers/helpers')


//path
const dirPublic = path.join(__dirname, "../../public")
const dirViews = path.join(__dirname, "../../template/views")
const dirPartials = path.join(__dirname, "../../template/partials")
const Curso = require ('../models/curso');
const est = require ('../models/estudiante');


//hbs
app.set('view engine', 'hbs');
app.set('views', dirViews);
hbs.registerPartials(dirPartials)


//paginas
app.get('/',function(req,res){
	res.render('cursos1',{
		titulo:'cursos1'
	})
})

app.post('/delete',function(req,res){
	Curso.deleteOne({_id : req.body.nombre},(err,resultado)=>{
		if (err){
			return console.log(err)
		}
		Curso.find({}, (err,resul)=>{
		if (err){
			return console.log(err)
		}
		console.log(resul)
		res.render('cursos1',{
	    titulo: 'Cursos1',
	    res: resul ,
	    mensaje: 'Se ha eliminado con exito'
		})
	})
        
		
	})
})


app.get('/cursos1',function(req,res){
	Curso.find({},(err,resultado)=>{
		if(err){
			return console.log(err)
		}
		console.log(resultado)
		res.render('cursos1',{
			titulo:'cursos1',
			res:resultado
		})	
	})
})

app.post('/cursos1',function(req,res){
	res.render('cursos2',{
		titulo:'ver curso',
		id:req.body.id,
		nombreCurso:req.body.nombreCurso,	
		duracion:req.body.duracion,
		costoCurso:req.body.costoCurso
	})
})

app.get('/registrar',function(req,res){
	Curso.find({},(err,resultado)=>{
		if(err){
			return console.log(err)
		}
		let listaCursos = [];
		resultado.forEach(curso=>{
			if(curso.estado=='disponible'){
				listaCursos.push(curso)
			//console.log(curso)
			}

		})
		console.log(listaCursos)
		//console.log(resultado)
		res.render('registrar',{
			titulo:'registrar',
			res:resultado,
			cursosDisponibles:listaCursos
		})	
	})
})

app.post('/registrar',function(req,res){
	let estu = new est({
		nomb:req.body.nombre,
		ced:req.body.cedula,
		tel:req.body.tel,
		email:req.body.email,
		usuario:req.body.usuario,
		contrasena:bcrypt.hashSync(req.body.contrasena, 10),
		idCursos:[req.body.idCurso],
		modalidad:req.body.modalidad
	})
	estu.save((err,resul)=>{
		if(err){
			return(err)
		}
		Curso.find({}, (err,resultado)=>{
			console.log("ingreso" + resultado)
		if (err){
			return console.log(err)
		}
		res.render('registrar',{
			titulo:'registrar',
			res:resultado,
			mensaje:'se ha registrado con exito'
		})
		})	
	})
})
 

// app.get('/eliminar',function(req, res){
	
// })

app.post('/eliminar',function(req,res){
	est.find({idCursos:[req.body.idCurso]},(err,resultado)=>{
		
		if(err){
			return console.log(err)
		}

		Curso.find({}, (err, resul)=>{
		// console.log(resultado)
			if (err){
				return console.log(err)
			}

				if(req.body.nomb){
					est.findOneAndUpdate({_id:req.body.nomb},{"$pull": {idCursos:req.body.idCursoEliminar}},{new:true},(err, resu)=>{
					
						if (err){
								return console.log(err)
							
								res.render('cursos2',{
								titulo:'ver curso',	
								cur:resul,
								estudiante:resultado,
								idCurso:req.body.idCurso,
								nomb:req.body.nomb,
								mensaje:"Se ha eliminado"
								})
						}else {
								res.render('cursos2',{
								titulo:'ver curso',	
								cur:resul,
								estudiante:resultado,
								idCurso:req.body.idCurso,
								nomb:req.body.nomb
								})
						}
					})
				}
					console.log(req.body.nomb)
					console.log(req.body.idCurso)
					
				console.log(req.body.idCursoEliminar)
		})
		// console.log(resultado,req.body.idCurso)
	})
})

app.get('/cursos2',function(req,res){
	Curso.find({}, (err, resultado)=>{
		// console.log(resultado)
		if (err){
			return console.log(err)
		}
	res.render('cursos2',{
		titulo:'ver curso',	
		cur:resultado
	})
	})
})


app.post('/crearcurso',function(req,res){
	let curso = new Curso({
		id:req.body.id,
		nombre:req.body.nombreCurso,
		duracion:req.body.duracion,
		costo:req.body.costoCurso
	})
	curso.save((err ,  resultado)=>{
		if(err){
			return(err)
		}
			Curso.find({},(err,resultado)=>{
			if(err){
				return console.log(err)
			}
			console.log(resultado)
			res.render('cursos1',{
				titulo:'cursos1',
				res:resultado
			})	
		})
	})
})

app.post('/ingresar', (req, res) => {	
	est.findOne({nomb:req.body.usuario}, (err, resultados) => {
		if (err){
			return console.log(err)
		}
		if(!resultados){
			return res.render ('ingresar', {
			mensaje:"Usuario no encontrado"			
			})
		}
		if(!bcrypt.compareSync(req.body.contrasena, resultados.contrasena)){
			req.session.usuario = resultados._id	
			req.session.nomb = resultados.nomb
			return res.render ('ingresar', {
			mensaje:"Contraseña no es correcta"			
			})
		}	

		// console.log(resultados)	
		req.session.nombreEst = resultados.nombreEst;
		req.session.usuario = resultados._id
			
			res.render('ingresar', {
						mensaje : "Bienvenido " + resultados.nomb,
						nomb : resultados.nomb,
						sesion : true						
						 })
	})	
})

app.get('/salir', (req, res) => {
	req.session.destroy((err) => {
  		if (err) return console.log(err) 	
	})	
	// localStorage.setItem('token', '');
	res.redirect('/')	
})

//error
app.get('*', function(req, res){
	res.render('error');
});

module.exports = app