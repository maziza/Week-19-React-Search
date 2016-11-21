// Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

//Require Schemas
var Article = require('./server/model.js');

//Express
var app = express();
var PORT = process.env.PORT || 3000;

//Morgan for logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

// -------------------------------------------------

//MongoDB
// mongoose.connect('');
// var db = mongoose.connection;

// db.on('error', function (err) {
// 	console.log('Mongoose Error: ', err);
// });

// db.once('open', function () {
// 	console.log('Mongoose connection successful.');
// });


//routes

app.get('/', function(req, res){
	res.sendFile('./public/index.html');
})

//get all articles
app.get('/api/saved', function(req, res) {

	Article.find({})
		.exec(function(err, doc){

			if(err){
				console.log(err);
			}
			else {
				res.send(doc);
			}
		})
});

//add to lsit
app.post('/api/saved', function(req, res){
	var newArticle = new Article(req.body);

	console.log(req.body)

	var title = req.body.title;
	var date = req.body.date;
	var url = req.body.url;

	newArticle.save(function(err, doc){
		if(err){
			console.log(err);
		} else {
			res.send(doc._id);
		}
	});
});

//delete from list
app.delete('/api/saved/', function(req, res){

	var url = req.param('url');

	Article.find({"url": url}).remove().exec(function(err, data){
		if(err){
			console.log(err);
		}
		else {
			res.send("Deleted");
		}
	});
});


//Port
app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});