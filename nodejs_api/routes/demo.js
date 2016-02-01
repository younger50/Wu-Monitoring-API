var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongodb_url = 'mongodb://localhost:27017/demo';

/* demo home */
router.get('/', function(req, res, next) {
  res.send('demo home');
});

/* GET device list */
router.get('/get_all_device', function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	// res.send(JSON.stringify({
	//   	"status":"get device success",
	//   	"Devices":
	//   	[
	// 	    {
	// 	      	"WuID":"5566",
	// 	      	"Name":"light sensor",
	// 	      	"Location":"bed room"
	// 	    },
	// 	    {
	// 	      	"WuID":"1234",
	// 	      	"Name":"temperature sensor",
	// 	      	"Location":"living room"
	// 	    }
	//   	]
	// }));
	// raw get get method
	MongoClient.connect( mongodb_url, function(err, db) {
		assert.equal(err, null);
		console.log("Connected correctly to server.");
		cursor = db.collection('device').find();
		list = [];
		cursor.each( function (err, doc) {
		    assert.equal(err, null);
		    if (doc != null) {
		       	console.log(doc);
		        list.push(doc);
		    } else {
		        res.send(list);
		        db.close();
		    }
	   	});
	});
});

module.exports = router;
