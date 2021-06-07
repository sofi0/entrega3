const express = require('express')
require ('./config/config')
const app = express()
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
require('./helpers/helpers')
//const port = process.env.PORT || 3000;
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const session = require('express-session')
var MemoryStore = require('memorystore')(session)


//path
const dirPublic = path.join(__dirname, "../public")
const dirViews = path.join(__dirname, "../template/views")
const dirPartials = path.join(__dirname, "../template/partials")

app.use(express.static(dirPublic));
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'hbs');
app.set('views', dirViews);
hbs.registerPartials(dirPartials);

//static
app.use(session({
	cookie: { maxAge: 86400000 },
 	store: new MemoryStore({
      	checkPeriod: 86400000 // prune expired entries every 24h
    	}),
  	secret: 'keyboard cat',
  	resave: true,
  	saveUninitialized: true
}))

app.use((req, res, next) =>{
if(req.session.usuario){		
		res.locals.sesion = true
		res.locals.nomb = req.session.nomb
	}	
	next()
})
app.use(require('./routes/index.js'))


mongoose.connect(process.env.URLDB,{useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false},(err, resultado)=>{
	if (err){
		return console.log(err)

	}
	console.log("conectado")
});

app.listen(process.env.PORT, ()=>{
	console.log('servidor en el puerto '+process.env.PORT)
})






