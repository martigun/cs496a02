//https://www.youtube.com/watch?v=kHV7gOHvNdk
//MEAN Tutorial Part 1

//I added this comment

//the server is on the "back end"
// it sits and listens
//writing to console here writes it to the cmd prompt

var express = require('express'); //this calls the express module
var app = express(); //this starts the module

var mongojs = require('mongojs'); //requires the mongojs modules
var db = mongojs('contactlist', ['contactlist']); //which db and collection

var bodyParser = require('body-parser'); //requires the body-parser module

//uses bodyParser to parse the contact rec'd from front end
app.use(bodyParser.json());

//look for static files in the public folder (ie index.html)
app.use(express.static(__dirname + "/public"));

//If server receives a stand-alone GET
//for the route contactlist (when get contactlist is requested)
app.get('/contactlist', function(req,res){
	
	console.log("I received a GET request for /contactlist");
	
	db.contactlist.find(function (err,docs) {	
		console.log(docs); //test to make sure data was found from db
		res.json(docs); //sends data back to the controller
	});
	
	
		
});//end app.get

//when back-end gets a post of req.body
//doc is the parsed result
app.post('/contactlist', function(req,res){
	
	console.log(req.body);//body is just a chunk of data
	
	//insert the new data into the db from body
	db.contactlist.insert(req.body, function(err, doc){
		
		res.json(doc);//send data back to the controller
	});
	
});

app.delete('/contactlist/:id', function(req,res){
	
	var id = req.params.id;
	console.log(id);//this is a test
	
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	})
	
});

//if server receives a GET with an ID
app.get('/contactlist/:id', function(req,res){
	
	var id = req.params.id;
	console.log(id);//this is a test
	
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
		
		res.json(doc);
	});
	
	
		
});//end app.get



app.put('/contactlist/:id', function(req,res){
	
	var id = req.params.id;
	
	console.log(req.body.name);//this is a test
	
	db.contactlist.findAndModify({ 
		query: {_id: mongojs.ObjectId(id)},
		update: {$set: {
			name: req.body.name,
			gender: req.body.gender,
			age: req.body.age,
			email: req.body.email,
			password: req.body.password,
			family: req.body.family
		}}, new: true
		}, function(err,doc){
		res.json(doc);
		}); 
		
		
});


	
	
		




app.listen(3000);
console.log("Server running on port 3000");
