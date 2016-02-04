var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongodb_url = 'mongodb://localhost:27017/demo';

/* home made mongo db functions */
//
var dbfind = function ( target, callback) {
	MongoClient.connect( mongodb_url, function (err, db) {
		assert.equal(err, null);
		console.log("Connected correctly to server.");
		cursor = db.collection('device').find(target);
		var list = [];
		cursor.each( function (err, doc) {
		    assert.equal(err, null);
		    if (doc != null) {
		       	console.log(doc);
		        list.push(doc);
		    } else {
		    	console.log("db find success");
		        callback(list);
		        db.close();
		    }
	   	});
	});
}

var dbinsert = function ( target, callback) {
	MongoClient.connect( mongodb_url, function (err, db) {
		assert.equal(err, null);
		console.log("Connected correctly to server.");
		cursor = db.collection('device').insertOne( target,
		function (err, result) {
		    assert.equal(err, null);
		    console.log("db insert success");
		    callback(result);
		    db.close();
	   	});
	});
}

/* demo home */
router.get('/', function (req, res, next) {
  //res.send('demo home');
  res.render('test_page');
});

/* Login */

/* POST CreateDevice */
router.post('/create_device', function (req, res, next) {
	console.log(req.body);
	dbinsert( req.body, function (data) {
		res.send("OK "+JSON.stringify(req.body));
	});
});

/* GET GetAllDevice */
router.get('/get_all_device', function (req, res, next) {
	dbfind( {}, function (data) {
		res.setHeader('Content-Type', 'application/json');
		res.send(data);
	});
});

/* POST SendData */

/* GET GetDeviceData */

module.exports = router;
