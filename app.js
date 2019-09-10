const 	express = require("express"),
		app			= express(),
		bodyParser 	= require("body-parser"),	
		mongoose 	= require("mongoose");
	  
	  
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/new_db', { useNewUrlParser: true} );


// Defining the Schemas for Collections(Tables)
let Schema = mongoose.Schema;

const stationSchema = new Schema({
	code: {type:String, default: null},
	name: {type:String, default: null},
	country_id: String,
	type_id: String,
	visible: {type:Boolean, default: true},
	description: String
}, { versionKey: false });

const countrySchema = new Schema({
	code: {type:String, default: null},
	name: {type:String, default: null},
	visible: {type:Boolean, default: true},
	description: String
}, { versionKey: false });

const typeSchema = new Schema({
	code: {type:String, default: null},
	name: {type:String, default: null},
	visible: {type:Boolean, default: true},
	description: String
}, { versionKey: false });


var Stat = mongoose.model('Station', stationSchema)
var Coun = mongoose.model('Country', countrySchema)
var Typ = mongoose.model('Type', typeSchema)




// DEFINING THE ROUTES
app.get('/', function(req,res){
	res.send("Yeah, you did it");
})



// READ routes
app.get('/stations', function(req,res){
	Stat.find({}).then(eachOne =>{
		res.json(eachOne);
	});
});

app.get('/countries', function(req,res){
	Coun.find({}).then(eachOne =>{
		res.json(eachOne);
	});
});

app.get('/types', function(req,res){
	Typ.find({}).then(eachOne =>{
		res.json(eachOne);
	});
});


// CREATE routes
app.post('/stations', function(req,res){
	Stat.create({
		code: req.body.code,
		name: req.body.name,
		country_id: req.body.country_id,
		type_id: req.body.type_id,
		visible: req.body.visible,
		description: req.body.description
	}).then(sss => {
		res.json(sss)
	});
}); 


app.post('/countries', function(req,res){
	
	Coun.create({
		code: req.body.code,
		name: req.body.name,
		visible: req.body.visible,
		description: req.body.description
	}).then(sss => {
		res.json(sss)
	});
});

app.post('/types', function(req,res){
	
	Typ.create({
		code: req.body.code,
		name: req.body.name,
		visible: req.body.visible,
		description: req.body.description
	}).then(sss => {
		res.json(sss)
	});
}); 



// READ one specific item by ID
app.get('/stations/:station_id', function(req,res){
	Stat.findById(req.params.station_id).then(function(err,ttt){
		if(err){
			res.send(err)
		}
	res.json(ttt)
})
});

app.get('/countries/:country_id', function(req,res){
	Coun.findById(req.params.country_id).then(function(err,yyy){
		if(err){
			res.send(err)
		}
	res.json(yyy)
})
});

	
app.get('/types/:type_id', function(req,res){
	Typ.findById(req.params.type_id).then(function(err,fff){
		if(err){
			res.send(err)
		}
	res.json(fff)
})
});



// UPDATE one specific item by ID
app.put('/stations/:station_id', function(req,res){
	Stat.updateOne({
		code: req.body.code,
		name: req.body.name,
		visible: req.body.visible,
		description: req.body.description
	}).then(sss => {
		res.json(sss)
	})
});

app.put('/countries/:country_id', function(req,res){
	Coun.updateOne({
		code: req.body.code,
		name: req.body.name,
		visible: req.body.visible,
		description: req.body.description
	}).then(sss => {
		res.json(sss)
	})
});

app.put('/types/:type_id', function(req,res){
	Typ.updateOne({
		code: req.body.code,
		name: req.body.name,
		visible: req.body.visible,
		description: req.body.description
	}).then(sss => {
		res.json(sss)
	})
});


// DELETE one specific item by ID
app.delete('/stations/:station_id', function(req,res){
	Stat.deleteOne({_id:req.params.station_id}).then(function(err, sss){
		if(err){
		res.send(err)
		}	
	})
	res.send("Successfully deleted")	
});

app.delete('/countries/:country_id', function(req,res){
	Coun.deleteOne({_id:req.params.country_id}).then(function(err, sss){
		if(err){
		res.send(err)
		}
	})	
	res.send("Successfully deleted")	
});

app.delete('/types/:type_id', function(req,res){
	Typ.deleteOne({_id:req.params.type_id}).then(function(err, sss){
		if(err){
		res.send(err)	
		}	
	})
	res.send("Successfully deleted")
});


app.listen(3001, function(){
	console.log("Server has started");
});

