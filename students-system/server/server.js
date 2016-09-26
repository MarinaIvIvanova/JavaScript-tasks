"use strict";


var express = require('express');
var app = express();

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

var students = [{
  "id" : 1,
  "name" : "Jack",
  "course" : "Frontend JavaScript"
}, {
  "id" : 2,
  "name" : "Tihomir",
  "course" : "JavaEE"
}, {
  "id" : 3,
  "name" : "Mihail",
  "course" : "Frontend JavaScript"
}, {
  "id": 4,
  "name" : "Anton",
  "course" : "C++"
}, {
  "id" : 5,
  "name" : "Nikolai",
  "course" : "Core Java"
}, {
	  "id" : 6,
	  "name" : "Marina",
	  "course" : "Frontend JavaScript"
	}
];

app.get('/students', function(req, res){
  res.json(students);
});


var server = app.listen(1335, function() {
    console.log('Listening on port %d', server.address().port);
});